// NOTE: This is just for local development
// explicitly load the needed env file,
// NOTE that this will not prevent the vue-cli-service to load the "default" env files depending on the mode
// which will even overwrite any loaded by this call
// So if while building the Docker we copy this ""../.env.local" to the main Vue app folder all will work
const fs = require("fs");
if (fs.existsSync("../.env.local")) {
    require("dotenv").config({ path: "../.env.local" });
}

module.exports = {
    lintOnSave: false,
    configureWebpack: {
        // needed also in VSCode with the DebugInChrome extension
        devtool: "source-map"
    }
};
