import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useCovidGraph } from '../hooks/useCovidData';

// Register the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineGraph: React.FC = () => {
  const { data, isLoading } = useCovidGraph();

  if (isLoading) return <div>Loading...</div>;

  // Map data into the format needed by Chart.js
  const chartData = {
    labels: Object.keys(data.cases), // Dates for the X axis
    datasets: [
      {
        label: 'COVID Cases',
        data: Object.values(data.cases), // Cases for the Y axis
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'COVID-19 Cases Over Time',
      },
    },
  };

  return (
    <div>
      <h2>COVID-19 Line Chart</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineGraph;
