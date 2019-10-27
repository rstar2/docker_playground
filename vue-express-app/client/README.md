# vue-express-app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### For debugging in the VSCode

1. Also source maps for Vue

```js
module.exports = {
    configureWebpack: {
        devtool: "source-map"
    }
};
```

2. Configure the debug configuration

```json
{
  "type": "chrome",
  "request": "launch",
  "name": "Vue-Express-App-Client - ChromeDebug",
  "url": "http://localhost:8080",
  "breakOnLoad": true,
  "webRoot": "${workspaceFolder}/vue-express-app/client/src",
  "sourceMapPathOverrides": {
    "webpack:///./src/*": "${webRoot}/*",
    "webpack:///src/*": "${webRoot}/*",
    // these are optional in some cases
    "webpack:///*": "*",
    "webpack:///./~/*": "${webRoot}/node_modules/*"
  }
},
```
