window._Blog = window._Blog || {
    contentPath: "/blog",
    marked: {
        xhtml: true,
        highlight: function(code, lang) {
            return lang ? hljs.highlight(lang, code).value : code;
        }
    },
    gitment: {
        id: "",
        title: "",
        owner: "EZForever",
        repo: "blog",
        perPage: 10,
        labels: ["wontfix"],
        oauth: {
            client_id: "9c369032d9aee8ebcbb9",
            client_secret: "96a042204408eb4a8d9b36e9ddbcd5746f4fb1e0"
        },
        //Original English version
        //css: "https://imsun.github.io/gitment/style/default.css",
        //js: "https://imsun.github.io/gitment/dist/gitment.browser.js",
        //Chinese version
        css: "https://billts.site/extra_css/gitment.css",
        js: "https://billts.site/js/gitment.js"
    }
};
