<template>
    <el-row :gutter="20">
        <el-col :span="12" class="bar">
            <s-bar
                :data="[10, 20, 40, 60, 80]"
                :category="['断网', '断电', '非法操作', '钥匙开门', '非法人员']"
                :barWidth="24"
                :rect-bar-width="24"
                :showRect="true"
            ></s-bar>
        </el-col>
        <el-col :span="12" class="bar">
            <s-bar
                :data="[10, 20, 40, 60, 95]"
                :category="['断网', '断电', '非法操作', '钥匙开门', '非法人员']"
                :showShadow="true"
                :showLabel="true"
                :showRect="true"
                :barWidth="24"
                :rect-bar-width="24"
            ></s-bar>
        </el-col>
        <el-col :span="12" class="bar">
            <s-double-bar
                :data="[
                    { name: '分类1', value: [10, 20, 40, 60, 80] },
                    { name: '分类2', value: [20, 20, 50, 60, 90] }
                ]"
                :category="['断网', '断电', '非法操作', '钥匙开门', '非法人员']"
                :showShadow="true"
                :showLabel="true"
            ></s-double-bar
        ></el-col>
        <el-col :span="12" class="bar">
            <s-double-bar
                :data="[
                    { name: '分类1', value: [10, 20, 40, 60, 80] },
                    { name: '分类2', value: [20, 20, 50, 60, 90] }
                ]"
                :category="['断网', '断电', '非法操作', '钥匙开门', '非法人员']"
                :showShadow="true"
                :showLabel="true"
                :showRect="true"
            ></s-double-bar
        ></el-col>
        <el-col :span="12" class="bar">
            <s-bar
                :data="[10, 20, 40, 60, 80]"
                :category="['断网', '断电', '非法操作', '钥匙开门', '非法人员']"
                :barWidth="6"
                :showLabelStyle="true"
                :showRect="false"
                :barBorderRadius="[3, 3, 0, 0]"
                :showSymbol="true"
            ></s-bar>
        </el-col>
        <el-col :span="12" class="bar">
            <s-bar
                :data="[10, 20, 40, 60, 80]"
                :category="['断网', '断电', '非法操作', '钥匙开门', '非法人员']"
                :barWidth="6"
                :showLabel="true"
                :showRect="false"
                :showSymbol="true"
                :disbledEmphasis="true"
            ></s-bar>
        </el-col>
        <el-col :span="12" class="bar">
            <s-bar
                :data="[10, 20, 50, 60, 80]"
                :category="['断网', '断电', '非法操作', '钥匙开门', '非法人员']"
                :showShadow="true"
                :showLabel="true"
                :splitBar="true"
            ></s-bar>
        </el-col>
        <el-col :span="12" class="bar">
            <s-prism-bar-3D
                :data="[10, 20, 40, 60, 80]"
                :category="['断网', '断电', '非法操作', '钥匙开门', '非法人员']"
                :showBar3D="true"
                :showLabel="true"
            ></s-prism-bar-3D>
        </el-col>
        <el-col :span="12" class="bar">
            <s-double-bar
                :data="[
                    { name: '分类1', value: [10, 20, 40, 60, 80] },
                    { name: '分类2', value: [20, 20, 50, 60, 90] }
                ]"
                :category="['断网', '断电', '非法操作', '钥匙开门', '非法人员']"
                :showShadow="true"
                :showTriangleBar="true"
                :bgBarWidth="null"
            ></s-double-bar>
        </el-col>
        <el-col :span="12" class="bar">
            <s-bar
                :data="[10, 20, 50, 60, 80]"
                :category="['断网', '断电', '非法操作', '钥匙开门', '非法人员']"
                :showRect="true"
                :disbledEmphasis="true"
                :disbledTrigger="true"
                :barWidth="24"
                :rectBarWidth="24"
                :theme="{ customPictorialBar: { color: 'yellow' } }"
            ></s-bar>
        </el-col>
        <el-col :span="12" class="bar">
            <s-double-bar
                :data="[
                    { name: '分类1', value: [10, 20, 40, 60, 80] },
                    { name: '分类2', value: [20, 20, 50, 60, 90] }
                ]"
                :category="['断网', '断电', '非法操作', '钥匙开门', '非法人员']"
                :isHeadUp="true"
                :showRect="true"
                :barWidth="24"
                :rectBarWidth="24"
            ></s-double-bar>
        </el-col>
        <el-col :span="12" class="bar">
            <s-biax-bar
                :category="['断网', '断电', '非法操作', '钥匙开门', '非法人员']"
                :data="[
                    { name: '分类1', value: [10, 20, 40, 60, 80], yAxisIndex: 0 },
                    { name: '分类2', value: [20, 20, 50, 60, 90], yAxisIndex: 1 }
                ]"
                :yAxicsName="['个', '台']"
                :barWidth="8"
                :barBorderRadius="[4, 4, 0, 0]"
            ></s-biax-bar>
        </el-col>
        <el-col :span="12" class="bar">
            <s-circular-bar-3D
                :data="[10, 20, 40, 60, 80]"
                :category="['断网', '断电', '非法操作', '钥匙开门', '非法人员']"
                :showBar3D="true"
                :showLabel="true"
                :showCircle3D="true"
            ></s-circular-bar-3D>
        </el-col>
    </el-row>
</template>

<script setup lang="ts"></script>
<style scoped>
.bar-host {
    width: 100%;
    height: 100%;
}
.bar {
    height: 300px;
}
</style>
