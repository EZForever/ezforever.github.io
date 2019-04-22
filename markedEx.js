(function() {

var mdRenderer = new marked.Renderer();

// --- Copied from marked.js ---

mdRenderer.escape = function(html, encode) {
    if (encode) {
        if (this.escapeTest.test(html))
            return html.replace(this.escapeReplace, function (ch) { return mdRenderer.escapeReplacements[ch]; });
    } else {
        if (this.escapeTestNoEncode.test(html))
            return html.replace(this.escapeReplaceNoEncode, function (ch) { return mdRenderer.escapeReplacements[ch]; });
    }
  return html;
}

mdRenderer.escapeTest = /[&<>"']/;
mdRenderer.escapeReplace = /[&<>"']/g;
mdRenderer.escapeReplacements = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
};

mdRenderer.escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
mdRenderer.escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;

mdRenderer.unescape = function(html) {
    // explicitly match decimal, hex, and named HTML entities
    return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, function(_, n) {
        n = n.toLowerCase();
        if (n === 'colon') return ':';
        if (n.charAt(0) === '#') {
            return n.charAt(1) === 'x'
            ? String.fromCharCode(parseInt(n.substring(2), 16))
            : String.fromCharCode(+n.substring(1));
        }
        return '';
    });
}

// --- Modifyed from marked.js ---

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
            return this._extension(escaped ? this.unescape(code) : code, oParams);
    }

    if(this.options.highlight) {
        var out = this.options.highlight(code, lang);
        if (out != null && out !== code) {
            escaped = true;
            code = out;
        }
    }

    if(!lang)
        return `<pre><code>${escaped ? code : this.escape(code, true)}</code></pre>\n`;

    return `<pre><code class="${this.options.langPrefix + this.escape(lang, true)}">${escaped ? code : this.escape(code, true)}</code></pre>\n`;
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

// --- Extensions ---

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