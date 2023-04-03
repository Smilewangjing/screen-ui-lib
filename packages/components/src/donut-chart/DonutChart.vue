<template>
    <div class="donut-chart-host" ref="echartsRef"></div>
</template>

<script lang="ts" setup>
import './style/index.scss';

import { numFormat } from '@ahsdata-ui/utils';

import { onMounted, computed } from 'vue';

import themeJson from '../common/chartTheme.json';
import type { EChartsOption, GaugeSeriesOption, PieSeriesOption, SeriesOption } from 'echarts';
import { useEchart } from '../common/hooks/useEchart';

defineOptions({ name: 's-donut-bar' });

type DonutChartProps = {
    data: {
        name: string;
        value: number[];
        topValue: number[];
        center: string[];
    }[];
    rowNum: number;
    borderFlag?: boolean;
    theme?: object;
};
const donutChartProps = withDefaults(defineProps<DonutChartProps>(), {
    rowNum: 3
});

const theme = computed(() => {
    return Object.assign(themeJson, donutChartProps.theme);
});

const getSeries = () => {
    const centerY = 70; // 原点y轴的单位距离
    const centerYOffset = 5; // 原点偏移
    const centerX = 100 / donutChartProps.rowNum; // 原点x轴的单位距离
    const series = donutChartProps.data
        .map((item, index) => {
            const center = [
                centerX * (index % donutChartProps.rowNum) + centerX / 2 + '%',
                donutChartProps.data?.length <= donutChartProps.rowNum
                    ? '50%'
                    : centerY * Math.floor(index / donutChartProps.rowNum) +
                      centerY / 2 -
                      centerYOffset +
                      '%'
            ];
            const series: SeriesOption[] = [
                {
                    type: 'pie',
                    clockwise: false,
                    radius: ['40%', '50%'],
                    itemStyle: {
                        shadowBlur: 0,
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    },
                    center: center,
                    data: [
                        {
                            name: item.name,
                            value: item.value,
                            label: {
                                formatter: function (params: any) {
                                    return `{value|${params.value}}\n{name|${params.data.name}}`;
                                },
                                rich: {
                                    value: {
                                        fontSize: 14
                                    },
                                    name: {
                                        fontSize: 14,
                                        padding: [5, 0, 0, 0]
                                    }
                                },
                                position: 'center',
                                show: true
                            }
                        },
                        {
                            value: 100 - Number(item.value),
                            name: 'invisible',
                            label: {
                                show: false
                            },
                            emphasis: {
                                disabled: true
                            },
                            itemStyle: {
                                color: donutChartProps.borderFlag
                                    ? 'transparent'
                                    : theme.value?.DonutChart?.border?.color
                            }
                        }
                    ]
                } as PieSeriesOption
            ];
            if (donutChartProps.borderFlag) {
                series.push({
                    name: '整数刻度',
                    type: 'gauge',
                    radius: '55%',
                    center: center,
                    startAngle: 90,
                    endAngle: -269.9,
                    splitNumber: 4,
                    min: 0,
                    max: 100,
                    hoverAnimation: false,
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        length: -10,
                        distance: 0,
                        lineStyle: {
                            width: 1,
                            color: theme.value?.DonutChart?.border?.color
                        }
                    },
                    axisLabel: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            width: 1,
                            color: [[1, theme.value?.DonutChart?.border?.color]]
                        }
                    },
                    detail: {
                        show: true
                    }
                } as GaugeSeriesOption);
            }
            return series;
        })
        .flat();
    return series as SeriesOption[];
};

const getOption = () => {
    const option = {
        grid: {
            containLabel: true,
            left: 20,
            right: 20,
            bottom: 20,
            top: 20
        },
        series: getSeries()
    } as EChartsOption;
    return option;
};

const { initEchart, echartsRef } = useEchart();

onMounted(() => {
    initEchart(getOption(), theme.value);
});
</script>
