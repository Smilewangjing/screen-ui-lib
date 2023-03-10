import run from '../../components/script/utils/run';
import { pkgPath } from '../../components/script/utils/paths';
import { series } from 'gulp';
export const publishComponent = async () => {
    run('pnpm publish', `${pkgPath}/utils`);
};
export default series(async () => publishComponent());
