# TODO
Finished things will still be here until next TODO update.

## WIP
- [x] README for `.io` repo
- [x] `<table>` style
- [ ] Gitment servers are down now
  - Need a new source for Chinese UI
  - Need to change OAuth URL from `https://gh-oauth.imsun.net` to `https://cors-anywhere.herokuapp.com/github.com:443/login/oauth/access_token`

## Features (Maybe RIP)
- [ ] Footnotes
  - https://michelf.ca/projects/php-markdown/extra/#footnotes
  - https://daringfireball.net/2005/07/footnotes
  - And some other ideas on that page
  - Implemention idea: if a reference link's text starts with a `^`, strip it and add a `<sup>` wrapper
- [ ] Some ideas from [here][BeyondMarkdown]
  - Raw code injecting: Code block + `{=html}`
    - Also (mainly) `js`, `css`, `latex`
  - Header mark: `{#myheader}`
  - Inline attributes/classes, like `{> blue}`
    - Preset classes:
      - `< > =`
        - Text align: left, right, center
        - Affects a whole block (`<p>`, `<blockquote>`, `<pre>`, etc)
      - `^ _`
        - `<sup>` and `<sub>`
        - Affect area?
- [ ] Plugins
  - Like `{module collapse}` + `{collapse}xxx{/collapse}`
  - Support attributes: `{collapse show="+" hide="-"}xxx{/collapse}`
  - Plugins in mind:
    - `{toc}`
      - Generates a Table of Contents based on header markers
      - Collapsible of course
    - `{collapse}`
      - Collapsible blocks
      - http://scp-wiki-cn.wikidot.com/wiki-syntax#toc17
    - `{tabview}`
      - Multiple pages on same block
      - http://scp-wiki-cn.wikidot.com/wiki-syntax#toc35

[BeyondMarkdown]: https://talk.commonmark.org/t/beyond-markdown/2787

