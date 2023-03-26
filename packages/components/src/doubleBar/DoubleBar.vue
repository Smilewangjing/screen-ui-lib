<template>
    <div class="double-chart-host" ref="echartsRef"></div>
</template>

<script lang="ts" setup>
import './style/index.scss';

import { numFormat } from '@ahsdata-ui/utils';

import { onMounted, computed } from 'vue';

import themeJson from '../common/chartTheme.json';
import type {
    BarSeriesOption,
    EChartsOption,
    PictorialBarSeriesOption,
    SeriesOption
} from 'echarts';
import { useEchart } from '../common/hooks/useEchart';

defineOptions({ name: 's-double-bar' });

type BarProps = {
    showShadow?: boolean;
    showRect?: boolean;
    showTriangleBar?: boolean;
    category: string[];
    bgBarWidth?: number;
    barWidth?: number;
    rectBarWidth?: number;
    data: {
        name: string;
        value: number[];
        topValue: number[];
    }[];
    isHeadUp?: boolean;
    theme?: object;
};
const barProps = withDefaults(defineProps<BarProps>(), {
    barWidth: 10,
    rectBarWidth: 10,
    bgBarWidth: 48,
    barBorderRadius: () => [0, 0, 0, 0]
});

const theme = computed(() => {
    return Object.assign(themeJson, barProps.theme);
});

const getSeries = () => {
    const data = barProps.data;
    if (barProps.isHeadUp) {
        data.reduce((prev, next) => {
            next['topValue'] = next.value.map((item, index) => {
                return item + (prev?.[index] || 0);
            });
            return next['topValue'];
        }, []);
    }

    const startOffset = ((barProps.data || []).length - 1) * -6;
    const series = (barProps.data || [])
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
                          stack: barProps.isHeadUp ? '总量' : null,
                          name: item.name,
                          barWidth: barProps.barWidth,
                          xAxisIndex: 0,
                          data: item.value
                      } as BarSeriesOption)
            ];
            if (barProps.showRect && !barProps.showTriangleBar) {
                series.push({
                    data: barProps.isHeadUp ? item.topValue : item.value,
                    type: 'pictorialBar',
                    symbolPosition: 'end',
                    xAxisIndex: 0,
                    symbol: 'rect',
                    symbolOffset: [barProps.isHeadUp ? 0 : startOffset + 12 * index, -1],
                    symbolSize: [barProps.barWidth, 2],
                    zlevel: 8,
                    itemStyle: {
                        color: theme.value?.customDoubleBar?.splitColor?.[index]
                    },
                    tooltip: {
                        show: false
                    }
                } as PictorialBarSeriesOption);
            }
            return series;
        })
        .flat();
    if (barProps.showShadow) {
        series.push({
            // 背景
            type: 'bar',
            barCategoryGap: '20%',
            xAxisIndex: 1,
            barWidth: barProps.bgBarWidth,
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
    return series;
};

const getOption = () => {
    const option = {
        color: theme.value?.customDoubleBar?.color,
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
            borderWidth: 0
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
        series: getSeries()
    } as EChartsOption;
    return option;
};

const { initEchart, echartsRef } = useEchart();

onMounted(() => {
    initEchart(getOption());
});
</script>
