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

import { cloneDeep } from 'lodash';

defineOptions({ name: 's-bar' });

const { initEchart, echartsRef, themeJson } = useEchart();

type BarProps = {
    showLabel?: boolean;
    showShadow?: boolean;
    showRect?: boolean;
    splitBar?: boolean;
    data: number[];
    category: string[];
    barWidth?: number;
    rectBarWidth?: number;
    showLabelStyle?: boolean;
    barBorderRadius?: number[];
    showSymbol?: boolean;
    theme?: object;
    disbledEmphasis?: boolean;
    disbledTrigger?: boolean;
    bgBarWidth?: number;
};

const theme = computed(() => {
    return Object.assign(cloneDeep(themeJson), barProps.theme);
});

const barProps = withDefaults(defineProps<BarProps>(), {
    barWidth: 16,
    rectBarWidth: 16,
    bgBarWidth: 48,
    barBorderRadius: () => [0, 0, 0, 0]
});

const setOption = () => {
    console.log(theme.value?.customBar?.splitBarColor);
    const option = {
        color: theme.value?.customBar?.color,
        tooltip: {
            trigger: !barProps.showShadow && !barProps.disbledTrigger ? 'axis' : null,
            formatter: '{b} :{c}',
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
                show: false,
                data: barProps.category
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
        series: [] as SeriesOption[]
    };
    if (barProps.splitBar) {
        option.series.push(
            {
                name: 'bar',
                type: 'bar',
                barWidth: barProps.barWidth,
                data: barProps.data,
                label: {
                    show: barProps.showLabel,
                    position: 'top',
                    backgroundColor: barProps.showLabelStyle ? 'rgba(216,240,255,0.10)' : 'none',
                    padding: [0, -10, -1, -10],
                    borderRadius: [5],
                    formatter: (params) => {
                        return barProps.showLabelStyle
                            ? `{symbol|〔} ${numFormat(params.value as number)} {symbol|〕}`
                            : numFormat(params.value as number);
                    },
                    rich: {
                        symbol: {
                            color: '#6E7A83',
                            fontSize: 16
                        }
                    }
                },
                emphasis: {
                    itemStyle: {
                        color: theme.value?.customBar?.emphasis?.color
                    }
                }
            } as BarSeriesOption,
            {
                type: 'pictorialBar',
                symbol: 'rect',
                itemStyle: {
                    color: theme.value?.customBar?.splitBarColor
                },
                symbolRepeat: true,
                symbolPosition: 'start',
                symbolClip: true,
                symbolSize: [barProps.barWidth, 3],
                symbolMargin: 3,
                z: 4,
                data: barProps.data
            },
            {
                type: 'pictorialBar',
                symbol: 'rect',
                itemStyle: {
                    color: 'rgba(255,255,255,0.06)'
                },
                symbolRepeat: true,
                symbolPosition: 'start',
                symbolClip: true,
                symbolSize: [barProps.barWidth, 3],
                symbolMargin: 3,
                z: 5,
                data: barProps.data
            }
        );
    } else {
        option.series.push({
            type: 'bar',
            xAxisIndex: 0,
            barWidth: barProps.barWidth, //去掉这个则会显示柱状阴影
            emphasis: {
                disabled: barProps.showShadow || barProps.disbledEmphasis,
                label: {
                    show: true
                },
                itemStyle: {
                    color: theme.value?.customBar?.emphasis?.color
                }
            },
            itemStyle: {
                borderRadius: barProps.barBorderRadius
            },
            label: {
                show: barProps.showLabel,
                position: 'top',
                backgroundColor: barProps.showLabelStyle ? 'rgba(216,240,255,0.10)' : 'none',
                padding: [0, -10, -1, -10],
                borderRadius: [5],
                formatter: (params) => {
                    return barProps.showLabelStyle
                        ? `{symbol|〔} ${numFormat(params.value as number)} {symbol|〕}`
                        : numFormat(params.value as number);
                },
                rich: {
                    symbol: {
                        color: '#6E7A83',
                        fontSize: 16
                    }
                }
            },
            labelLayout: {
                dy: barProps.showSymbol ? -barProps.barWidth : 0
            },
            data: barProps.data
        } as BarSeriesOption);
    }
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
            barWidth: barProps.bgBarWidth,
            tooltip: {
                show: false
            }
        });
    }

    if (barProps.showRect) {
        option.series.push({
            type: 'pictorialBar',
            symbol: 'rect',
            zlevel: 3,
            symbolSize: [barProps.rectBarWidth, 3],
            symbolOffset: [0, 0],
            symbolPosition: 'end',
            emphasis: {
                disabled: barProps.showShadow || barProps.disbledEmphasis,
                itemStyle: {
                    color: theme.value?.customPictorialBar?.emphasis?.color
                }
            },
            itemStyle: {
                color: theme.value?.customPictorialBar?.color
            },

            data: barProps.data
        } as PictorialBarSeriesOption);
    }

    if (barProps.showSymbol) {
        option.series.push(
            {
                name: '圆点',
                type: 'scatter',
                symbolOffset: [0, 0],
                symbolSize: barProps.barWidth,
                itemStyle: {
                    opacity: barProps.showSymbol && barProps.showLabel ? 1 : 0,
                    borderWidth: 0,
                    color: '#fff'
                },
                data: barProps.data,
                zlevel: 4,
                emphasis: {
                    disabled: barProps.disbledEmphasis,
                    itemStyle: {
                        opacity: 1
                    }
                }
            },
            {
                name: '圆环',
                type: 'scatter',
                symbolOffset: [0, 0],
                symbolSize: barProps.barWidth * 2,
                itemStyle: {
                    opacity: barProps.showSymbol && barProps.showLabel ? 1 : 0,
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.3)',
                    color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [
                            {
                                offset: 0,
                                color: theme.value?.customBar.color.colorStops[0].color
                            },
                            {
                                offset: 1,
                                color: theme.value?.customBar.color.colorStops[1].color
                            }
                        ]
                    },

                    shadowBlur: 8,
                    shadowColor: theme.value?.customBar.color.colorStops[1].color
                },
                data: barProps.data,
                emphasis: {
                    disabled: barProps.disbledEmphasis,
                    itemStyle: {
                        opacity: 1,
                        color: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.5,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: theme.value?.customBar.emphasis.color.colorStops[0].color
                                },
                                {
                                    offset: 1,
                                    color: theme.value?.customBar.emphasis.color.colorStops[1].color
                                }
                            ]
                        },
                        shadowColor: theme.value?.customBar.emphasis.color.colorStops[1].color
                    }
                }
            }
        );
    }

    return option as EChartsOption;
};

onMounted(() => {
    initEchart(setOption());
});
</script>
