declare global {
  interface Window {
    kakao: {
      maps: {
        Map: any;
        LatLng: any;
        services: {
          Geocoder: any;
          Places: any;
        };
        event: {
          addListener: (target: any, type: string, callback: Function) => void;
        };
        // 필요한 다른 카카오맵 타입들
      };
    };
  }
}

export {};
