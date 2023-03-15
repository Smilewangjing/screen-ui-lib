<template>
    <div class="bar-host">
        <div class="bar">
            <s-bar
                :data="[10, 20, 40, 60, 80]"
                :category="['断网', '断电', '非法操作', '钥匙开门', '非法人员']"
                :barWidth="24"
                :rect-bar-width="24"
                :showRect="true"
            ></s-bar>
        </div>
        <div class="bar">
            <s-bar
                :data="[10, 20, 40, 60, 95]"
                :category="['断网', '断电', '非法操作', '钥匙开门', '非法人员']"
                :showShadow="true"
                :showLabel="true"
                :showRect="true"
                :barWidth="24"
                :rect-bar-width="24"
            ></s-bar>
        </div>
        <div class="bar">
            <s-double-bar
                :data="[
                    { name: '分类1', value: [10, 20, 40, 60, 80] },
                    { name: '分类2', value: [20, 20, 50, 60, 90] }
                ]"
                :category="['断网', '断电', '非法操作', '钥匙开门', '非法人员']"
                :showShadow="true"
                :showLabel="true"
            ></s-double-bar>
        </div>
        <div class="bar">
            <s-double-bar
                :data="[
                    { name: '分类1', value: [10, 20, 40, 60, 80] },
                    { name: '分类2', value: [20, 20, 50, 60, 90] }
                ]"
                :category="['断网', '断电', '非法操作', '钥匙开门', '非法人员']"
                :showShadow="true"
                :showLabel="true"
                :showRect="true"
            ></s-double-bar>
        </div>

        <div class="bar">
            <!-- TODO：末尾圆点 -->
            <s-bar
                :data="[10, 20, 40, 60, 80]"
                :category="['断网', '断电', '非法操作', '钥匙开门', '非法人员']"
                :barWidth="6"
                :showLabelStyle="true"
                :showRect="false"
                :barBorderRadius="[3, 3, 0, 0]"
            ></s-bar>
        </div>
        <div class="bar">
            <!-- TODO：末尾圆点 -->
            <s-bar
                :data="[10, 20, 40, 60, 80]"
                :category="['断网', '断电', '非法操作', '钥匙开门', '非法人员']"
                :barWidth="6"
                :showLabel="true"
                :showRect="false"
            ></s-bar>
        </div>
        <div class="bar">
            <s-bar
                :data="[10, 20, 50, 60, 80]"
                :category="['断网', '断电', '非法操作', '钥匙开门', '非法人员']"
                :showShadow="true"
                :showLabel="true"
                :splitBar="true"
            ></s-bar>
        </div>
        <div class="bar">
            <s-bar
                :data="[10, 20, 40, 60, 80]"
                :category="['断网', '断电', '非法操作', '钥匙开门', '非法人员']"
                :showBar3D="true"
                :showLabel="true"
            ></s-bar>
        </div>
    </div>
</template>

<script setup lang="ts"></script>
<style scoped>
.bar-host {
    width: 100%;
    height: 100%;
}
.bar {
    display: inline-block;
    width: 50%;
    height: 300px;
}
</style>
