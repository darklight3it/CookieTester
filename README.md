# Cookie Tester

A ready to use express server to check the cookies limitations on different user agents. The test is done with **Node 8.9.4 LTS**

## How to Use 

```
npm install
npm start
```

To start the webserver 

## Routes

* <code>/</code>: Home Page
* <code>/set-cookies</code> : this routes set the cookies written in cookies.txt file.
* <code>/check-bug</code> : checks a bug until Safari 10 that prevent to write cookie if 14kb size is reached.
* <code>/ajaxcheck</code> : checks if cookies are sent through an ajax request (you can just click the button in home).



