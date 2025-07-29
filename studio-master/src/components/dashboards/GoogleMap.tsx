
"use client";

import React from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

interface MapProps {
    center: {
        lat: number;
        lng: number;
    };
}

function MapComponent({ center }: MapProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  })

  if (loadError) {
    return <div className="flex items-center justify-center h-full bg-gray-200"><p>Error loading map</p></div>;
  }

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
        }}
      >
        <MarkerF position={center} />
      </GoogleMap>
  ) : <div className="flex items-center justify-center h-full bg-gray-200"><p>Loading Map...</p></div>
}

export default React.memo(MapComponent)
