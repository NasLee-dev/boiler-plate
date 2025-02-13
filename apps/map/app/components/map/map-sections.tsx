'use client';
import { NaverMap } from '@/app/types/naverMap';
import { useMap } from '../hooks/useMap';
import { Map } from './map';

export const MapSections = () => {
  const { initMap } = useMap();

  const onLoadMap = (map: NaverMap) => {
    initMap(map);
  };
  return (
    <div>
      <Map onLoadMap={onLoadMap} />
    </div>
  );
};
