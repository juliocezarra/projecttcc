import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { clothingItems } from '../mockData';

interface ItemPreviewProps {
  itemId: string;
  size?: 'small' | 'medium';
}

const RARITY_COLORS: Record<string, number> = {
  common: 0x94a3b8,
  uncommon: 0x22c55e,
  rare: 0x3b82f6,
  epic: 0xa855f7,
  legendary: 0xf59e0b,
};

const RARITY_EMISSIVE: Record<string, number> = {
  common: 0x475569,
  uncommon: 0x166534,
  rare: 0x1e40af,
  epic: 0x6b21a8,
  legendary: 0xb45309,
};

function createItemMesh(itemId: string): THREE.Group {
  const item = clothingItems.find((c) => c.id === itemId);
  if (!item) return new THREE.Group();

  const group = new THREE.Group();
  const color = RARITY_COLORS[item.rarity];
  const emissive = RARITY_EMISSIVE[item.rarity];
  const mat = new THREE.MeshPhongMaterial({ color, emissive, emissiveIntensity: 0.3 });

  if (item.category === 'head') {
    switch (itemId) {
      case 'head-1': {
        const lensGeo = new THREE.TorusGeometry(0.25, 0.05, 12, 24);
        const leftLens = new THREE.Mesh(lensGeo, mat);
        leftLens.position.set(-0.25, 0, 0);
        group.add(leftLens);
        const rightLens = new THREE.Mesh(lensGeo, mat);
        rightLens.position.set(0.25, 0, 0);
        group.add(rightLens);

        const bridgeGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.2, 8);
        const bridge = new THREE.Mesh(bridgeGeo, mat);
        bridge.rotation.z = Math.PI / 2;
        group.add(bridge);

        const glassMat = new THREE.MeshPhongMaterial({
          color: 0x00ffff,
          transparent: true,
          opacity: 0.4,
          emissive: 0x00ffff,
          emissiveIntensity: 0.5,
        });
        const glassGeo = new THREE.CircleGeometry(0.22, 16);
        const leftGlass = new THREE.Mesh(glassGeo, glassMat);
        leftGlass.position.set(-0.25, 0, 0.05);
        group.add(leftGlass);
        const rightGlass = new THREE.Mesh(glassGeo, glassMat);
        rightGlass.position.set(0.25, 0, 0.05);
        group.add(rightGlass);
        break;
      }
      case 'head-2': {
        const crownGeo = new THREE.CylinderGeometry(0.35, 0.4, 0.25, 8);
        const crown = new THREE.Mesh(crownGeo, mat);
        crown.position.y = 0.15;
        group.add(crown);

        for (let i = 0; i < 5; i++) {
          const angle = (i / 5) * Math.PI * 2;
          const pointGeo = new THREE.ConeGeometry(0.07, 0.2, 4);
          const point = new THREE.Mesh(pointGeo, mat);
          point.position.set(Math.cos(angle) * 0.35, 0.4, Math.sin(angle) * 0.35);
          group.add(point);
        }
        break;
      }
      case 'head-3': {
        const capGeo = new THREE.SphereGeometry(0.4, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);
        const cap = new THREE.Mesh(capGeo, mat);
        group.add(cap);

        const visorGeo = new THREE.BoxGeometry(0.45, 0.08, 0.3);
        const visor = new THREE.Mesh(visorGeo, mat);
        visor.position.y = -0.08;
        group.add(visor);
        break;
      }
      case 'head-4': {
        const helmetGeo = new THREE.SphereGeometry(0.5, 16, 16);
        const helmet = new THREE.Mesh(helmetGeo, mat);
        helmet.scale.set(1, 0.85, 1);
        group.add(helmet);

        const visorMat = new THREE.MeshPhongMaterial({
          color: 0x00ffff,
          emissive: 0x00ffff,
          emissiveIntensity: 0.6,
          transparent: true,
          opacity: 0.7,
        });
        const visorGeo = new THREE.BoxGeometry(0.6, 0.1, 0.1);
        const visor = new THREE.Mesh(visorGeo, visorMat);
        visor.position.set(0, 0.05, 0.4);
        group.add(visor);
        break;
      }
      case 'head-5': {
        const bandGeo = new THREE.TorusGeometry(0.4, 0.035, 8, 32);
        const band = new THREE.Mesh(bandGeo, mat);
        band.rotation.x = Math.PI / 2;
        group.add(band);

        const gemMat = new THREE.MeshPhongMaterial({
          color: 0xffd700,
          emissive: 0xffd700,
          emissiveIntensity: 0.8,
        });
        const gemGeo = new THREE.OctahedronGeometry(0.1);
        const gem = new THREE.Mesh(gemGeo, gemMat);
        gem.position.z = 0.35;
        group.add(gem);
        break;
      }
    }
  } else if (item.category === 'shirt') {
    const size = 0.4;
    const torsoGeo = new THREE.BoxGeometry(size * 1.1, size * 1.3, size * 0.6);
    const torso = new THREE.Mesh(torsoGeo, mat);
    group.add(torso);

    if (itemId !== 'shirt-1') {
      const sleeveGeo = new THREE.BoxGeometry(size * 0.3, size * 0.4, size * 0.5);
      const leftSleeve = new THREE.Mesh(sleeveGeo, mat);
      leftSleeve.position.set(-size * 0.65, 0, 0);
      group.add(leftSleeve);
      const rightSleeve = new THREE.Mesh(sleeveGeo, mat);
      rightSleeve.position.set(size * 0.65, 0, 0);
      group.add(rightSleeve);
    }
  } else if (item.category === 'pants') {
    const size = 0.35;
    const waistGeo = new THREE.BoxGeometry(size * 1.2, size * 0.4, size * 0.6);
    const waist = new THREE.Mesh(waistGeo, mat);
    waist.position.y = size * 0.3;
    group.add(waist);

    const legGeo = new THREE.BoxGeometry(size * 0.6, size * 1.3, size * 0.55);
    const leftLeg = new THREE.Mesh(legGeo, mat);
    leftLeg.position.set(-size * 0.35, -size * 0.2, 0);
    group.add(leftLeg);
    const rightLeg = new THREE.Mesh(legGeo, mat);
    rightLeg.position.set(size * 0.35, -size * 0.2, 0);
    group.add(rightLeg);
  } else if (item.category === 'feet') {
    const shoeGeo = new THREE.BoxGeometry(0.25, 0.15, 0.4);
    const shoe1 = new THREE.Mesh(shoeGeo, mat);
    shoe1.position.set(-0.15, 0, 0);
    group.add(shoe1);
    const shoe2 = new THREE.Mesh(shoeGeo, mat);
    shoe2.position.set(0.15, 0, 0);
    group.add(shoe2);
  }

  return group;
}

export const ItemPreview = ({ itemId, size = 'medium' }: ItemPreviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  const dimensions = size === 'small' ? { w: 80, h: 80 } : { w: 120, h: 120 };

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);

    const camera = new THREE.PerspectiveCamera(50, dimensions.w / dimensions.h, 0.1, 1000);
    camera.position.set(0, 0, 2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(dimensions.w, dimensions.h);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const itemMesh = createItemMesh(itemId);
    scene.add(itemMesh);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const light = new THREE.DirectionalLight(0xffffff, 0.8);
    light.position.set(2, 2, 2);
    scene.add(light);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      itemMesh.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [itemId, dimensions]);

  return (
    <div
      ref={containerRef}
      style={{
        width: `${dimensions.w}px`,
        height: `${dimensions.h}px`,
      }}
      className="rounded-lg"
    />
  );
};
