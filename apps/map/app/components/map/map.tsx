'use client';
import React, { useCallback, useEffect } from 'react';
import { NaverMap } from '@/app/types/naverMap';
import Script from 'next/script';
import { useRef } from 'react';
import { INITIAL_CENTER, INITIAL_ZOOM } from '@/app/constants/map';

interface MapProps {
  onLoadMap: (map: NaverMap) => void;
}

export const Map = ({ onLoadMap }: MapProps) => {
  const mapRef = useRef<NaverMap | null>(null);

  const initializeMap = useCallback(() => {
    if (!window.naver?.maps) return;
    const mapOptions = {
      center: { lat: INITIAL_CENTER[0], lng: INITIAL_CENTER[1] },
      zoom: INITIAL_ZOOM,
      minZoom: 9,
      draggable: true,
      scaleControl: true,
      logoControl: true,
    };
    const map = new window.naver.maps.Map('map', mapOptions);
    mapRef.current = map;
    if (onLoadMap) {
      onLoadMap(map);
    }
  }, [onLoadMap]);

  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.destroy();
      }
    };
  }, []);
  return (
    <div>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&submodules=geocoder,panorama`}
        onReady={initializeMap}
      />
      <div
        id="map"
        style={{
          width: '100%',
          height: '100vh',
        }}
      />
    </div>
  );
};
