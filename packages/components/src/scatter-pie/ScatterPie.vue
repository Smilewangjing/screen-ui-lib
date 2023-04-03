<template>
    <div class="scatter-pie-host" ref="echartsRef"></div>
</template>

<script lang="ts" setup>
import './style/index.scss';
import { numFormat } from '@ahsdata-ui/utils';

import { onMounted, computed } from 'vue';

import type { EChartsOption } from 'echarts';
import { useEchart } from '../common/hooks/useEchart';
import symbol from './symbol.svg';

defineOptions({ name: 's-scatter-pie' });

const { initEchart, calculationTotal, echartsRef, themeJson } = useEchart();

type ScatterPiePieProps = {
    data: { name: string; value: number }[];
    theme?: object;
    basicSize: number;
    symbolImg?: string;
    offsetData?: number[][];
    symbolOffset?: string[][];
};

const theme = computed(() => {
    return Object.assign(themeJson, scatterPiePieProps.theme);
});

const scatterPiePieProps = withDefaults(defineProps<ScatterPiePieProps>(), {
    basicSize: 70,
    symbolImg: `image://${symbol}`,
    offsetData: () => [
        [50, 50],
        [0, 100],
        [100, 100],
        [100, 0],
        [0, 0]
    ],
    symbolOffset: () => [
        ['0', '0'],
        ['30%', '40%'],
        ['-50%', '40%'],
        ['-50%', '-25%'],
        ['70%', '-20%']
    ]
});

const setOption = () => {
    const offsetData = scatterPiePieProps.offsetData;
    const symbolOffset = scatterPiePieProps.symbolOffset;
    const sumvalue = calculationTotal(scatterPiePieProps.data);
    const datas = scatterPiePieProps.data?.map((item, index) => {
        const size = (item.value / sumvalue) * 200 + scatterPiePieProps.basicSize;
        const offset = offsetData[index];
        return {
            name: item.name,
            value: offset,
            symbolSize: size,
            symbolOffset: symbolOffset[index],
            label: {
                formatter: `{top|TOP${index + 1}}\n{name|${item.name}}\n{value|${numFormat(
                    item.value
                )}}`
            }
        };
    });
    const option = {
        grid: {
            containLabel: true,
            left: 20,
            right: 20,
            bottom: 20,
            top: 20
        },
        xAxis: [
            {
                gridIndex: 0,
                type: 'value',
                show: false,
                min: 0,
                max: 100,
                nameLocation: 'middle',
                nameGap: 5
            }
        ],
        yAxis: [
            {
                gridIndex: 0,
                min: 0,
                show: false,
                max: 100,
                nameLocation: 'middle',
                nameGap: 10
            }
        ],

        emphasis: {
            disabled: true
        },

        series: [
            {
                type: 'scatter',
                symbol: scatterPiePieProps.symbolImg,
                symbolSize: 120,
                label: {
                    show: true,
                    color: '#D8E7FF',
                    textStyle: {
                        fontSize: 12
                    },
                    emphasis: {
                        disabled: true
                    },
                    rich: {
                        top: {
                            align: 'center',
                            padding: [0, 0, 5, 0]
                        },
                        name: {
                            align: 'center',
                            padding: [0, 0, 8, 0]
                        },
                        value: {
                            fontSize: 20,
                            align: 'center',
                            padding: [0, 0, 0, 0]
                        }
                    }
                },
                data: datas
            }
        ]
    };

    return option as EChartsOption;
};

onMounted(() => {
    initEchart(setOption(), theme.value);
});
</script>
