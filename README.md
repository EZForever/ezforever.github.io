# ezforever.github.io
A frontend-only *blog platform*.

Written with 100% HTML/CSS/JS(jQuery), all you need for this site to work is a `httpd`, no matter it's from busybox or apache.

Only about 20KB in size (uncompressed), whole framework is even smaller than the favicon itself!

## But why?
1. A well-working web hosting platform does not exist when you're Chinese and lack of financial support.
2. I know GitHub Pages supports Jekyll (and that thing is just awesome!), but I decide to keep my attitude to both Ruby and Python. [This post](https://www.hackerfactor.com/blog/index.php?/archives/825-8-Reasons-Python-Sucks.html) gets the point.
3. [Here](https://github.com/hugcoday/hugcoday.github.com) is a similar project, but it's abandoned and I don't like the way it work.
4. To block search engines from crawling my posts. That little hashtag in URL does it well.
5. [Less is more.](https://motherfuckingwebsite.com/)

## So how?

### How it's made
| Feature  | Component |
| :------- | :-------- |
| Inspiration | [TexMe][1] (Huge thanks!) |
| Web hosting | [GitHub Pages][2] (without Jekyll) |
| Styling | TexMe (base CSS), [this page][3] (content appearance) and GitHub (some tweaks) |
| Markdown parsing | ~~TexMe~~ [Marked][4] |
| Code highlighting | [highlight.js][5] |
| Commenting | [Gitment][6] (in [Chinese][7]) |
| Toolbar icons | [bytesize-icons][8] |
| Misc things | [jQuery][N] (aka the javascript life-saver) |

[1]: https://github.com/susam/texme
[2]: https://pages.github.com/
[3]: http://scp-wiki-cn.wikidot.com/component:ar-theme
[4]: https://marked.js.org/
[5]: https://highlightjs.org/
[6]: https://github.com/imsun/gitment
[7]: https://github.com/ezforever/gitment-mod
[8]: https://github.com/danklammer/bytesize-icons
[N]: https://jquery.com/

### How to use
*Disclaimer: MIT license means I DO NOT provide any warranty for this platform. Since I designed this thing for personal usage only, I may change ANYTHING at ANYTIME (take a look at commit logs). Think before you fork.*

If you decide to create a blog based on this platform, here's a checklist of necessary steps:
- [ ] Fork this repo (but not [my content repo](https://github.com/EZForever/blog)!)
- [ ] Create your own content repo
- [ ] Enable GitHub Pages on both repos
  - You might want to rename your fork for a shorter URL
- [ ] [Register an OAuth application](https://github.com/settings/applications/new) for Gitment
- [ ] Modify `config.js`:
  - `titleSuffix`: String to put after your page title
  - `contentPath`: Path to your Markdown files on web server, usually `/<name of your content repo>`
  - `gitment.owner`: Your GitHub username
  - `gitment.repo`: Name of your content repo
  - `gitment.oauth`: Client ID & Client Secret of your newly-created OAuth application
- [ ] Commit your blog frontpage with filename `default.md` onto your content repo
- [ ] Check if your blog works

Additional steps, if you like:
- Upload a new `favicon.ico`
- Change page style via modifying `styles.css` (page style) and `hljs.css` (code highlight style)
- Minimize all HTML/CSS/JS files (not recommended though)

### How to contribute
As mentioned above this is a personal project, but if you've got some shiny ideas just let me know by sending PM or PR.

Whatever you do, here are some rules that you'd better obey:
1. Take a look at `TODO.md`. Entries there are what I really wanted/needed to do.
2. Do not introduce any "fancy" or unworthy feature or code. This platform is born to be lightweight. Less *is* more.
3. If you dislike the idea of building such a blog, then just go. Go find one you like. Don't argue with me.

## Other questions
[Is it safe to make my OAuth client secret public?](https://github.com/imsun/gitment#about-security)

*More questions coming soon*

## Useful links for blog management
[GitHub Pages tutorial](https://help.github.com/en/categories/github-pages-basics)

[More highlight.js themes](https://github.com/highlightjs/highlight.js/tree/master/src/styles)

[Gitment repo page (with configuration details)][5]

