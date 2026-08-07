import * as THREE from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      meshBasicMaterial: any;
      octahedronGeometry: any;
      ambientLight: any;
      pointLight: any;
      directionalLight: any;
      sphereGeometry: any;
      boxGeometry: any;
      planeGeometry: any;
      group: any;
    }
  }
}

export {};
