import ReactECharts from 'echarts-for-react';

interface TimeSeriesData {
  time: string;
  value: number;
}

interface TimeSeriesChartProps {
  data: TimeSeriesData[];
  title: string;
  color?: string;
}

export const TimeSeriesChart = ({ data, title, color = '#2563eb' }: TimeSeriesChartProps) => {
  const option = {
    title: {
      text: title,
      left: 'left',
      textStyle: { fontSize: 14, fontWeight: 'normal', color: '#64748b' }
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.map(item => new Date(item.time).toLocaleTimeString()),
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100
    },
    series: [
      {
        name: title,
        type: 'line',
        smooth: true,
        data: data.map(item => item.value),
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: color },
              { offset: 1, color: 'rgba(255,255,255,0)' }
            ]
          }
        },
        itemStyle: { color: color }
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '300px' }} />;
};
