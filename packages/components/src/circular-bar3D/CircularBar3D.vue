<template>
    <div class="bar-chart-host" ref="echartsRef"></div>
</template>

<script lang="ts" setup>
import './style/index.scss';
import { numFormat } from '@ahsdata-ui/utils';

import { onMounted, computed } from 'vue';

import type { EChartsOption, PictorialBarSeriesOption, SeriesOption } from 'echarts';
import { useEchart } from '../common/hooks/useEchart';

defineOptions({ name: 's-circular-bar-3D' });

const { initEchart, echartsRef, themeJson } = useEchart();

type BarProps = {
    yAxisName?: string;
    showLabel?: boolean;
    data: number[];
    category: string[];
    barWidth?: number;
    showLabelStyle?: boolean;
    theme?: object;
    showYSplitLine?: boolean;
    showXAxisLine?: boolean;
    showYaxisLabel?: boolean;
    showXAxisLabel?: boolean;
    disbledTrigger?: boolean;
};

const barProps = withDefaults(defineProps<BarProps>(), {
    barWidth: 16,
    rectBarWidth: 16,
    showYSplitLine: false,
    showXSplitLine: false,
    showYaxisLabel: false,
    showYAxisLabel: false,
    showXAxisLabel: true,
    disbledTrigger: true
});

const theme = computed(() => {
    return Object.assign(themeJson, barProps.theme);
});

const setOption = () => {
    const maxData = barProps.data.map(() => 100),
        circleData = barProps.data.map((item) => ({
            name: '',
            value: 100,
            barValue: item,
            symbolPosition: 'end'
        }));
    const option = {
        tooltip: {
            trigger: !barProps.disbledTrigger ? 'axis' : null,
            formatter: '{b}: {c}',
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
            top: 20
        },
        xAxis: [
            {
                type: 'category',
                axisLabel: {
                    show: barProps.showXAxisLabel
                },
                axisLine: {
                    show: barProps.showXAxisLine
                },
                axisTick: {
                    show: false
                },
                data: barProps.category
            },
            {
                type: 'category',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                splitArea: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                data: barProps.category
            }
        ],
        yAxis: {
            name: barProps.yAxisName,
            type: 'value',
            axisLine: {
                show: barProps.showXAxisLine
            },
            axisLabel: {
                show: barProps.showYAxisLabel,
                formatter: (value: number) => {
                    return numFormat(value);
                }
            },
            splitLine: {
                show: barProps.showYSplitLine,
                lineStyle: {
                    type: 'dashed'
                }
            }
        },
        series: [
            {
                name: '内部柱子顶部',
                type: 'pictorialBar',
                tooltip: { show: false },
                symbolSize: [barProps.barWidth, 10],
                symbolOffset: [0, -5],
                symbolPosition: 'end',
                z: 15,
                color: theme.value?.circularBar3D?.color?.barTop,
                zlevel: 2,
                data: barProps.data
            },
            {
                name: '中间柱子1',
                type: 'bar',
                barGap: '60%',
                barWidth: barProps.barWidth,
                itemStyle: {
                    color: theme.value?.circularBar3D?.color?.innerBar,
                    borderColor: theme.value?.circularBar3D?.color?.innerBar,
                    borderWidth: 1,
                    borderType: 'solid'
                },
                label: {
                    show: false
                },
                zlevel: 2,
                data: barProps.data
            },
            {
                name: '背景柱子1',
                type: 'bar',
                tooltip: { show: false },
                xAxisIndex: 1,
                barGap: '60%',
                data: barProps.data.map(() => 100),
                zlevel: 1,
                barWidth: barProps.barWidth,
                itemStyle: {
                    color: theme.value?.circularBar3D?.color?.barBg
                }
            },
            {
                name: '底部圆1',
                type: 'pictorialBar',
                tooltip: { show: false },
                symbolSize: [barProps.barWidth, 10],
                symbolOffset: [0, 5],
                z: 12,
                color: theme.value?.circularBar3D?.color?.barBottom,
                data: maxData
            },
            // 头
            {
                name: '顶部圆1',
                type: 'pictorialBar',
                tooltip: { show: false },
                z: 20,
                zlevel: 3,
                symbolPosition: 'end',
                symbolSize: [barProps.barWidth, 10],
                symbolOffset: [0, -5],
                itemStyle: {
                    shadowColor: 'rgba(0, 0, 0, .3)',
                    shadowBlur: 5,
                    shadowOffsetY: 3,
                    shadowOffsetX: 0,
                    color: theme.value?.circularBar3D?.color?.bgBarTop
                },
                label: {
                    show: barProps.showLabel,
                    position: 'top',
                    backgroundColor: barProps.showLabelStyle ? 'rgba(216,240,255,0.10)' : 'none',
                    padding: [-1, -8, 0, -8],
                    formatter: (params: any) => {
                        return barProps.showLabelStyle
                            ? `{symbol|〔} ${numFormat(params.data.barValue as number)} {symbol|〕}`
                            : numFormat(params.data.barValue as number);
                    },
                    rich: {
                        symbol: {
                            color: '#6E7A83'
                        }
                    }
                },
                data: circleData
            } as PictorialBarSeriesOption
        ] as SeriesOption[]
    };

    return option as EChartsOption;
};

onMounted(() => {
    initEchart(setOption(), theme.value);
});
</script>
