import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

const locations = [
  { id: 1, name: 'Winter Park - Sahil Hubs', coordinates: [49.8238, 40.3789], type: "hub", icon: "./icons/placeholder.png" },
  { id: 2, name: 'Port Baku Hub', coordinates: [49.8377, 40.3671] },
  { id: 3, name: 'Boulevard - White City Hubs', coordinates: [49.8364, 40.3632], type: "hub", icon: "./icons/placeholder.png" },
  { id: 4, name: 'Congress Center - Ganjlik Hubs', coordinates: [49.8377, 40.3671], type: "hub", icon: "./icons/placeholder.png" },
  { id: 5, name: 'Narimanov Hub', coordinates: [49.8127, 40.3121], type: "hub", icon: "./icons/placeholder.png" },
  { id: 6, name: 'HAA Hub', coordinates: [49.8122, 40.1789], type: "hub", icon: "./icons/placeholder.png" },
  { id: 7, name: 'Koroghlu Main Hub', coordinates: [49.8377, 40.3671], type: "hub", icon: "./icons/placeholder.png" },
  { id: 8, name: 'Green Zone Hub', coordinates: [49.8377, 40.3671], type: "hub", icon: "./icons/placeholder.png" },
];

const Map = ({ startLocation, endLocation, mapStyle }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZnphcmEiLCJhIjoiY2x4ZGFhZXBnMDNicDJpczNnMXo1eXZqciJ9.U4dNVZ-9M3R8-s2BnxHNvQ'; // Replace with your Mapbox access token

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle || "mapbox://styles/fzara/clxsrqq0l004801pfhin6ff3a", // Use the provided style or custom style
      center: [49.895077, 40.37767], // Center of Baku
      zoom: 11, // Zoom level
    });

    map.addControl(new mapboxgl.NavigationControl());

    map.addControl(new mapboxgl.ScaleControl({
      maxWidth: 80,
      unit: 'metric'
    }));

    map.addControl(new mapboxgl.FullscreenControl());

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      profile: 'mapbox/driving', // or 'mapbox/walking', 'mapbox/cycling'
      alternatives: true,
      geometries: 'geojson',
      unit: 'metric',
      controls: {
        inputs: true,
        instructions: true,
      },
    });
    map.addControl(directions, 'top-left');

    locations.forEach((location) => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundColor = 'red';
      el.style.width = '32px';
      el.style.height = '32px';
      el.style.backgroundSize = '100%';

      new mapboxgl.Marker(el)
        .setLngLat(location.coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${location.name}</h3>`))
        .addTo(map);
    });

    if (startLocation && endLocation) {
      directions.setOrigin(startLocation);
      directions.setDestination(endLocation);
    }

    return () => map.remove();
  }, [startLocation, endLocation, mapStyle]);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default Map;
