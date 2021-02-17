// @ts-nocheck
import { useEffect } from 'react';
import { useMap, MapContainer, TileLayer, Marker } from 'react-leaflet';

import './Map.css';

const SetCenter = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom, {
      animate: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center, zoom]);

  return null;
};

const Map = ({ center = { lat: 39.8283, lng: -98.5795 }, zoom }) => (
  <MapContainer
    center={center}
    zoom={zoom}
    style={{ width: '100%', height: '100%' }}
  >
    <SetCenter center={center} zoom={zoom || 4} />
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={center}>
      {/* <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup> */}
    </Marker>
  </MapContainer>
);
export default Map;
