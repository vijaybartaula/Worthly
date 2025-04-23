import React from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ChartOptions
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useTheme } from '../../context/ThemeContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface NPVChartProps {
  cashFlows: number[];
  discountedCashFlows: number[];
}

const NPVChart: React.FC<NPVChartProps> = ({
  cashFlows,
  discountedCashFlows
}) => {
  const { theme } = useTheme();
  
  // Create labels for each cash flow period (0, 1, 2, etc.)
  const labels = cashFlows.map((_, index) => `Year ${index}`);
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Cash Flow',
        data: cashFlows,
        backgroundColor: '#0ea5e9', // primary-500
      },
      {
        label: 'Discounted Cash Flow',
        data: discountedCashFlows,
        backgroundColor: '#14b8a6', // secondary-500
      },
    ],
  };
  
  const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  const textColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';
  
  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
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
        display: true,
        text: 'Cash Flow Analysis',
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
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: NPR ${context.parsed.y.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}`;
          }
        }
      },
    },
    scales: {
      x: {
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
      <Bar data={data} options={options} />
    </div>
  );
};

export default NPVChart;