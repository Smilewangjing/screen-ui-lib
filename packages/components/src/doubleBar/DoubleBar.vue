<template>
    <v-chart
        :theme="themeJson"
        ref="echartsRef"
        class="double-chart-host"
        :option="option"
        :update-options="option"
    />
</template>

<script lang="ts" setup>
import './style/index.scss';
import VChart from 'vue-echarts';
import 'echarts';

import { numFormat } from '@ahsdata-ui/utils';

import { onMounted, ref } from 'vue';

import themeJson from '../common/chartTheme.json';
import type { BarSeriesOption, PictorialBarSeriesOption, SeriesOption } from 'echarts';

defineOptions({ name: 's-double-bar' });

type BarProps = {
    showLabel?: boolean;
    showShadow?: boolean;
    showRect?: boolean;
    showTriangleBar?: boolean;
    category: string[];
    data: {
        name: string;
        value: string[];
    }[];
};
const barProps = defineProps<BarProps>();

const echartsRef = ref();

const option = ref({
    color: themeJson.customBar.color,
    tooltip: {
        //提示框组件
        trigger: 'axis', //触发类型 柱状图
        axisPointer: {
            type: barProps.showShadow ? 'none' : 'shadow',
            shadowStyle: {
                color: 'rgba(103,166,233,0.12)'
            }
        },
        backgroundColor: 'rgba(104,155,254,0.04)',
        extraCssText:
            'box-shadow:0 4px 40px 0 rgba(15,19,26,0.20);backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);border-radius:3px;',
        borderWidth: 0,
        textStyle: {
            color: '#D0DEEE'
        }
    },
    grid: {
        containLabel: true,
        left: 20,
        right: 20,
        bottom: 20,
        top: 20
    },
    legend: {
        type: 'scroll',
        right: 0,
        itemWidth: 6,
        itemHeight: 6,
        icon: 'circle',
        textStyle: {
            // 图例文字的样式
            color: '#D8F0FF',
            fontSize: 14,
            padding: [2, 0, 0, 2],
            fontWeight: 100
        }
    },
    xAxis: [
        {
            type: 'category',
            data: barProps.category,
            axisTick: {
                alignWithLabel: true,
                show: false
            },
            axisLine: {
                show: true
            },
            axisLabel: {
                interval: 0 // 解决x轴名称过长问题
            }
        },
        {
            type: 'category',
            data: barProps.category,
            show: false
        }
    ],
    yAxis: [
        {
            axisLine: {
                show: false
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed'
                }
            },
            axisLabel: {
                formatter: (value: number) => {
                    return numFormat(value);
                }
            }
        }
    ],
    series: []
});

const getSeries = () => {
    const startOffset = ((barProps.data || []).length - 1) * -6;
    return (barProps.data || [])
        .map((item, index) => {
            const series: SeriesOption[] = [
                barProps.showTriangleBar
                    ? ({
                          name: item.name,
                          data: item.value,
                          type: 'pictorialBar',
                          symbol: 'triangle',
                          barGap: '-50%'
                      } as PictorialBarSeriesOption)
                    : ({
                          type: 'bar',
                          name: item.name,
                          barWidth: 10,
                          xAxisIndex: 0,
                          data: item.value,
                          emphasis: {
                              disabled: true
                          }
                      } as BarSeriesOption)
            ];
            if (barProps.showRect) {
                series.push({
                    data: item.value,
                    type: 'pictorialBar',
                    symbolPosition: 'end',
                    xAxisIndex: 0,
                    symbol: 'rect',
                    symbolOffset: [startOffset + 12 * index, -1],
                    symbolSize: [10, 2],
                    zlevel: 8,
                    itemStyle: {
                        color: '#fff'
                    },
                    tooltip: {
                        show: false
                    }
                } as PictorialBarSeriesOption);
            }
            return series;
        })
        .flat();
};

onMounted(() => {
    const series = getSeries();
    if (barProps.showShadow) {
        series.push({
            // 背景
            type: 'bar',
            barCategoryGap: '20%',
            xAxisIndex: 1,
            data: barProps.category.map(() => '0'),
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(255,255,255,0.06)'
            },
            tooltip: {
                show: false
            }
        } as BarSeriesOption);
    }
    option.value.series = series;
});
</script>
