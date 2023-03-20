<template>
    <div class="pie-chart-host" ref="echartsRef"></div>
</template>

<script lang="ts" setup>
import './style/index.scss';
import { numFormat } from '@ahsdata-ui/utils';

import { onMounted, computed } from 'vue';

import type { EChartsOption } from 'echarts';
import { useEchart } from '../common/hooks/useEchart';

defineOptions({ name: 's-pie' });

const { initEchart, echartsRef, themeJson } = useEchart();

type BarProps = {
    data: { name: string; value: string }[];
    theme?: object;
};

const theme = computed(() => {
    return Object.assign(themeJson, barProps.theme);
});

const barProps = withDefaults(defineProps<BarProps>(), {});

const setOption = () => {
    const option = {
        tooltip: {
            show: true
        },
        legend: {
            orient: 'vertical',
            top: 'center',
            right: 0,
            itemGap: 15,
            itemWidth: 8,
            itemHeight: 8
        },
        color: theme.value.color,
        series: [
            {
                type: 'pie',
                radius: ['60%', '67%'],
                center: ['40%', '50%'],
                clockwise: true,
                avoidLabelOverlap: false,
                label: {
                    show: true,
                    color: '#fff',
                    position: 'center',
                    formatter: () => '类型分布\n\nTOP5'
                },
                data: barProps.data
            },
            {
                type: 'pie',
                radius: ['47%', '52%'],
                center: ['40%', '50%'],
                clockwise: true,
                avoidLabelOverlap: false,
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                },
                itemStyle: {
                    opacity: 0.1
                },

                data: barProps.data
            }
        ]
    };

    return option as EChartsOption;
};

onMounted(() => {
    initEchart(setOption());
});
</script>
