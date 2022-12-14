import gulp from 'gulp';
import browserSync from 'browser-sync';

// Config
import path from './gulp/config/path.js';
import app from './gulp/config/app.js';

global.$ = {
    path: path,
    app: app,
};

// Tasks
import clear from './gulp/tasks/clear.js';
import server from './gulp/tasks/server.js';
import html from './gulp/tasks/html.js';
import scss from './gulp/tasks/scss.js';
import js from './gulp/tasks/script.js';
import img from './gulp/tasks/img.js';
import fonts from './gulp/tasks/fonts.js';
import svgSprite from './gulp/tasks/sprite.js';

export {
    js,
    clear,
    svgSprite,
    img,
    html,
    scss
};

// Watcher
const watcher = () => {
    gulp.watch(path.html.watch, html).on('all', browserSync.reload);
    gulp.watch(path.scss.watch, scss).on('all', browserSync.reload);
    gulp.watch(path.js.watch, js).on('all', browserSync.reload);
    gulp.watch(path.img.watch, img);
    gulp.watch(path.fonts.watch, fonts);
};

const build = gulp.series(
    clear,
    gulp.parallel(html, scss, js, img, svgSprite, fonts),
);

const dev = gulp.series(
    build,
    gulp.parallel(watcher, server),
);

// Default
export default app.isProd ? build : dev;


