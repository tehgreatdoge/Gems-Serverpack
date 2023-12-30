const babelConfig = {
    babel: {
      options: {
        sourceMap: false,
        presets: ["@babel/preset-env"],
        plugins: [
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
      
      grunt.registerTask("default", ["babel"]);
}
