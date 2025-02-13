declare namespace kakao.maps {
  export class Map {
    constructor(container: HTMLElement, options: MapOptions);
  }

  export class LatLng {
    constructor(lat: number, lng: number);
  }

  export interface MapOptions {
    center: LatLng;
    level: number;
  }
}

interface Window {
  kakao: typeof kakao;
}
