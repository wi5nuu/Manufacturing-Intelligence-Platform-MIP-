import ReactECharts from 'echarts-for-react';

interface OeeGaugeProps {
  value: number;
  title: string;
}

export const OeeGauge = ({ value, title }: OeeGaugeProps) => {
  const option = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        center: ['50%', '75%'],
        radius: '90%',
        min: 0,
        max: 100,
        progress: {
          show: true,
          width: 18
        },
        pointer: {
          show: false
        },
        axisLine: {
          lineStyle: {
            width: 18
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        anchor: {
          show: false
        },
        title: {
          show: false
        },
        detail: {
          valueAnimation: true,
          width: '60%',
          lineHeight: 40,
          borderRadius: 8,
          offsetCenter: [0, '-15%'],
          fontSize: 30,
          fontWeight: 'bolder',
          formatter: '{value}%',
          color: 'inherit'
        },
        data: [
          {
            value: value
          }
        ]
      }
    ],
    title: {
      text: title,
      left: 'center',
      bottom: '10%',
      textStyle: {
        fontSize: 14,
        color: '#64748b'
      }
    }
  };

  return <ReactECharts option={option} style={{ height: '200px' }} />;
};
