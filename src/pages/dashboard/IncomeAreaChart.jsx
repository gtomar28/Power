import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title, LineElement, ArcElement, PointElement, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title, LineElement, ArcElement, PointElement, Filler);


// ==============================|| INCOME AREA CHART ||============================== //

export default function IncomeAreaChart({ graphDat }) {

  const [showLoader, setShowLoader] = useState(false);

  const labels = Object.keys(graphDat);
  const payinData = labels.map(month => graphDat[month].payin.Created);
  const payoutData = labels.map(month => graphDat[month].payout.Submitted);



  const data = {
    labels,
    datasets: [
      {
        label: 'Payin Created',
        data: payinData,
        fill: true,
        backgroundColor: 'rgba(34, 197, 93, 0.1)',
        borderColor: '#22C55D',
        pointRadius: 0,
        tension: 0.4
      },
      {
        label: 'Payout Submitted',
        data: payoutData,
        fill: true,
        backgroundColor: 'rgba(34, 197, 193, 0.1)',
        borderColor: '#22C5DD',
        pointRadius: 0,
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        callbacks: {
          title: function (tooltipItems) {
            const item = tooltipItems[0];
            return data.labels[item.dataIndex];
          },
          label: function (tooltipItem) {
            return `Details: ${tooltipItem.raw}`;
          }
        },
        backgroundColor: '#ffffff',
        titleColor: '#000000',
        bodyColor: '#000000',
        displayColors: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#999999',
        },
        border: {
          color: '#008479'
        }
      },
      y: {
        grid: {
          display: false
        },
        beginAtZero: true,
        border: {
          color: '#008479' 
        },
        ticks: {
          color: '#999999',
          callback: function (value) {
            return value + 'k';
          }
        }
      }
    }
  };


  return (
    <>
    {/* {
      showLoader && (
        <HashLoader />
      )
    } */}
      <div className="chart-container" style={{ height: '100%' }}>
        <Line data={data} options={options}></Line>
      </div>
    </>

  );
};
