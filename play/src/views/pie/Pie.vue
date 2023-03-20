<template>
    <div class="pie-host">
        <div class="pie">
            <s-pie
                :data="[
                    { name: '断网', value: 10 },
                    { name: '断电', value: 20 },
                    { name: '非法操作', value: 30 },
                    { name: '钥匙开门', value: 60 },
                    { name: '非法人员', value: 80 }
                ]"
            ></s-pie>
        </div>
    </div>
</template>

<script setup lang="ts"></script>
<style scoped>
.pie-host {
    width: 100%;
    height: 100%;
}
.pie {
    display: inline-block;
    width: 25%;
    height: 300px;
}
</style>
