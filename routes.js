const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const checkUtils = require("./checkutils");

const readFile = promisify(fs.readFile);

module.exports =
  (app) => {
    app.get("/",
      async (req, res, next) => {
        res.render("index", { layout: "layout", title: "Live" })
      });

    app.get("/set-cookies",
      async (req, res, next) => {
        const buffer = await readFile(path.join(__dirname, "cookies.txt"));
        const cookies = buffer.toString();
        const cookieList = cookies.split("\r\n");

        cookieList
          .forEach((cookie) => {
            const index = cookie.indexOf("=");
            if (index < 0) {
              return;
            }
            const name = cookie.substr(0, index);
            const value = cookie.substr(index + 1);
            res.cookie(name, value);
          });

        res.render("cookie-set", { layout: "layout", title: "Live", count: cookieList.length })
      });

    app.get("/check-bug",
      (req, res, next) => {
        var value = '';

        for(let i = 0; i<4000; i++){
          value += '1';
        }

        for(let i = 0; i<5; i++){
          res.cookie('bugcookie_' + i, value);
        }

        res.render("cookie-set", { layout: "layout", title: "Live", count: 0 });
      });

    app.get('/ajaxcheck',
      (req, res, next) => {
        console.log("****");
        var cookieHeader = req.get('Cookie');

        console.log("Cookie Header has " + checkUtils.getByteLen(cookieHeader) + "bytes");
        console.log("****");
        console.log(req.cookies);
        console.log("");
        console.log("> Cookies count", Object.keys(req.cookies).length || 0);
        console.log("****");
        res.status(200).send(req.cookies);
      }
    );

  };