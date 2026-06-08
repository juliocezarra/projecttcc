declare module 'three' {
  export class Vector3 {
    x: number;
    y: number;
    z: number;
    set(x: number, y: number, z: number): void;
  }

  export class Euler {
    x: number;
    y: number;
    z: number;
    set(x: number, y: number, z: number): void;
  }

  export class Object3D {
    position: Vector3;
    rotation: Euler;
    scale: Vector3;
    add(...objects: Object3D[]): void;
  }

  export class Group extends Object3D {}

  export class Mesh extends Object3D {
    constructor(geometry?: unknown, material?: unknown);
  }

  export class Scene extends Object3D {
    background: unknown;
  }

  export class Color {
    constructor(color: number | string);
  }

  export class PerspectiveCamera extends Object3D {
    constructor(fov: number, aspect: number, near: number, far: number);
    lookAt(x: number, y: number, z: number): void;
  }

  export class WebGLRenderer {
    domElement: HTMLCanvasElement;
    constructor(options?: Record<string, unknown>);
    setSize(width: number, height: number): void;
    setPixelRatio(value: number): void;
    render(scene: Scene, camera: PerspectiveCamera): void;
    dispose(): void;
  }

  export class Clock {
    getElapsedTime(): number;
  }

  export class AmbientLight extends Object3D {
    constructor(color: number | string, intensity?: number);
  }

  export class DirectionalLight extends Object3D {
    constructor(color: number | string, intensity?: number);
  }

  export class MeshPhongMaterial {
    constructor(options?: Record<string, unknown>);
  }

  export class BoxGeometry {
    constructor(width?: number, height?: number, depth?: number);
  }

  export class SphereGeometry {
    constructor(radius?: number, widthSegments?: number, heightSegments?: number, phiStart?: number, phiLength?: number, thetaStart?: number, thetaLength?: number);
  }

  export class CylinderGeometry {
    constructor(radiusTop?: number, radiusBottom?: number, height?: number, radialSegments?: number);
  }

  export class TorusGeometry {
    constructor(radius?: number, tube?: number, radialSegments?: number, tubularSegments?: number, arc?: number);
  }

  export class ConeGeometry {
    constructor(radius?: number, height?: number, radialSegments?: number);
  }

  export class CircleGeometry {
    constructor(radius?: number, segments?: number);
  }

  export class OctahedronGeometry {
    constructor(radius?: number);
  }
}
