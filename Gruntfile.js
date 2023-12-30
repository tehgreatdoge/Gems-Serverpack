const fs = require("node:fs")
const path = require("node:path")

const babelConfig = {
    babel: {
      options: {
        sourceMap: false,
        plugins: [
            "@babel/plugin-transform-class-properties",
            "@babel/plugin-transform-classes",
            "@babel/plugin-transform-nullish-coalescing-operator",
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
                grunt.log.error("Unable to find the minecraft instance specified by .instanceFolder")
                return false
            }
            let progress = grunt.log.writeln("Symlinking scripts")
            fs.rmSync(path.join(config.instanceFolder,"kubejs/"))
            fs.symlinkSync(path.join(process.cwd(),"./kubejs"), path.join(config.instanceFolder,"kubejs/"),"dir")
        })
        grunt.registerTask("default", ["babel", "dev"]);
}
