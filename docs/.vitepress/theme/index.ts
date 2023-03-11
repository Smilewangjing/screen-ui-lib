// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import Theme from 'vitepress/theme';
import './style.css';
import ahsdataUI from 'ahsdata-ui';

export default {
    ...Theme,
    Layout: () => {
        return h(Theme.Layout, null, {});
    },
    enhanceApp({ app, router, siteData }) {
        app.use(ahsdataUI);
    }
};
