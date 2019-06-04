$(document).ready(function() {
  var articleContainer = $(".article-container");
  $(document).on("click", ".btn.save", handleArticleSave);
  $(document).on("click", ".scrape-new", handleArticleScrape);
  $(".clear").on("click", handleArticleClear);

  initPage();

  function initPage() {
    articleContainer.empty();
    $.get("/api/articles?saved=false")
    .then(function(data) {
      if (data && data.length) {
        renderArticles(data);
      }
      else {
        renderEmpty();
      }
    });
  }

  function renderArticles(articles) {
    var articlePanels = [];
    for (var i=0; i<articles.length; i++) {
      articlePanels.push(createPanel(articles[i]));
    }
    articleContainer.append(articlePanels);
  }

  function createPanel(article) {
    var panel =
      $(["<div class='panel panel-default'>",
        "<div class='panel-heading'>",
        "<h3>", article.title,
        "</h3>",
        "</div>",
        "<div class='panel-body'>",
        article.summary,
        "</div>",
        "<a class='btn btn-success save'>",
        "Save Article",
        "</a>",
        "</div>"
      ].join(""));
    panel.data("_id", article._id);
    return panel;
  }

  function renderEmpty() {
    var emptyAlert =
    $(["<div class='alert alert-warning text-center'>",
    "<h4>Knowledge is Power!</h4>",
    "<h5>Colorectal cancer is preventable, treatable, beatable - and knowledge gives you the power to make better decisions!</h5>",
    "<h5>You have no new articles, click on the Scrape button to retrieve articles! Or view the Saved articles and take some notes!</h5>",
    "</div>"
    // "<div class='panel panel-default'>",
    // "<div class='alert alert-warning text-center'>",
    // "<h5>Colorectal cancer is preventable, treatable, beatable - and knowledge gives you the power to make better decisions!</h5>",
    // "</div>",
    // "<div class='panel-body text-center'>",
    
    // "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
    // "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
    // "</div>",
    // "</div>"
    ].join(""));
    articleContainer.append(emptyAlert);
  }

  function handleArticleSave() {
    var articleToSave = $(this).parents(".panel").data();
    articleToSave.saved = true;
    $.ajax({
      method: "PATCH",
      url: "/api/articles",
      data: articleToSave
    })
    .then(function(data) {
      // if (data.ok) {
        initPage();
        bootbox.alert("<h5 class='text-center m-top-80'>" + data.message + "<h5>");
      // }
    });
  }

  function handleArticleScrape() {
    $.get("/api/fetch")
    .then(function(data) {
      initPage();
      bootbox.alert("<h5 class='text-center m-top-80'>" + data.message + "<h5>");
    });
  }

  function handleArticleClear() {
    $.get("/clear").then(function() {
      articleContainer.empty();
      initPage();
    });
  }

}); 
  

  
  
  // // Grab the articles as a json
    // $.getJSON("/articles", function(data) {
    //   // For each one
    //   for (var i = 0; i < data.length; i++) {
    //     // Display the apropos information on the page
    //     // $("#images").append("<p data-id='" + data[i]._id + "'>" + "<img src=" + data[i].imageurl + " height='64px'>" + "</p>");
    //     $("#articles").append("<p data-id='" + data[i]._id + "'>" + "<img src=" + data[i].imageurl + " height='64px'>" + "<br />" + data[i].title + "<br />" + data[i].summary + "<br />" + data[i].link + "</p>");
    //   }
    // });


    // // Whenever someone clicks a p tag
    // $(document).on("click", "p", function() {
    //   // Empty the notes from the note section
    //   $("#notes").empty();
    //   // Save the id from the p tag
    //   var thisId = $(this).attr("data-id");

    //   // Now make an ajax call for the Article
    //   $.ajax({
    //     method: "GET",
    //     url: "/articles/" + thisId
    //   })
    //     // With that done, add the note information to the page
    //     .then(function(data) {
    //       console.log(data);
    //       // The title of the article
    //       $("#notes").append("<h2>" + data.title + "</h2>");
    //       // An input to enter a new title
    //       $("#notes").append("<input id='titleinput' name='title' >");
    //       // A textarea to add a new note body
    //       $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
    //       // A button to submit a new note, with the id of the article saved to it
    //       $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

    //       // If there's a note in the article
    //       if (data.note) {
    //         // Place the title of the note in the title input
    //         $("#titleinput").val(data.note.title);
    //         // Place the body of the note in the body textarea
    //         $("#bodyinput").val(data.note.body);
    //       }
    //     });
    // });

    // // When you click the savenote button
    // $(document).on("click", "#savenote", function() {
    //   // Grab the id associated with the article from the submit button
    //   var thisId = $(this).attr("data-id");

    //   // Run a POST request to change the note, using what's entered in the inputs
    //   $.ajax({
    //     method: "POST",
    //     url: "/articles/" + thisId,
    //     data: {
    //       // Value taken from title input
    //       title: $("#titleinput").val(),
    //       // Value taken from note textarea
    //       body: $("#bodyinput").val()
    //     }
    //   })
    //     // With that done
    //     .then(function(data) {
    //       // Log the response
    //       console.log(data);
    //       // Empty the notes section
    //       $("#notes").empty();
    //     });

    //   // Also, remove the values entered in the input and textarea for note entry
    //   $("#titleinput").val("");
    //   $("#bodyinput").val("");
    // });
