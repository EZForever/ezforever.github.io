//TODO Anchor: view-source:https://marked.js.org/

function onHashChange() {
  var hash = location.hash.slice(1) || "main.md";
  $("body").animate({backgroundColor: "#446"}, "fast");
  $.ajax({
    url: hash,
    cache: false,
    error: onError,
    success: function(text) {
      try {
        $("#main").html(texme.render(text));
        $("pre").each(function(i, block) {
          hljs.highlightBlock(block);
        });
        $("#oops").hide();
      } catch(e) {
        onError();
      }
    },
    complete: function() {
      $("body").animate({backgroundColor: "#444"}, "fast");
    }
  });
}

function onError() {
  $("body").animate({backgroundColor: "#644", scrollTop: 0}, "slow");
  $("#oops").show();
}

$(document).ready(function() {
  window.addEventListener("hashchange", function(e) {
    e.preventDefault();
    onHashChange();
  });
  $("#oops-retry").click(onHashChange);
  onHashChange();
});