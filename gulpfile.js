const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify'); //JavaScript компрессор
const del = require('del'); //удаляет указанные файлы и директории
const babel = require('gulp-babel');

sass.compiler = require('node-sass');

function styles() {
	return gulp.src('./src/sass/main.scss') //берём файлы на обработку
				.pipe(sass().on('error', sass.logError)) //компиляция из scss в css
				.pipe(autoprefixer({  //расстановка префиксов
		            overrideBrowserlist: ['> 1%'],
		            cascade: false
		        }))
				.pipe(gulp.dest('./dist/css')); //сохраняем обработанные файлы
}

function scripts() {
	return gulp.src('./src/js/script.js') //берём файлы на обработку
				.pipe(babel({
           			presets: ['@babel/preset-env']
        		}))				
				.pipe(gulp.dest('./dist/js')); //сохраняем обработанные файлы
}

function watch() {   // создание таска, отслеживающего изменения файлов и, при наличии изменений, запускающего указанные обработчики-таски
	gulp.watch('./src/sass/**/*.scss', styles); //в случае изменений в исходниках scss, автоматически запускает на выполнение таск styles
	gulp.watch('./src/js/**/*.js', scripts);  //в случае изменений в исходниках js, автоматически запускает на выполнение таск scripts
}

function clean() {
	return del(['build/css/*', 'build/js/*']); //удаление файлов в указанных директориях
}


gulp.task('styles', styles); //регистрация таска styles
gulp.task('scripts', scripts); //регистрация таска scripts
gulp.task('watch', watch); //регистрация таска watch
gulp.task('clean', clean); //регистрация таска clean