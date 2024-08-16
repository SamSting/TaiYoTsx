import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useCovidCountry } from '../hooks/useCovidData';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface CountryInfo {
  country: string;
  active: number;
  recovered: number;
  deaths: number;
  countryInfo: {
    lat: number;
    long: number;
  };
}

// Function to create a responsive icon based on screen size
const createResponsiveIcon = () => {
  const size = window.innerWidth < 768 ? 25 : 20; 
  return L.icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    iconSize: [size, size],
    shadowSize: [41, 41],
  });
};

const Map: React.FC = () => {
  const { data, isLoading, error } = useCovidCountry();
  const [markerIcon, setMarkerIcon] = useState(createResponsiveIcon());

  useEffect(() => {
    
    const handleResize = () => {
      setMarkerIcon(createResponsiveIcon());
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: '500px', width: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {data.map((country: CountryInfo) => (
        <Marker 
          key={country.country} 
          position={[country.countryInfo.lat, country.countryInfo.long]}
          icon={markerIcon} 
        >
          <Popup>
            <strong>{country.country}</strong><br />
            Active: {country.active}<br />
            Recovered: {country.recovered}<br />
            Deaths: {country.deaths}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
