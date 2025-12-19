import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Blue user marker
const blueIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// Component to set map view dynamically
function SetView({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 14);
    }
  }, [position, map]);

  return null;
}

export default function MapPicker({ onSelect }) {
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get user location on mount
  useEffect(() => {
    if (!navigator.geolocation) {
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userPos = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setPosition(userPos);
        setLoading(false);
        onSelect(userPos);
      },
      (err) => {
        console.error("Geolocation error:", err);
        setLoading(false); // fallback if denied or error
      }
    );
  }, [onSelect]);

  // Marker for clicks
  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        onSelect(e.latlng);
      },
    });

    return position ? <Marker position={position} icon={blueIcon} /> : null;
  }

  // Show loader while fetching position
  if (loading) {
    return (
      <div className="d-flex" >
        <Skeleton height={(500)} />
      </div>
    );
  }

  // Map display
  return (
    <MapContainer
      center={ position || [14.7167, -17.4677]} // fallback Dakar
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />

      <SetView position={position} />
      <LocationMarker />
    </MapContainer>
  );
}
