import React from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from '../../context/ThemeContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface InterestChartProps {
  labels: string[];
  simpleInterestData: number[];
  compoundInterestData: number[];
  title?: string;
}

const InterestChart: React.FC<InterestChartProps> = ({
  labels,
  simpleInterestData,
  compoundInterestData,
  title = 'Interest Growth Over Time'
}) => {
  const { theme } = useTheme();
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Simple Interest',
        data: simpleInterestData,
        borderColor: '#0ea5e9', // primary-500
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        tension: 0.3,
      },
      {
        label: 'Compound Interest',
        data: compoundInterestData,
        borderColor: '#14b8a6', // secondary-500
        backgroundColor: 'rgba(20, 184, 166, 0.1)',
        tension: 0.3,
      },
    ],
  };
  
  const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  const textColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';
  
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: textColor,
          font: {
            family: "'Inter', sans-serif",
            size: 12,
          },
        },
      },
      title: {
        display: !!title,
        text: title,
        color: textColor,
        font: {
          family: "'Inter', sans-serif",
          size: 16,
          weight: 'bold',
        },
      },
      tooltip: {
        backgroundColor: theme === 'dark' ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        titleColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
        bodyColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
        borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year',
          color: textColor,
          font: {
            family: "'Inter', sans-serif",
          },
        },
        grid: {
          color: gridColor,
        },
        ticks: {
          color: textColor,
          font: {
            family: "'Inter', sans-serif",
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount',
          color: textColor,
          font: {
            family: "'Inter', sans-serif",
          },
        },
        grid: {
          color: gridColor,
        },
        ticks: {
          color: textColor,
          font: {
            family: "'Inter', sans-serif",
          },
          callback: function(value) {
            return 'NPR ' + value.toLocaleString();
          }
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
  };
  
  return (
    <div className="h-80 w-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default InterestChart;