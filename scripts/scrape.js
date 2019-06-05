var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function (cb) {
    axios.get("https://www.medicalnewstoday.com/categories/colorectal_cancer").then(function (response) {
        var $ = cheerio.load(response.data);

        var articles = [];

        $(".headline").each(function (i, element) {
            var title = $(this).parent().attr("title");
            var summary = $(this).find("em").text();
            var imageurl = $(this).parent().find("img").attr("data-src");
            var link = "https://www.medicalnewstoday.com" + $(this).parent().attr("href");

            if(title && summary && imageurl && link){
                var result = {
                    title: title,
                    summary: summary,
                    imageurl: imageurl,
                    link: link
                };
                articles.push(result);
            return i < 9;
            }
        });
        // console.log(articles);
        cb(articles);
        // res.send("Scrape Complete");
    });
};

module.exports = scrape;
