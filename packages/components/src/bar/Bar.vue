<template>
    <v-chart class="chart" :option="option" />
</template>

<script lang="ts" setup>
import './style/index.scss';
import VChart, { THEME_KEY } from 'vue-echarts';
import 'echarts';

import { ref, provide } from 'vue';

defineOptions({ name: 's-bar' });
// type ButtonProps = {
//     type?: string;
// };
// const buttonProps = defineProps<ButtonProps>();

provide(THEME_KEY, 'dark');

const option = ref({
    backgroundColor: '#031223',
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: '{b} :{c}'
    },
    xAxis: [
        {
            type: 'category',
            data: ['断网', '断电', '非法操作', '钥匙开门', '非法人员'],

            axisTick: {
                alignWithLabel: true,
                show: false
            },
            axisLine: {
                show: true
            },
            axisLabel: {
                interval: 0, // 解决x轴名称过长问题
                textStyle: {
                    color: '#c8d8e3'
                }
            }
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
            }
        }
    ],
    series: [
        {
            name: '',
            type: 'pictorialBar',
            symbol: 'rect',
            symbolSize: [17, 3],
            symbolOffset: [0, 0],
            zlevel: 3,
            tooltip: {
                show: false
            },
            itemStyle: {
                color: '#1978E5'
            },
            data: [
                {
                    value: 10,
                    symbolPosition: 'end'
                },
                {
                    value: 20,
                    symbolPosition: 'end'
                },
                {
                    value: 40,
                    symbolPosition: 'end'
                },
                {
                    value: 60,
                    symbolPosition: 'end'
                },
                {
                    value: 80,
                    symbolPosition: 'end'
                }
            ]
        },
        {
            name: '动环资产',
            type: 'bar',
            zlevel: 2,
            barWidth: 18, //去掉这个则会显示柱状阴影
            emphasis: {
                label: {
                    show: true,
                    position: 'top',
                    color: '#D8F0FF'
                },
                itemStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(0,213,255,0.1)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(0,213,255,0.6)'
                            }
                        ]
                    }
                }
            },
            itemStyle: {
                color: {
                    type: 'linear',
                    // x=0,y=1,柱子的颜色在垂直方向渐变
                    x: 0,
                    y: 1,
                    colorStops: [
                        {
                            offset: 0,
                            color: 'rgba(25,120,229,0.1)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(25,120,229,0.6)'
                        }
                    ]
                }
            },
            data: [10, 20, 40, 60, 80]
        }
    ]
});
</script>
