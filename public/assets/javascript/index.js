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
    console.log(article);
    var panel =
      $(["<div class='panel panel-default'>",
        "<div class='panel-heading panel-btns'>",
        "<a class='btn btn-success save'>",
        "Save Article",
        "</a>",
        "</div>",
        "<div class='panel-heading panel-image'>",
        "<img src='" + article.imageurl +"' style='width:150px; border: solid 1px black'>",
        "</div>",
        "<div class='panel-body title-and-summary'>",
        "<a href='" + article.link + "' style='color: white' target='blank'>",
        "<h3>", article.title,"</h3>",
        "</a>",
        article.summary,
        "</div>",
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
        initPage();
        bootbox.alert("<h5 class='text-center m-top-80'>" + data.message + "<h5>");
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
