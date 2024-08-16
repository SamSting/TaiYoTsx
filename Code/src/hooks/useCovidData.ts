import { useQuery } from 'react-query';
import axios from 'axios';

const fetchWorldwideData = async () => {
  const response = await axios.get('https://disease.sh/v3/covid-19/all');
  return response.data;
};

const fetchCountryData = async () => {
  const response = await axios.get('https://disease.sh/v3/covid-19/countries');
  return response.data;
};

const fetchGraphData = async () => {
  const response = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
  return response.data;
};

export const useCovidWorldwide = () => useQuery('worldwideData', fetchWorldwideData);
export const useCovidCountry = () => useQuery('countryData', fetchCountryData);
export const useCovidGraph = () => useQuery('graphData', fetchGraphData);
