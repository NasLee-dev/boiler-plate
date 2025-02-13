'use client';
import { useEffect, useRef } from 'react';
import { INITIAL_CENTER } from '../../constants/kakaoMap';

import 'react-kakao-maps-sdk';

export const KakaoMap = () => {
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const polylineRef = useRef<kakao.maps.Polyline | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const drawLine = (map: kakao.maps.Map) => {
    if (polylineRef.current) {
      polylineRef.current.setMap(null);
    }

    const bounds = map.getBounds();
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();
    const projection = map.getProjection();

    const swPixel = projection.pointFromCoords(sw);
    const targetPixel = new kakao.maps.Point(swPixel.x + 400, swPixel.y);
    const targetCoord = projection.coordsFromPoint(targetPixel);

    const bottomPoint = new kakao.maps.LatLng(
      sw.getLat(),
      targetCoord.getLng()
    );
    const topPoint = new kakao.maps.LatLng(ne.getLat(), targetCoord.getLng());

    const polyline = new kakao.maps.Polyline({
      path: [bottomPoint, topPoint],
      strokeWeight: 2,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeStyle: 'solid',
    });

    polyline.setMap(map);
    polylineRef.current = polyline;
  };
  useEffect(() => {
    const apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
    const script: HTMLScriptElement = document.createElement('script');

    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;

    const onLoadScript = () => {
      window.kakao.maps.load(() => {
        if (containerRef.current) {
          mapRef.current = new window.kakao.maps.Map(containerRef.current, {
            center: new window.kakao.maps.LatLng(
              INITIAL_CENTER[0],
              INITIAL_CENTER[1]
            ),
            level: 3,
          });
          drawLine(mapRef.current);
          kakao.maps.event.addListener(mapRef.current, 'idle', () => {
            if (mapRef.current) {
              drawLine(mapRef.current);
            }
          });
        }
      });
    };

    window.addEventListener('idle', () => {
      if (mapRef.current) {
        const bounds = mapRef.current.getBounds();
        const sw = bounds.getSouthWest();
        const ne = bounds.getNorthEast();
        const projection = mapRef.current.getProjection();
        const swPixel = projection.pointFromCoords(sw);
        const targetPixel = new kakao.maps.Point(swPixel.x + 400, swPixel.y);
        const targetCoord = projection.coordsFromPoint(targetPixel);
        console.log('현재 지도의 좌하단 좌표', sw);
        console.log('400px 떨어진 지점의 목표', targetCoord);

        const bottomPoint = new kakao.maps.LatLng(
          sw.getLat(),
          targetCoord.getLng()
        );
        const topPoint = new kakao.maps.LatLng(
          ne.getLat(),
          targetCoord.getLng()
        );

        const polyline = new kakao.maps.Polyline({
          path: [bottomPoint, topPoint],
          strokeWeight: 2,
          strokeColor: '#FF0000',
          strokeOpacity: 0.7,
          strokeStyle: 'solid',
        });

        polyline.setMap(mapRef.current);
      }
    });
    script.onload = onLoadScript;
    document.head.appendChild(script);

    return () => {
      script.onload = null;
      document.head.removeChild(script);
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100vh', position: 'relative' }}
    />
  );
};
