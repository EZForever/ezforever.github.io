$(document).ready(function() {

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

var LastURL = "/";
function renderPage(text, url) {
    //$("#loading-progress").text("Rendering...");
    LastURL = url;
    $("#main").html(texme.render(text));

    var title = $("main h1:first").text() || url;
    document.title = title + " - EZForever@GitHub";
    $("#footer-menu-source").attr("href", _Blog.contentPath + url);

    $("pre").each(function(i, block) {
        hljs.highlightBlock(block);
    });

    $("#main img").lazyload({effect : "fadeIn"}); 

    //$("#loading-progress").text("Loading comments...");
    _Blog.gitment.id = url;
    _Blog.gitment.title = title;
    new Gitment(_Blog.gitment).render("footer-comments");

    $("#loading-progress").text("Loaded!");
    $("#loading").fadeOut("slow");
}

function onLoadError() {
    $("#loading-progress").text("Oops! Something failed.");
    $("#loading-oops").show();
}

function onHashChange() {
    var hash = location.hash.slice(1).split("#");
    if(hash[0][0] == "/") {
        if(hash[0] != LastURL || LastURL == "/")
            fetchPage(hash[0]);
        if(hash[1])
            $("#" + hash[1]).get(0).scrollIntoView();
        else
            $("html").animate({"scrollTop": 0}, "medium");
    } else {
        history.replaceState(history.state, document.title, "#" + LastURL + location.hash);
    }
}

function onToggleComments() {
    $("#footer-comments").slideToggle("fast");
    $("#footer-menu-comments").text(($("#footer-comments").is(":visible") ? "◇ 隐藏" : "◆ 显示") + "评论区");
}

$(window).bind("hashchange", function(e) {
    e.preventDefault();
    onHashChange();
});
$("#loading-oops-retry").click(onHashChange);
$("#footer-menu-comments").click(onToggleComments);
onHashChange();

}); //$(document).ready