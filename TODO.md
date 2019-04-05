# TODO
Finished things will still be here until next TODO update.

## WIP
- [ ] Docs for extensions

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
      - `^ v _`
        - `<sup>`, `<sub>` and `<u>`
        - Affect area?
      - Advanced effects can be added by plugins/CSS, like `.censored {color: black; background-color: black;}` or `.blur {color: transparent; text-shadow: 0 0 6px rgba(0,0,0,.3);}`
- [ ] Plugins (halfway!)
  - ~~Like `{module collapse}` + `{collapse}xxx{/collapse}`~~
  - ~~Support attributes: `{collapse show="+" hide="-"}xxx{/collapse}`~~
  - Plugins in mind:
    - `{toc}`
      - Generates a Table of Contents based on header markers
      - Collapsible of course
    - ~~`{collapse}`~~
      - Collapsible blocks
      - http://scp-wiki-cn.wikidot.com/wiki-syntax#toc17
    - `{tabview}`
      - Multiple pages on same block
      - http://scp-wiki-cn.wikidot.com/wiki-syntax#toc35

[BeyondMarkdown]: https://talk.commonmark.org/t/beyond-markdown/2787

