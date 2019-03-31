$(document).ready(function() {

var LastURL = "/";

function isPreview() {
    //If I'm debugging this locally
    return /localhost|[^\.]127\./i.test(window.origin);
}

function fetchPage(url) {
    if(url.slice(-1) == "/") url += "default.md";
    $("#toolbar-logo").removeClass("toolbar-logo-error");
    $("#toolbar-logo").addClass("toolbar-logo-loading");
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
    LastURL = url;
    $("#main").html(marked(text));

    var title = $("main h1:first").text() || url;
    document.title = title + " - EZForever@GitHub";
    $("#toolbar-code").attr("href", _Blog.contentPath + url);

    //$("main img").lazyload({effect : "fadeIn"}); 

    _Blog.gitment.id = url;
    _Blog.gitment.title = title;
    new Gitment(_Blog.gitment).render("comments-gitment");

    $("#toolbar-error").hide();
    $("#toolbar-logo").removeClass("toolbar-logo-loading");
}

function onLoadError() {
    $("#toolbar-logo").removeClass("toolbar-logo-loading");
    $("#toolbar-logo").addClass("toolbar-logo-error");
    $("#toolbar-error").show();
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
    $("#toolbar-comments").toggleClass("toolbar-comments-shown");
    $("#comments").slideToggle("fast", () => {
        $("#comments").get(0).scrollIntoView();
    });
}

marked.setOptions(_Blog.marked);
$("#toolbar-comments").click(onToggleComments);
$("#toolbar-reload").click(onHashChange);
$(window).bind("hashchange", function(e) {
    e.preventDefault();
    onHashChange();
});

onHashChange();

}); //$(document).ready