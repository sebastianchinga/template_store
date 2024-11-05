import {src, dest, watch, series} from 'gulp';
import fs from 'fs';
import path from 'path';

import { glob } from 'glob';
import sharp from 'sharp';

import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass);

export function css(done) {
    src('src/sass/index.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('public/build'))
    done();
}

export function js(done) {
    src('src/js/index.js').pipe(dest('public/build'))
    done();
}

export async function imagenes(done) {
    const srcDir = './src/img';
    const buildDir = './public/build/img';
    const images = await glob('./src/img/**/*{jpg,png}')

    images.forEach(file => {
        const relativePath = path.relative(srcDir, path.dirname(file));
        const outputSubDir = path.join(buildDir, relativePath);
        procesarImagenes(file, outputSubDir);
    });
    done();
}

function procesarImagenes(file, outputSubDir) {
    if (!fs.existsSync(outputSubDir)) {
        fs.mkdirSync(outputSubDir, { recursive: true })
    }
    const baseName = path.basename(file, path.extname(file))
    const extName = path.extname(file)
    const outputFile = path.join(outputSubDir, `${baseName}${extName}`)
    const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`)

    const options = { quality: 80 }
    sharp(file).jpeg(options).toFile(outputFile)
    sharp(file).webp(options).toFile(outputFileWebp)
}

export function svg(done) {
    src('src/img/**/*.svg')
        .pipe(dest('public/build/img'))
    done();
}

export function dev(done) {
    watch('src/sass/**/*.scss', css)
    watch('src/js/**/*.js', js)
    watch('src/img/**/*.{jpeg,png}', imagenes)
    watch('src/img/**/*.svg', svg)
}

export default series(css, js, imagenes, svg, dev);