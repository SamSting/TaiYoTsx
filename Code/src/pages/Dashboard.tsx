import React from 'react';
import LineGraph from '../components/LineChart';
import Map from '../components/Map';

const Dashboard: React.FC = () => {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-6">COVID-19 Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-4">COVID-19 Trends</h2>
          <LineGraph />
        </div>
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Global COVID-19 Map</h2>
          <Map />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
