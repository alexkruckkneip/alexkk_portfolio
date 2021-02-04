// variables
//-------------------------------------------------
var basePaths = {
 src: 'build/',
 dest: 'html/assets/',
};
var paths = {
 sass: {
  src: basePaths.src + 'sass/**/*.scss',
  dest: basePaths.dest + 'css/'
 },
 html: {
  src: 'html/*.html' && 'html/app/foundations/*.html' && 'html/app/components/*.html'
 }
};
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var $ = {
 sass: require('gulp-sass'),
}

var sourcemaps = require('gulp-sourcemaps');

// var to create svg sprite
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var path = require('path');
var inject = require('gulp-inject');


// generate icon svg sprite
//-------------------------------------------------

gulp.task('svgstore', function () {
    var svgs = gulp
        .src('build/sprite/svg/*.svg')
        .pipe(svgmin(function(file) {
         return {
          plugins: [{
           cleanupIDs: {
            minify: true
           }
          }]
         }
        }))
        .pipe(svgstore({ inlineSvg: true }));

    function fileContents (filePath, file) {
        return file.contents.toString();
    }

    return gulp
        .src('html/index.html')
        .pipe(inject(svgs, { transform: fileContents }))
        .pipe(gulp.dest('html/'));
});


// Create woff out of a ttf
//-------------------------------------------------
var ttf2woff = require('gulp-ttf2woff');

gulp.task('ttf2woff', function(){
  gulp.src(['html/assets/fonts/Roboto_Slab/*.ttf'])
    .pipe(ttf2woff())
    .pipe(gulp.dest('html/assets/fonts/Roboto_Slab/'));
});


// Create woff out of a ttf
//-------------------------------------------------
var ttf2eot = require('gulp-ttf2eot');

gulp.task('ttf2eot', function(){
  gulp.src(['html/assets/fonts/Roboto_Slab/*.ttf'])
    .pipe(ttf2eot())
    .pipe(gulp.dest('html/assets/fonts/Roboto_Slab/'));
});

// default task runner
//-------------------------------------------------
gulp.task('default', ['serve']);


// start browser sync and server task
//-------------------------------------------------

// Compile sass files
gulp.task('sass', function() {
 gulp.src(paths.sass.src)
  .pipe(sourcemaps.init())
  .pipe($.sass({
   includePaths: [paths.sass.src]
  }).on('error', $.sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(paths.sass.dest))
  .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

 browserSync.init({
  server: "./html"
 });

 //if any scss changes, create create new sass
 gulp.watch(paths.sass.src, ['sass']);
 gulp.watch(paths.html.src).on('change', browserSync.reload);
});


// Create the favicon
//-------------------------------------------------

var realFavicon = require ('gulp-real-favicon');
var fs = require('fs');

// File where the favicon markups are stored
var FAVICON_DATA_FILE = 'faviconData.json';

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', function(done) {
	realFavicon.generateFavicon({
		masterPicture: 'assets/img/favicon-master.png',
		dest: 'html/assets/favicon/',
		iconsPath: '/',
		design: {
			ios: {
				pictureAspect: 'noChange',
				assets: {
					ios6AndPriorIcons: false,
					ios7AndLaterIcons: false,
					precomposedIcons: false,
					declareOnlyDefaultIcon: true
				}
			},
			desktopBrowser: {
				design: 'raw'
			},
			windows: {
				pictureAspect: 'noChange',
				backgroundColor: '#da532c',
				onConflict: 'override',
				assets: {
					windows80Ie10Tile: false,
					windows10Ie11EdgeTiles: {
						small: false,
						medium: true,
						big: false,
						rectangle: false
					}
				}
			},
			androidChrome: {
				pictureAspect: 'noChange',
				themeColor: '#ffffff',
				manifest: {
					display: 'standalone',
					orientation: 'notSet',
					onConflict: 'override',
					declared: true
				},
				assets: {
					legacyIcon: false,
					lowResolutionIcons: false
				}
			},
			safariPinnedTab: {
				pictureAspect: 'blackAndWhite',
				threshold: 39.0625,
				themeColor: '#5bbad5'
			}
		},
		settings: {
			scalingAlgorithm: 'Mitchell',
			errorOnImageTooSmall: false,
			readmeFile: false,
			htmlCodeFile: false,
			usePathAsIs: false
		},
		markupFile: FAVICON_DATA_FILE
	}, function() {
		done();
	});
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', function() {
	return gulp.src([ 'html/*.html' ])
		.pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
		.pipe(gulp.dest('html'));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function(done) {
	var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
	realFavicon.checkForUpdates(currentVersion, function(err) {
		if (err) {
			throw err;
		}
	});
});
