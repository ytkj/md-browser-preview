# md-browser-preview

Preview markdown text in web browser.
Compile .md into .html, then launch local web server and default web browser in your system.
Compilation and reloading browser is automatically done when saving .md file.

## Install

1. `npm install -g md-browser-preview`
1. `md-browser-preview xxx.md`

## Usage

### CLI

    Usage:
    > md-browser-preview [options] [filename]

    Options:
      -o, --output   where to output compiled html file              [string] [default: false]
      -p, --port     port listen on for inner local web server        [number] [default: 5000]
      -b, --browser  web browser to launch in your system        [string] [default: "default"]
      -t, --title    title of generated html document [string] [default: "md-browser-preview"]
      -g, --gfm      use github favored markdown                     [boolean] [default: true]
      -s, --style   highlight.js style sheet name                [string] [default: "github"]
      -h, --help     show this help menu                                             [boolean]

### Node.js Programming

#### Basic Usage

```javascript
const MdBrowserPreview = require('md-browser-preview');

MdBrowserPreview.init({
    input: './target.md',
    output: '.'
});
```

#### Advanced Usage

```javascript
const MdBrowserPreview = require('md-browser-preview');

// instanciate
let mbp = new MdBrowserPreview({
    input: './target.md',
    output: '.'
});

// compile, launch local server and browser, then start watching.
mbp.compile().then(() => {
    return mbp.serve();
}).then(() => {
    mbp.startWatch();
});

// exit local server and stop watching.
mbp.exit();
```

## Development

1. `git clone https://github.com/ytkj/md-browser-preview.git`
1. `cd md-browser-preview`
1. `npm install`
1. `npm link`
