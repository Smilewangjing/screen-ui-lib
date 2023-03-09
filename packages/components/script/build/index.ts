import delPath from '../utils/delpath';
import { series, parallel, src, dest } from 'gulp';
import { pkgPath, componentPath } from '../utils/paths';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import run from '../utils/run';
//删除easyest

export const removeDist = () => {
    return delPath(`${pkgPath}/screen-ui`);
};

//打包样式
export const buildStyle = () => {
    const sass = gulpSass(dartSass);
    return src(`${componentPath}/src/**/style/**.scss`)
        .pipe(sass.sync()) // 2.转换scss
        .pipe(autoprefixer()) // 3.自动添加前缀
        .pipe(dest(`${pkgPath}/screen-ui/lib/src`))
        .pipe(dest(`${pkgPath}/screen-ui/es/src`));
};

//打包组件
export const buildComponent = async () => {
    run('pnpm run build', componentPath);
};
export default series(
    async () => removeDist(),
    parallel(
        async () => buildStyle(),
        async () => buildComponent()
    )
);
