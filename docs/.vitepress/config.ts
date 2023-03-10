import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: '大屏组件库',
    description: '',
    themeConfig: {
        nav: [
            { text: '指南', link: '/' },
            { text: '组件', link: '/component/button' }
        ],

        sidebar: [
            {
                text: '组件',
                items: [{ text: '按钮', link: '/component/button' }]
            }
        ]
    }
});
