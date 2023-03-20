<template>
    <div class="bar-chart-host" ref="echartsRef"></div>
</template>

<script lang="ts" setup>
import './style/index.scss';
import { numFormat } from '@ahsdata-ui/utils';

import { onMounted, computed } from 'vue';

import type {
    BarSeriesOption,
    EChartsOption,
    PictorialBarSeriesOption,
    SeriesOption
} from 'echarts';
import { useEchart } from '../common/hooks/useEchart';

defineOptions({ name: 's-prism-bar-3D' });

const { initEchart, echartsRef, themeJson } = useEchart();

type BarProps = {
    yAxisName?: string;
    showLabel?: boolean;
    showShadow?: boolean;
    data: {
        name: string;
        value: number[];
        topValue: number[];
    }[];
    category: string[];
    barWidth?: number;
    showLabelStyle?: boolean;
    theme?: object;
    showSplitLine?: boolean;
    showXAxisLine?: boolean;
    showYAxisLine?: boolean;
    showYAxisLabel?: boolean;
    showXAxisLabel?: boolean;
};

const barProps = withDefaults(defineProps<BarProps>(), {
    barWidth: 16,
    rectBarWidth: 16,
    showSplitLine: true,
    showYAxisLabel: true,
    showAxisLine: true,
    showXAxisLabel: true,
    barBorderRadius: () => [0, 0, 0, 0]
});

const theme = computed(() => {
    return Object.assign(themeJson, barProps.theme);
});

const setOption = () => {
    const option = {
        tooltip: {
            trigger: 'axis',
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
                    show: barProps.showAxisLine
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
                show: barProps.showYAxisLine
            },
            axisLabel: {
                show: barProps.showYAxisLabel,
                formatter: (value: number) => {
                    return numFormat(value);
                }
            },
            splitLine: {
                show: barProps.showSplitLine,
                lineStyle: {
                    type: 'dashed'
                }
            }
        },
        series: [
            {
                z: 1,
                type: 'bar',
                barWidth: barProps.barWidth / 2,
                barGap: '0%',
                data: barProps.data,
                itemStyle: {
                    color: theme.value?.prismBar3D?.color?.left
                }
            } as BarSeriesOption,
            {
                z: 2,
                type: 'bar',
                barWidth: barProps.barWidth / 2,
                barGap: '0%',
                data: barProps.data,
                itemStyle: {
                    color: theme.value?.prismBar3D?.color?.right
                }
            } as BarSeriesOption,
            {
                z: 3,
                type: 'pictorialBar',
                symbolPosition: 'end',
                data: barProps.data,
                symbol: 'diamond',
                symbolOffset: [0, '-50%'],
                symbolSize: [barProps.barWidth, barProps.barWidth * 0.5],
                itemStyle: {
                    color: theme.value?.prismBar3D?.color?.top
                },
                label: {
                    show: barProps.showLabel,
                    position: 'top',
                    backgroundColor: barProps.showLabelStyle ? 'rgba(216,240,255,0.10)' : 'none',
                    padding: [-1, -8, 0, -8],
                    formatter: (params) => {
                        return barProps.showLabelStyle
                            ? `{symbol|〔} ${numFormat(params.value as number)} {symbol|〕}`
                            : numFormat(params.value as number);
                    },
                    rich: {
                        symbol: {
                            color: '#6E7A83'
                        }
                    }
                }
            } as PictorialBarSeriesOption
        ] as SeriesOption[]
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
