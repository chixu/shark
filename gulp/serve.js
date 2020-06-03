const gulp = require("gulp");
const browserSync = require('browser-sync').create();
const argv = require("yargs").argv;

gulp.task("serve", function () {
  let port = argv.p || 3000;
  console.log(port);
  browserSync.init({
    port: port,
    server: {
      baseDir: "./bin/debug/html5/"
    }
  });

  gulp.watch([
    "./bin/**/index.html",
    "./bin/**/js/*.js"
  ]).on("change", () => browserSync.reload());

});