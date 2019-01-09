//TODO Anchor: view-source:https://marked.js.org/

function onHashChange() {
  var hash = location.hash.slice(1) || "main.md";
  $("body").animate({backgroundColor: "#446"}, "fast");
  $.ajax({
    url: hash,
    cache: false,
    success: function(text) {
      try {
        $("#main").html(texme.render(text));
        $("pre,code").each(function(i, block) {
          hljs.highlightBlock(block);
        });
      } catch(e) {
        $("body").animate({backgroundColor: "#644"}, "slow");
      }
    },
    error: function() {
      $("body").animate({backgroundColor: "#644"}, "slow");
    },
    complete: function() {
      $("body").animate({backgroundColor: "#444"}, "fast");
    }
  });
}

$(document).ready(function() {
  window.addEventListener("hashchange", function(e) {
    e.preventDefault();
    onHashChange();
  });
  onHashChange();
});