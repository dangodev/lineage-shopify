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

to upload files to the theme ID as you work.

**Important:** this will overwrite any files in a theme. If you’re
developing, be sure to use a non-published theme, and update the
theme ID in `dist/config.yml`.

Alternatively, you can also run `theme upload` to upload everything.

See the [themekit docs](https://github.com/shopify/themekit) for more commands.
