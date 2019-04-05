(function() {

var mdRenderer = new marked.Renderer();

// Renderer-Heading: Add permalink class.
mdRenderer.heading = function(text, level, raw, slugger) {
    if(this.options.headerIds) {
        var id = this.options.headerPrefix + slugger.slug(raw);
        if(this.options._headingsEx)
            return `<h${level} id="${id}" class="heading">${text}<a class="permalink" href="#${id}"></a></h${level}>\n`;
        return `<h${level} id="${id}">${text}</h${level}>\n`;
    }
    // ignore IDs
    return `<h${level}>${text}</h${level}>\n`;
};

// Renderer-Code: Add extension function support.
mdRenderer.code = function(code, infostring, escaped) {
    var lang = (infostring || ''); // .match(/\S*/)[0];

    if(this.options._extensions) {
        var oParams = lang.match(/^\{(\w+) *(.*)\}$/);
        if(oParams)
            return this._extension(escaped ? unescape(code) : code, oParams);
    }

    if(this.options.highlight) {
        var out = this.options.highlight(code, lang);
        if (out != null && out !== code) {
            escaped = true;
            code = out;
        }
    }

    if(!lang)
        return `<pre><code>${escaped ? code : escape(code, true)}</code></pre>\n`;

    return `<pre><code class="${this.options.langPrefix + escape(lang, true)}">${escaped ? code : escape(code, true)}</code></pre>\n`;
};

mdRenderer._extension = function(sContent, oParams) {
    if(!(oParams[1] in this._extensions))
        return `<p><em>ERROR: Unknown extension function '${oParams[1]}'</em></p>`;
    try {
        return this._extensions[oParams[1]](sContent, oParams[2]);
    } catch(e) {
        console.error(e);
        return `<p><em>ERROR: Extension function '${oParams[1]}' - check console</em></p>`;
    }
}

mdRenderer._extensions = {
    // {collapse [Label = "Click to Expand"]}
    collapse: function(sContent, sParam) {
        return `
            <fieldset class="collapse collapse-hidden">
                <legend>${sParam || "Click to Expand"}</legend>
                ${marked(sContent)}
            </fieldset>
        `;
    }
};

marked.setOptions({renderer: mdRenderer});

})();