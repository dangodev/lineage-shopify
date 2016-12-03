# Lineage Shopify Theme

## Setup

Install Shopify’s [Theme Kit](https://github.com/shopify/themekit) CLI.

Then run:

```
npm i
```

Also install Webpack (`npm i -g webpack@2.1.0-beta.27`) globally if you
haven’t already.

To hook this up to the store, fill in the information from `dist/config-sample.yml` and
save it as `dist/config.yml`. Fill in the values from Shopify Dashboard > Apps > Private Apps > Drew’s Dev Pipeline.
The creds aren’t stored in this repo for security.

## Development

In one terminal window, run

```
webpack -p --watch
```

to auto-compile assets. In another terminal window, run

```
theme watch
```

within `dist/` to upload files as you work.

**Important: this will overwrite any files in a theme.** If you’re
developing major changes, either duplicate the current theme to a
non-published copy, or develop a new theme entirely. Be sure to change
the theme ID in `dist/config.yml`.

Alternatively, you can also run `theme upload` to upload everything.

See the [themekit docs](https://github.com/shopify/themekit) for more commands.

### Test/debug

Need to try something that’s just not working / taking too long on
Shopify? Install Webpack Dev Server if you haven’t already (`npm i -g webpack-dev-server@2.1.0-beta.10`),
start the server (`webpack-dev-server`), and navigate to `localhost:8080/test.html`.

Alternately, you can create additional HTML files within this
directory to test/develop anything you need to locally. None of it will
get pushed to the theme.

### Linting

This repo comes with [ESLint](http://eslint.org/) and [stylelint](https://github.com/stylelint/stylelint) configured. Using a
compatible plugin with your preferred text editor (preferring local
config over global config) will give inline linting.
