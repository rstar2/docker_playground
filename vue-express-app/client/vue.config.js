// NOTE: This is just for local development
// explicitly load the needed env file,
// NOTE that this will not prevent the vue-cli-service to load
// the "default" env files depending on the mode
// which will even overwrite any loaded by this call
const fs = require("fs");
let serverPort = 9000;
if (fs.existsSync("../.env.local")) {
    require("dotenv").config({ path: "../.env.local" });
    serverPort = process.env.PORT;
    process.env.PORT = process.env.VUE_DEV_PORT;
}

module.exports = {
    lintOnSave: false,
    configureWebpack: {
        // needed also in VSCode with the DebugInChrome extension
        devtool: "source-map"
    },
    devServer: {
        proxy: {
            "/api": {
                target: `http://localhost:${serverPort}`,
                ws: true,
                changeOrigin: true
            }
        }
    }
};

if (process.env.NODE_ENV === "production") {
    module.exports.configureWebpack.devtool = false;
}
