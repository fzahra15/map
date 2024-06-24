import React, { useState } from 'react';
import Map from './Map';

// Your predefined locations
const locations = [
  { id: 1, name: 'Winter Park - Sahil Hubs', coordinates: [49.8238, 40.3789] },
  { id: 2, name: 'Port Baku Hub', coordinates: [49.8377, 40.3671] },
  { id: 3, name: 'Boulevard - White City Hubs', coordinates: [49.8364, 40.3632] },
  { id: 4, name: 'Congress Center - Ganjlik Hubs', coordinates: [49.8377, 40.3671] },
  { id: 5, name: 'Narimanov Hub', coordinates: [49.8127, 40.3121] },
  { id: 6, name: 'HAA Hub', coordinates: [49.8122, 40.1789] },
  { id: 7, name: 'Koroghlu Main Hub', coordinates: [49.8377, 40.3671] },
  { id: 8, name: 'Green Zone Hub', coordinates: [49.8377, 40.3671] },
];

const MapWithInputs = () => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/streets-v11');

  const handleRouteSubmit = () => {
    if (startLocation && endLocation) {
      const startCoords = locations.find(location => location.id === parseInt(startLocation)).coordinates;
      const endCoords = locations.find(location => location.id === parseInt(endLocation)).coordinates;

      setStartLocation(startCoords);
      setEndLocation(endCoords);
    } else {
      console.error('Please select valid start and end locations.');
    }
  };

  return (
    <div>
      <div>
        <label>Start Location:</label>
        <select value={startLocation} onChange={(e) => setStartLocation(e.target.value)}>
          <option value="">Select Start Location</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>End Location:</label>
        <select value={endLocation} onChange={(e) => setEndLocation(e.target.value)}>
          <option value="">Select End Location</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleRouteSubmit}>Get Directions</button>

      <div>
        <button onClick={() => setMapStyle('mapbox://styles/mapbox/streets-v11')}>Streets</button>
        <button onClick={() => setMapStyle('mapbox://styles/mapbox/satellite-v9')}>Satellite</button>
        <button onClick={() => setMapStyle('mapbox://styles/mapbox/outdoors-v11')}>Outdoors</button>
      </div>

      {/* Map component with Mapbox Directions */}
      <div style={{ width: '100%', height: '600px' }}>
        <Map startLocation={startLocation} endLocation={endLocation} mapStyle={mapStyle} />
      </div>
    </div>
  );
};

export default MapWithInputs;
