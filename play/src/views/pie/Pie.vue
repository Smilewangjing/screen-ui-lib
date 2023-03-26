<template>
    <el-row :gutter="20">
        <el-col :span="8" class="pie">
            <s-pie
                :data="[
                    { name: '断网', value: 10 },
                    { name: '断电', value: 20 },
                    { name: '非法操作', value: 30 },
                    { name: '钥匙开门', value: 60 },
                    { name: '非法人员', value: 80 }
                ]"
                :titleFormatter="() => '{a|类型分布}\n\n{b|TOP5}'"
                :titleRich="{
                    a: { fontSize: 13, color: '#727D89' },
                    b: { fontSize: 15, color: '#fff' }
                }"
            ></s-pie>
        </el-col>
        <el-col :span="8" class="pie">
            <s-pie
                :data="[
                    { name: '断网', value: 10 },
                    { name: '断电', value: 20 },
                    { name: '非法操作', value: 30 },
                    { name: '钥匙开门', value: 60 },
                    { name: '非法人员', value: 80 }
                ]"
                :labelFormatter="() => '{a|类型分布}\n\n{b|3333}'"
                :labelRich="{
                    a: { fontSize: 12, color: '#727D89' },
                    b: { fontSize: 13, color: '#fff' }
                }"
                :valueEnable="true"
                :nameWidth="40"
            ></s-pie>
        </el-col>
        <el-col :span="24" class="pie">
            <s-donut-bar
                :data="[
                    { name: '断网', value: 10 },
                    { name: '断电', value: 20 },
                    { name: '非法操作', value: 30 }
                ]"
                :rowNum="3"
            ></s-donut-bar>
        </el-col>
    </el-row>
</template>

<script setup lang="ts"></script>
<style scoped>
.pie-host {
    width: 100%;
    height: 100%;
}
.pie {
    height: 300px;
}
</style>
