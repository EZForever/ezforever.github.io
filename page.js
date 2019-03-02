//TODO Anchor: view-source:https://marked.js.org/
(function() {

function isPreview() {
    //If I'm debugging this locally
    return /localhost|[^\.]127\./i.test(window.origin);
}

function onHashChange() {
    var hash = location.hash.slice(1) || "main.md";
    $("html").scrollTop(0);
    $("#loading-progress").text("Loading...");
    $("#loading-oops").hide();
    $("#loading").show();
    $.ajax({
        url: _Blog.contentPath + hash,
        cache: !isPreview(),
        error: onLoadError,
        success: function(text) {
            try {
                $("#loading-progress").text("Rendering...");
                $("#main").html(texme.render(text));
                $("pre").each(function(i, block) {
                    hljs.highlightBlock(block);
                });
                var title = $("main h1:first").text() || hash;
                document.title = title + " - EZForever@GitHub";
                $("#loading-progress").text("Loading comments...");
                _Blog.gitment.id = hash;
                _Blog.gitment.title = title;
                new Gitment(_Blog.gitment).render("footer-comments");
                $("#loading-progress").text("Loaded!");
                $("#loading").fadeOut("slow");
            } catch(e) {
                onLoadError();
            }
        }
    });
}

function onLoadError() {
    $("#loading-progress").text("Oops! Load failed.");
    $("#loading-oops").show();
}

var CommentsState = 0;
function onToggleComments() {
    CommentsState = !CommentsState;
    $("#footer-menu-comments").text((CommentsState ? "◇ 隐藏" : "◆ 显示") + "评论区");
    $("#footer-comments").slideToggle("fast");
}

$(document).ready(function() {
    window.addEventListener("hashchange", function(e) {
        e.preventDefault();
        onHashChange();
    });
    $("#loading-oops-retry").click(onHashChange);
    $("#footer-menu-comments").click(onToggleComments);
    onHashChange();
});

})();