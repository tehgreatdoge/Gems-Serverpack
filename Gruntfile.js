const fs = require("node:fs")
const path = require("node:path")
const ignore = require("ignore")

const babelConfig = {
    babel: {
      options: {
        sourceMap: false,
        plugins: [
            "@babel/plugin-transform-parameters",
            "@babel/plugin-transform-logical-assignment-operators",
            "@babel/plugin-transform-class-properties",
            "@babel/plugin-transform-classes",
            "@babel/plugin-transform-nullish-coalescing-operator",
            "@babel/plugin-transform-destructuring",
            ["babel-plugin-preserve-comment-header",{
                //This is regex for matching headers in KubeJS scripts so that babel doesn't push them to random places
                pattern: "priority:"
            }]],
        sourceType: "script"
      },
      dist: {
        files: [
            {
                expand: true, // enables dynamic expansion of file paths
                cwd: 'src/', // current working directory
                src: ["**/*.js"],
                dest: "kubejs/"
            }
        ],
      }
    }
}

module.exports = function(grunt) {
    grunt.initConfig(babelConfig);

        grunt.loadNpmTasks('grunt-babel');
        grunt.registerTask("makeSymlinks", "Adds all the symlinks to the workspace", () => {
            if (!fs.existsSync("./src/server_scripts/common.js")) {
                fs.symlinkSync(path.join(process.cwd(),"./src/startup_scripts/common.js"), "./src/server_scripts/common.js")
            }
            else {
                grunt.log.writeln("startup_scripts/common.js symlink already exists")
            }
        })
        grunt.registerTask("assemble", "Puts all the correct folders in /dist", () => {
            fs.mkdirSync("./dist")
            fs.mkdirSync("./dist/overrides")
            grunt.log.write("Copying kubejs ")
            fs.cpSync("./kubejs/", "./dist/overrides/kubejs/", {'errorOnExist': true, "recursive":true})
            grunt.log.ok()
            grunt.log.write("Copying config ")
            let ignoreFile = ignore()
            ignoreFile.add(fs.readFileSync(".gitignore").toString())
            //fs.cpSync gives extended length paths but process.cwd doesn't
            if (path.win32 == path) {
                //Convert cwd to extended length
                let cwd = "\\\\?\\"+process.cwd()
                fs.cpSync("./config/", "./dist/overrides/config/", {'errorOnExist': true, "recursive":true, filter: (src) => {
                    src = path.relative(cwd,src)
                    return !ignoreFile.ignores(src)
                }})
            }
            grunt.log.ok()
            grunt.log.write("Copying defaultconfigs ")
            fs.cpSync("./defaultconfigs/", "./dist/overrides/defaultconfigs/", {'errorOnExist': true, "recursive":true})
            grunt.log.ok()
            grunt.log.write("Copying manifest ")
            fs.copyFileSync("./manifest.json","./dist/manifest.json")
            grunt.log.ok()
        })
        grunt.registerTask("cleanScripts", "Cleans the built scripts from /kubejs", () => {
            grunt.log.write("Cleaning scripts ")
            fs.rmSync("./kubejs/client_scripts", { recursive: true, force: true })
            fs.rmSync("./kubejs/server_scripts", { recursive: true, force: true })
            fs.rmSync("./kubejs/startup_scripts", { recursive: true, force: true })
            grunt.log.ok()
        })
        grunt.registerTask("cleanDist", "Cleans the /dist folder", () => {
            grunt.log.write("Cleaning dist ")
            fs.rmSync("./dist", { recursive: true, force: true })
            grunt.log.ok()
        })
        grunt.registerTask("dev", "Copies files to the instance specified by localConfig.json", () => {
            //Load the localConfig.json
            let config
            if (fs.existsSync("./localConfig.json")) {
                let configText = fs.readFileSync("./localConfig.json")
                try {
                    config = JSON.parse(configText)
                }
                catch(err) {
                    grunt.log.error("Unable to parse localConfig.json")
                    grunt.log.error(err)
                    return false
                }
            }
            else {
                grunt.log.error("Unable to find localConfig.json")
                return false
            }
            // Verify if the minecraft instance exists
            if (!fs.existsSync(config.instanceFolder)) {
                grunt.log.error("Unable to find the minecraft instance specified by localConfig.json$instanceFolder")
                return false
            }
            grunt.log.writeln("Symlinking scripts")
            fs.rmSync(path.join(config.instanceFolder,"kubejs/"), {recursive: true, force: true})
            fs.symlinkSync(path.join(process.cwd(),"./kubejs"), path.join(config.instanceFolder,"kubejs/"),"dir")
            // Sorry linux users, idk if night config will work properly with symlinks (idk why it works with junctions either)
            grunt.log.writeln("Junctioning config")
            fs.rmSync(path.join(config.instanceFolder,"config/"),{ recursive: true, force: true })
            fs.symlinkSync(path.join(process.cwd(),"./config"), path.join(config.instanceFolder,"config"),"junction")
            grunt.log.writeln("Symlinking defaultconfigs")
            fs.rmSync(path.join(config.instanceFolder,"defaultconfigs/"), { recursive: true, force: true })
            fs.symlinkSync(path.join(process.cwd(),"./defaultconfigs"), path.join(config.instanceFolder,"defaultconfigs/"),"dir")
        })
        grunt.registerTask("default", ["makeSymlinks","babel", "dev"]);
        grunt.registerTask("build", ["cleanScripts", "cleanDist","makeSymlinks","babel", "assemble"]);
}
