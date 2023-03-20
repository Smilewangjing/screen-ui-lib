<template>
    <div class="biax-bar-host" ref="echartsRef"></div>
</template>

<script lang="ts" setup>
import './style/index.scss';
import { numFormat } from '@ahsdata-ui/utils';

import { onMounted, computed } from 'vue';

import type { BarSeriesOption, EChartsOption } from 'echarts';
import { useEchart } from '../common/hooks/useEchart';

defineOptions({ name: 's-biax-bar' });

const { initEchart, echartsRef, themeJson } = useEchart();

type BarProps = {
    category: string[];
    showShadow?: boolean;
    barWidth?: number;
    theme?: object;
    yAxicsName: string[];
    barBorderRadius?: number[];
    data: {
        name: string;
        value: number[];
        topValue?: number[];
    }[];
};

const barProps = withDefaults(defineProps<BarProps>(), {
    barWidth: 16,
    rectBarWidth: 16,
    barBorderRadius: () => [0, 0, 0, 0]
});

const theme = computed(() => {
    return Object.assign(themeJson, barProps.theme);
});

const setOption = () => {
    const option = {
        color: theme.value?.customDoubleBar?.color,
        tooltip: {
            trigger: 'axis',
            confine: true,
            axisPointer: {
                type: 'shadow',
                shadowStyle: {
                    color: 'rgba(103,166,233,0.12)'
                }
            },
            backgroundColor: 'rgba(104,155,254,0.04)',
            extraCssText:
                'box-shadow:0 4px 40px 0 rgba(15,19,26,0.20);backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);border-radius:3px;',
            borderWidth: 0
        },
        grid: {
            containLabel: true,
            left: 20,
            right: 20,
            bottom: 20,
            top: 40
        },
        legend: {
            type: 'scroll',
            top: 0,
            right: 0
            // data: barProps.data.map((item, index) => {
            //     return {
            //         name: item.name,
            //         itemStyle: {
            //             color: theme.value.color[index]
            //         }
            //     };
            // })
        },
        xAxis: [
            {
                type: 'category',
                axisLabel: {
                    show: true
                },
                axisLine: {
                    show: true
                },
                data: barProps.category,
                boundaryGap: true,
                axisTick: {
                    inside: true,
                    length: echartsRef.value.clientHeight - 80,
                    alignWithLabel: true,
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            }
        ],
        yAxis: barProps.yAxicsName.map((item, index) => {
            return {
                min: 0,
                max: Math.ceil(Math.max.apply(null, barProps.data[index].value) / 5) * 5,
                interval: Math.ceil(Math.max.apply(null, barProps.data[index].value) / 5),
                // name: item,
                type: 'value',
                axisLine: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    formatter: (value: number) => {
                        return numFormat(value);
                    }
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            };
        }),
        series: barProps.data.map((item, index) => {
            return {
                yAxisIndex: index,
                name: item.name,
                z: 1,
                type: 'bar',
                barWidth: barProps.barWidth,
                barGap: 2,
                data: item.value,
                itemStyle: {
                    borderRadius: barProps.barBorderRadius
                }
            } as BarSeriesOption;
        })
    };
    if (barProps.showShadow) {
        option.series.push({
            type: 'bar',
            barCategoryGap: '20%',
            xAxisIndex: 1,
            data: barProps.category.map(() => 0),
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(255,255,255,0.06)'
            },
            barWidth: 48,
            tooltip: {
                show: false
            },
            z: 1
        });
    }

    return option as EChartsOption;
};

onMounted(() => {
    initEchart(setOption());
});
</script>
