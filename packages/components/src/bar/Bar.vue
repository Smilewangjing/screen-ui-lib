<template>
    <v-chart :theme="themeJson" class="bar-chart-host" :autoresize="true" :option="option" />
</template>

<script lang="ts" setup>
import './style/index.scss';
import VChart from 'vue-echarts';
import 'echarts';
import { numFormat, parseHexColor } from '@ahsdata-ui/utils';

import { onMounted, ref } from 'vue';

import themeJson from '../common/chartTheme.json';
import type { BarSeriesOption, PictorialBarSeriesOption } from 'echarts';

defineOptions({ name: 's-bar' });

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
    showBar3D?: boolean;
};

const barProps = withDefaults(defineProps<BarProps>(), {
    barWidth: 16,
    rectBarWidth: 16,
    barBorderRadius: () => [0, 0, 0, 0]
});

const option = ref({
    color: themeJson.customBar.color,
    tooltip: {
        trigger: !barProps.showShadow ? 'axis' : null,
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
    series: []
});

onMounted(() => {
    const colorObj = parseHexColor('#1978E5');
    console.log(colorObj);
    const series = [];
    if (barProps.splitBar) {
        series.push({
            // 分隔
            type: 'pictorialBar',
            symbolRepeat: 'fixed',
            symbolMargin: 4,
            symbol: 'rect',
            symbolClip: true,
            symbolSize: [barProps.barWidth, 8],
            symbolPosition: 'start',
            symbolOffset: [0, -1],
            data: barProps.data,
            zlevel: 8
        } as PictorialBarSeriesOption);
    } else {
        series.push({
            type: 'bar',
            xAxisIndex: 0,
            barWidth: barProps.barWidth, //去掉这个则会显示柱状阴影
            emphasis: {
                disabled: barProps.showShadow,
                label: {
                    show: true,
                    positsion: 'top',
                    padding: [-1, -8, 0, -8],
                    formatter: (params) => {
                        return barProps.showLabelStyle
                            ? `{symbol|〔} ${numFormat(params.value as number)} {symbol|〕}`
                            : numFormat(params.value as number);
                    }
                }
            },
            itemStyle: {
                borderRadius: barProps.barBorderRadius
                // color: {
                //     type: 'linear',
                //     x: 0,
                //     x2: 1,
                //     y: 0,
                //     y2: 0,
                //     colorStops: [
                //         {
                //             offset: 0,
                //             color: '#73fcff' // 最左边
                //         },
                //         {
                //             offset: 0.5,
                //             color: '#86eef1' // 左边的右边 颜色
                //         },
                //         {
                //             offset: 0.5,
                //             color: '#5ad6d9' // 右边的左边 颜色
                //         },
                //         {
                //             offset: 1,
                //             color: '#3dc8ca'
                //         }
                //     ]
                // }
            },
            label: {
                show: barProps.showLabel,
                position: 'top',
                backgroundColor: barProps.showLabelStyle ? 'red' : 'none',
                padding: [-1, -8, 0, -8],
                formatter: (params) => {
                    return barProps.showLabelStyle
                        ? `{symbol|〔} ${numFormat(params.value as number)} {symbol|〕}`
                        : numFormat(params.value as number);
                },
                rich: {
                    symbol: {
                        color: '#ccc'
                    }
                }
            },
            data: barProps.data
        } as BarSeriesOption);
    }
    if (barProps.showShadow) {
        series.push({
            type: 'bar',
            barCategoryGap: '20%',
            xAxisIndex: 1,
            data: barProps.category.map(() => 0),
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(255,255,255,0.06)'
            },
            barWidth: 48,
            emphasis: {
                disabled: true
            },
            tooltip: {
                show: false
            },
            z: 1
        });
    }

    if (barProps.showRect) {
        series.push({
            type: 'pictorialBar',
            symbol: 'rect',
            zlevel: 3,
            symbolSize: [barProps.rectBarWidth, 3],
            symbolOffset: [0, 0],
            symbolPosition: 'end',
            emphasis: {
                disabled: barProps.showShadow
            },
            itemStyle: {
                color: themeJson.customPictorialBar.color
            },

            data: barProps.data
        } as PictorialBarSeriesOption);
    }
    if (barProps.showLabel && barProps.splitBar) {
        series.push({
            type: 'bar',
            barWidth: barProps.barWidth,
            label: {
                show: true,
                position: 'top',
                formatter: function (params) {
                    return numFormat(params.value as number);
                }
            },
            itemStyle: {
                color: 'transparent'
            },
            data: barProps.data,
            emphasis: {
                disabled: true
            }
        } as BarSeriesOption);
    }

    if (barProps.showBar3D) {
        series.push({
            z: 10,
            xAxisIndex: 0,
            type: 'pictorialBar',
            symbolPosition: 'end',
            data: barProps.data,
            symbol: 'diamond',
            symbolOffset: [0, '-50%'],
            symbolSize: [barProps.barWidth, barProps.barWidth * 0.5],
            itemStyle: {
                borderWidth: 0,
                color: '#73fcff'
            }
        } as PictorialBarSeriesOption);
    }

    option.value.series = series;
});
</script>
