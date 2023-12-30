const babelConfig = {
    babel: {
      options: {
        sourceMap: false,
        presets: ["@babel/preset-env"],
        plugins: [["babel-plugin-preserve-comment-header",{pattern: "priority:"}]],
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
