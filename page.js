$(document).ready(function() {

var LastURL = "/";

function isPreview() {
    //If I'm debugging this locally
    return /localhost|[^\.]127\./i.test(window.origin);
}

function fetchPage(url) {
    if(url.slice(-1) == "/") url += "default.md";
    $("#loading-progress").text("Loading...");
    $("#loading-oops").hide();
    $("#loading").show();
    $.ajax({
        url: _Blog.contentPath + url,
        cache: !isPreview(),
        error: onLoadError,
        success: function(text) {
            try {
                renderPage(text, url);
            } catch(e) {
                console.error(e);
                onLoadError();
            }
        }
    });
}

function renderPage(text, url) {
    //$("#loading-progress").text("Rendering...");
    LastURL = url;
    $("#main").html(marked(text));

    var title = $("main h1:first").text() || url;
    document.title = title + " - EZForever@GitHub";
    $("#footer-menu-source").attr("href", _Blog.contentPath + url);

    $("main img").lazyload({effect : "fadeIn"}); 

    _Blog.gitment.id = url;
    _Blog.gitment.title = title;
    renderComments();

    $("#loading-progress").text("Loaded!");
    $("#loading").fadeOut("slow");
}

function renderComments() {
    if(!window.Gitment) return;
    //$("#loading-progress").text("Loading comments...");
    new Gitment(_Blog.gitment).render("comments");
}

function onLoadError() {
    $("#loading-progress").text("Oops! Something failed.");
    $("#loading-oops").show();
}

function onHashChange() {
    var hash = location.hash.slice(1).split("#");
    if(hash[0][0] == "/") {
        if(hash[0] != LastURL || hash[0] == "/")
            fetchPage(hash[0]);
        if(hash[1])
            $("#" + hash[1]).get(0).scrollIntoView();
        else
            $("html").animate({"scrollTop": 0}, "medium");
    } else {
        history.replaceState(history.state, document.title, "#" + LastURL + location.hash);
        onHashChange();
    }
}

function onToggleComments() {
    $("#footer-menu-comments").text(($("#comments").is(":visible") ? "◆ 显示" : "◇ 隐藏") + "评论区");
    $("#comments").slideToggle("fast");
}

marked.setOptions(_Blog.marked);
$("#loading-oops-retry").click(onHashChange);
$("#footer-menu-comments").click(onToggleComments);
$(window).bind("hashchange", function(e) {
    e.preventDefault();
    onHashChange();
});

onHashChange();

//Temporary method; should and will change
$("body").append("<style type='text/css'>@import '" + _Blog.gitment.css + "';</style>");
$.getScript(_Blog.gitment.js, function(resp, stat) {
    renderComments();
});

}); //$(document).ready