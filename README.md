# md-browser-preview

Preview markdown text in web browser.
Compile .md into .html, then launch local web server and default web browser in your system.
Compilation and reloading browser is automatically done when saving .md file.

## Install

1. `npm install -g https://github.com/ytkj/md-browser-preview.git`
1. `md-browser-preview xxx.md`

## Usage

    Usage:
    > md-browser-preview [options] [filename]

    Options:
      -p, --port     port listen on for inner local web server        [number] [default: 5000]
      -b, --browser  web browser to launch in your system        [string] [default: "default"]
      -t, --title    title of generated html document [string] [default: "md-browser-preview"]
      -g, --gfm      use github favored markdown                     [boolean] [default: true]
      -s, --style    highlight.js style sheet name                [string] [default: "github"]
      -h, --help     show this help menu                                             [boolean]

## Development

1. `git clone https://github.com/ytkj/md-browser-preview.git`
1. `cd md-browser-preview`
1. `npm install`
1. `npm link`
