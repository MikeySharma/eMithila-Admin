import React from 'react'
import { Column } from '@ant-design/plots';

const Chart = () => {
    const data = [
        {
          type: 'Jan',
          sales: 38,
        },
        {
          type: 'Feb',
          sales: 52,
        },
        {
          type: 'Mar',
          sales: 61,
        },
        {
          type: 'Apr',
          sales: 14,
        },
        {
          type: 'May',
          sales: 48,
        },
        {
          type: 'Jun',
          sales: 38,
        },
        {
          type: 'Jul',
          sales: 38,
        },
        {
          type: 'Aug',
          sales: 38,
        },
        {
          type: 'Sep',
          sales: 38,
        },
        {
          type: 'Oct',
          sales: 38,
        },
        {
          type: 'Nov',
          sales: 38,
        },
        {
          type: 'Dec',
          sales: 38,
        },
      ];
      const config = {
        data,
        xField: 'type',
        yField: 'sales',
        label: {
            //label
          position: 'middle',
          // 'top', 'bottom', 'middle',
          style: {
            fill: '#FFFFFF',
            opacity: 0.6,
          },
        },
        xAxis: {
          label: {
            autoHide: true,
            autoRotate: false,
          },
        },
        meta: {
          type: {
            alias: 'month',
          },
          sales: {
            alias: 'percentage',
          },
        },
      };
  return (
    <div className="my-4">
      <Column {...config} />
    </div>
  )
}

export default Chart
