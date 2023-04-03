import { onMounted, onUnmounted, ref } from 'vue';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
import themeJson from '../chartTheme.json';

export function useEchart(rendererEchart = 'svg') {
    const echartsRef = ref();
    let echartsInstance: echarts.ECharts = null;

    /**
     * 删除图表
     */
    const removeChart = () => {
        echartsInstance?.clear();
        echartsInstance?.dispose();
    };

    /**
     * 重置图表大小
     */
    const echartResize = () => {
        echartsInstance?.resize();
    };

    const initEchart = (option: EChartsOption, theme?: object) => {
        if (echartsRef.value) {
            removeChart();
            const echart = echarts.init(echartsRef.value, theme || themeJson, {
                renderer: rendererEchart as any
            });
            echart?.setOption(option, true);
            echartsInstance = echart;
            return echart;
        }
        return undefined;
    };

    const resizeObserverInstance = ref();

    onMounted(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            // eslint-disable-next-line no-restricted-syntax
            for (const entry of entries) {
                if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
                    echartResize();
                }
            }
        });
        if (echartsRef.value) {
            resizeObserver.observe(echartsRef.value);
            resizeObserverInstance.value = resizeObserver;
        }
    });

    const calculationTotal = (data: { name: string; value: number }[]) => {
        return data?.reduce((prev, next) => {
            // eslint-disable-next-line radix
            return prev + parseInt(next.value as unknown as string, 0);
        }, 0);
    };

    const covertData = (data: { name: string; value: number }[]) => {
        const total = calculationTotal(data);
        return data.map((item) => {
            const percentNum = Number((((item.value as number) / total) * 100).toFixed(2));
            return {
                ...item,
                percentNum,
                percent: `${percentNum}%`,
                total
            };
        });
    };

    onUnmounted(() => {
        // eslint-disable-next-line no-unused-expressions
        resizeObserverInstance.value && resizeObserverInstance.value.disconnect();
        removeChart();
    });

    return {
        themeJson,
        initEchart,
        echartsRef,
        removeChart,
        covertData,
        calculationTotal
    };
}
