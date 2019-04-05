$(document).ready(function() {

var lastURL = "/";
var anchor = "";

function isPreview() {
    //If I'm debugging this locally
    return /localhost|[^\.]127\./i.test(window.origin);
}

function fetchPage(url) {
    if(!url) {
        onLoaded();
        return;
    }
    if(url.slice(-1) == "/")
        url += "default.md";
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
    lastURL = url;
    $("#contents").html(marked(text)).promise().then(onLoaded);

    var title = $("main h1:first").text() || url;
    document.title = title + _Blog.titleSuffix;
    $("#toolbar-code").attr("href", _Blog.contentPath + url);

    //$("main img").lazyload({effect : "fadeIn"}); 

    _Blog.gitment.id = url;
    _Blog.gitment.title = title;
    new Gitment(_Blog.gitment).render("comments-gitment");

    $("#toolbar-error").hide();
    $("#toolbar-logo").removeClass("toolbar-logo-loading");
}

function onLoaded() {
    var elemAnchor = $("#" + unescape(anchor || "top")).get(0);
    if(elemAnchor)
        elemAnchor.scrollIntoView();
}

function onLoadError() {
    $("#toolbar-logo").removeClass("toolbar-logo-loading");
    $("#toolbar-logo").addClass("toolbar-logo-error");
    $("#toolbar-error").show();
}

function onHighlight(code, lang) {
    try {
        return hljs.highlight(lang, code).value;
    } catch(e) {
        if(lang)
            console.error(e);
        return code;
    }
}

function onHashChange() {
    var hash = location.hash.slice(1).split("#");
    if(hash[0][0] == "/") {
        anchor = hash[1];
        if(hash[0] == lastURL && hash[0] != "/")
            hash[0] = undefined;
        fetchPage(hash[0]);
    } else {
        history.replaceState(history.state, document.title, "#" + lastURL + location.hash);
        onHashChange();
    }
}

function onToggleComments() {
    $("#toolbar-comments").toggleClass("toolbar-comments-shown");
    $("#comments").slideToggle("fast", () => {
        $("#comments").get(0).scrollIntoView();
    });
}

_Blog.marked.highlight = onHighlight;
marked.setOptions(_Blog.marked);

$("#toolbar-comments").click(onToggleComments);
$("#toolbar-reload").click(onHashChange);
$(window).bind("hashchange", function(e) {
    e.preventDefault();
    onHashChange();
});

onHashChange();

}); //$(document).ready