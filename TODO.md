# TODO
Finished things will still be here until next TODO update.

## WIP
- [x] README for `.io` repo
- [x] `<table>` style
- [ ] Delayload Gitment (It's too darn slow)
  - How?

## Features (Maybe RIP)
- [ ] Some ideas from [here][BeyondMarkdown]
  - Raw code injecting: Code block + `{=html}`
    - Also `js`, `css`, `latex`
  - Header mark: `{#myheader}`
  - Inline attributes/classes, like `{> blue}`
    - Affects a whole block (`<p>`, `<blockquote>`, `<pre>`, etc)
    - Preset symbolic classes: `< > = ^ _`
- [ ] DIY markers: `^Hello^` == `<sup>Hello</sup>`, etc
  - ~~May~~ not a good idea, use inline attributes like above
  - What's the marker for `<sub>`?
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

