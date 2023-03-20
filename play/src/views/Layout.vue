<template>
    <div class="common-layout">
        <el-container>
            <el-aside class="side" width="200px">
                <el-menu
                    active-text-color="#ffd04b"
                    background-color="#545c64"
                    class="el-menu-vertical-demo"
                    text-color="#fff"
                    :router="true"
                    theme="dark"
                    unique-opened
                    :default-active="activeMenu"
                >
                    <el-sub-menu index="1-1" v-for="item in menus" :key="item.index">
                        <template #title>{{ item.name }}</template>
                        <el-menu-item
                            v-for="menu in item.children"
                            :key="menu.index"
                            :index="menu.index"
                            >{{ menu.name }}</el-menu-item
                        >
                    </el-sub-menu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main>
                    <RouterView />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const menus = [
    {
        name: '图表',
        index: '/echarts',
        children: [
            {
                name: '柱状图',
                index: '/bar'
            },
            {
                name: '饼图',
                index: '/pie'
            }
        ]
    }
];
const route = useRoute();
const activeMenu = ref();
watch(
    () => route.matched,
    () => {
        if (route.matched?.length) {
            activeMenu.value = route.matched[route.matched.length - 1]?.path;
        }
    },
    {
        deep: true,
        immediate: true
    }
);
</script>
<style scoped>
.common-layout,
.el-container {
    height: 100%;
}
.side {
    height: 100%;
    background: #545c64;
}
</style>
