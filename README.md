# Mongo_Scraper
MongoDB Web Scraper: Medical News Today - Colorectal Cancer Edition. Colorectal cancer is a hereditary cancer that is responsible for over 50,000 deaths and doesn't just affect people over 50 year old. In fact, it is one of the most treatable and preventable cancer if it is detected early. Screening could save more than half of those lives! Take the first step to prevent colorectal cancer by reading up on this disease. Knowledge is <strong>POWER</strong> so use this app to educate yourself about this disease. The Mongo Scraper is a full-stack app that scrapes the Medical News Today website for colorectal cancer news and allow you to save the articles and even take notes.

## Technical overview
This full-stack application utilizes the Model/View/Controller (MVC) design pattern in which the Controller serve as the interface to handle the logic and routing between Model or the application database core and View to dynamically render HTML content in response to the user/client requests. Specifically, the app is built with Axios and Cheerio to scrape a website, then Node.js, and Express.js to handle the logic. Mongoose model provides an interface to the database for Create, Read, Update and Delete (CRUD) operations in the Mongo database (mongoDB). Then Express-Handlebars template is used to retrive information to dynamically build HTML pages to display the content back to the client.  The app is deployed live on Heroku, but you can clone or download the code from GitHub to run the server codes on your localhost.

## Built with or topics covered
* HTML5
* CSS3
* JavaScript
* jQuery
* Model View Controller (MVC)
* MongoDB
* Mongoose
* Express.js
    * HTTP Requests (GET, POST)
    * Routes and static content
    * Handlebars engine integration
* Node.js
    * Backend API calls
* Handlebars Templates and Layouts
* Node Package Manager (npm)
* mLab remote mongoDB
* Heroku deployment

## npm packages: 
* [Express] (https://www.npmjs.com/package/express) - Fast, unopinionated, minimalist web framework for node to handle routing.
* [Express-Handlebars] (https://www.npmjs.com/package/express-handlebars) - A view engine that utilizes logicless Mustache templating language for Express that keep the view and the code separated.
* [body-parser] (https://www.npmjs.com/package/body-parser) - A Node.js middleware that parses the body and return JSON strings.
* [axios] (https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js.
* [cheerio] (https://www.npmjs.com/package/cheerio) - Tiny, fast, and elegant implementation of core jQuery designed specifically for the server.
* [mongoose] (https://www.npmjs.com/package/mongoose) - Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.

#### Directory structure

All the recommended files and directories should look like the following structure:

```
.
├── config
│   └── routes.js
│
├── controllers
│   ├── articles.js
│   └── notes.js
│
├── models
│   ├── Article.js
│   ├── index.js
│   └── Note.js
│
├── node_modules
│
├── package.json
│
├── public
│   └── assets
│       ├── css
│       │   └── style.css
│       ├── images
│       │    ├── background.jpg
│       │    ├── echiang-brand.png
│       │    └── MNT-logo.png
│       └── javascript
│            ├── index.js
│            └── saved.js
│
├── scripts
│   └── date.js
│   └── scrape.js
│
├── server.js
│
└── views
    ├── layouts
    │    └── main.handlebars
    ├── home.handlebars
    └── saved.handlebars
```

## Author
* Eddie Chiang
* Click on the deployed app on Heroku!
https://tucsonburger.herokuapp.com/

* Click on the GitHub link to view code!
https://github.com/echiang73/Mongo_Scraper


## Here are the previews of the web application:

![](public/assets/images/webpreview.gif "gif")

![](public/assets/images/mobilepreview.gif "gif")