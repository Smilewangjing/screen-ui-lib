<template>
    <div class="pie-chart-host" ref="echartsRef"></div>
</template>

<script lang="ts" setup>
import './style/index.scss';
import { numFormat } from '@ahsdata-ui/utils';

import { onMounted, computed } from 'vue';

import type {
    EChartsOption,
    GraphicComponentOption,
    LabelFormatterCallback,
    PieSeriesOption
} from 'echarts';
import { useEchart } from '../common/hooks/useEchart';
import * as echarts from 'echarts';

defineOptions({ name: 's-pie' });

const { initEchart, covertData, echartsRef, themeJson } = useEchart();

type PieProps = {
    data: { name: string; value: number }[];
    theme?: object;
    center?: string[];
    radius?: string[];
    labelFormatter?: LabelFormatterCallback;
    labelRich?: object;
    titleFormatter?: LabelFormatterCallback;
    titleRich?: object;
    nameWidth?: number;
    percentEnable?: boolean;
    valueEnable?: boolean;
    textSpliceNum?: number;
    valueWidth?: number;
    graphicOption?: GraphicComponentOption;
    precentColorFollow?: boolean;
};

const theme = computed(() => {
    return Object.assign(themeJson, pieProps.theme);
});

const pieProps = withDefaults(defineProps<PieProps>(), {
    center: () => ['40%', '50%'],
    radius: () => ['60%', '67%'],
    nameWidth: 60,
    valueWidth: 60,
    textSpliceNum: 8
});

const setOption = () => {
    const data = covertData(pieProps.data);
    const option = {
        tooltip: {
            show: true
        },
        graphic: pieProps.graphicOption,
        legend: {
            type: 'scroll',
            orient: 'vertical',
            top: 'center',
            right: 0,
            itemGap: 15,
            itemWidth: 8,
            itemHeight: 8,
            textStyle: {
                rich: {
                    name: {
                        width: pieProps.nameWidth,
                        padding: [0, 0, 0, 0],
                        color: '#fff'
                    },
                    value: {
                        width: pieProps.valueWidth,
                        padding: [0, 5, 0, 5],
                        color: '#fff',
                        align: 'center'
                    },
                    percent: {
                        padding: [0, 5, 0, 0],
                        color: pieProps.precentColorFollow ? 'inherit' : '#fff'
                    }
                }
            },
            formatter: (name: string) => {
                const targetItem = data?.find((pitem) => pitem.name === name);
                return `{name|${
                    name.length > pieProps.textSpliceNum
                        ? `${name.slice(0, pieProps.textSpliceNum)}...`
                        : name
                }}${pieProps.valueEnable ? `{value|${numFormat(targetItem?.value)}}` : ''}${
                    pieProps.percentEnable ? `{percent|${targetItem?.percent}}` : ''
                }`;
            },
            data: pieProps.data.map((item, index) => {
                return {
                    name: item.name,
                    textStyle: {
                        color: theme.value.color[index]
                    }
                };
            })
        },
        series: [
            {
                type: 'pie',
                radius: pieProps.radius,
                center: pieProps.center,
                clockwise: true,
                avoidLabelOverlap: false,
                label: {
                    show: !!pieProps?.titleFormatter,
                    position: 'center',
                    formatter: (params) => {
                        return pieProps?.titleFormatter?.(params);
                    },
                    rich: pieProps.titleRich
                },
                data: pieProps.data,
                emphasis: {
                    label: {
                        show: true,
                        formatter: (params) => {
                            return pieProps?.labelFormatter?.(params);
                        },
                        rich: pieProps.labelRich
                    }
                }
            } as PieSeriesOption,
            {
                type: 'pie',
                radius: [
                    `${parseInt(pieProps.radius[0]) - 13}%`,
                    `${parseInt(pieProps.radius[1]) - 15}%`
                ],
                center: pieProps.center,
                clockwise: true,
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                },
                itemStyle: {
                    opacity: 0.1
                },
                emphasis: {
                    disabled: true
                },
                data: pieProps.data,
                tooltip: {
                    show: false
                }
            }
        ]
    };

    return option as EChartsOption;
};

onMounted(() => {
    const echartsIn = echarts.init(echartsRef.value);
    echartsIn.setOption(setOption());
    // const echartsInstance = initEchart(setOption());
    // if (pieProps.labelFormatter && pieProps.titleFormatter) {
    //     echartsInstance.on('mouseover', { seriesIndex: 0, type: 'pie' }, function () {
    //         const option = setOption();
    //         option.series[0].label.show = false;
    //         echartsInstance?.setOption(option);
    //     });
    //     echartsInstance.on('mouseout', { seriesIndex: 0, type: 'pie' }, function () {
    //         const option = setOption();
    //         option.series[0].label.show = true;
    //         echartsInstance?.setOption(option);
    //     });
    // }
});
</script>
