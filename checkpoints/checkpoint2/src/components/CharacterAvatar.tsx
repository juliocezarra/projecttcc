import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Character } from '../types';
import { clothingItems } from '../mockData';

interface CharacterAvatarProps {
  character: Character;
  size?: 'small' | 'medium' | 'large';
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

function createHeadAccessory(itemId: string): THREE.Group {
  const group = new THREE.Group();
  const item = clothingItems.find((c) => c.id === itemId);
  if (!item) return group;

  const color = RARITY_COLORS[item.rarity];
  const emissive = RARITY_EMISSIVE[item.rarity];
  const mat = new THREE.MeshPhongMaterial({ color, emissive, emissiveIntensity: 0.3 });

  switch (itemId) {
    case 'head-1': {
      const lensGeo = new THREE.TorusGeometry(0.18, 0.04, 12, 24);
      const leftLens = new THREE.Mesh(lensGeo, mat);
      leftLens.position.set(-0.2, 0, 0.5);
      leftLens.rotation.y = 0.15;
      group.add(leftLens);

      const rightLens = new THREE.Mesh(lensGeo, mat);
      rightLens.position.set(0.2, 0, 0.5);
      rightLens.rotation.y = -0.15;
      group.add(rightLens);

      const bridgeGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.15, 8);
      const bridge = new THREE.Mesh(bridgeGeo, mat);
      bridge.position.set(0, 0, 0.55);
      bridge.rotation.z = Math.PI / 2;
      group.add(bridge);

      const glassMat = new THREE.MeshPhongMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.4,
        emissive: 0x00ffff,
        emissiveIntensity: 0.5,
      });
      const glassGeo = new THREE.CircleGeometry(0.16, 16);
      const leftGlass = new THREE.Mesh(glassGeo, glassMat);
      leftGlass.position.set(-0.2, 0, 0.51);
      group.add(leftGlass);
      const rightGlass = new THREE.Mesh(glassGeo, glassMat);
      rightGlass.position.set(0.2, 0, 0.51);
      group.add(rightGlass);
      break;
    }
    case 'head-2': {
      const crownGeo = new THREE.CylinderGeometry(0.35, 0.4, 0.3, 8);
      const crown = new THREE.Mesh(crownGeo, mat);
      crown.position.y = 0.35;
      group.add(crown);

      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const pointGeo = new THREE.ConeGeometry(0.06, 0.2, 4);
        const point = new THREE.Mesh(pointGeo, mat);
        point.position.set(Math.cos(angle) * 0.35, 0.6, Math.sin(angle) * 0.35);
        group.add(point);
      }

      const gemMat = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        emissive: 0xff0000,
        emissiveIntensity: 0.6,
      });
      const gemGeo = new THREE.SphereGeometry(0.06, 8, 8);
      const gem = new THREE.Mesh(gemGeo, gemMat);
      gem.position.set(0, 0.35, 0.4);
      group.add(gem);
      break;
    }
    case 'head-3': {
      const capGeo = new THREE.SphereGeometry(0.55, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);
      const cap = new THREE.Mesh(capGeo, mat);
      cap.position.y = 0.15;
      group.add(cap);

      const visorGeo = new THREE.BoxGeometry(0.5, 0.05, 0.35);
      const visor = new THREE.Mesh(visorGeo, mat);
      visor.position.set(0, 0.05, 0.4);
      visor.rotation.x = -0.2;
      group.add(visor);

      const ledMat = new THREE.MeshPhongMaterial({
        color: 0x00ff00,
        emissive: 0x00ff00,
        emissiveIntensity: 0.8,
      });
      const ledGeo = new THREE.TorusGeometry(0.52, 0.02, 4, 24);
      const led = new THREE.Mesh(ledGeo, ledMat);
      led.position.y = 0.18;
      led.rotation.x = Math.PI / 2;
      group.add(led);
      break;
    }
    case 'head-4': {
      const helmetGeo = new THREE.SphereGeometry(0.58, 16, 16);
      const helmet = new THREE.Mesh(helmetGeo, mat);
      helmet.scale.set(1, 0.9, 1);
      group.add(helmet);

      const visorMat = new THREE.MeshPhongMaterial({
        color: 0x00ffff,
        emissive: 0x00ffff,
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 0.7,
      });
      const visorGeo = new THREE.BoxGeometry(0.7, 0.12, 0.1);
      const visor = new THREE.Mesh(visorGeo, visorMat);
      visor.position.set(0, 0.05, 0.52);
      group.add(visor);

      const antennaGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.3, 8);
      const antenna = new THREE.Mesh(antennaGeo, mat);
      antenna.position.set(0, 0.55, 0);
      group.add(antenna);

      const tipMat = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        emissive: 0xff0000,
        emissiveIntensity: 0.8,
      });
      const tipGeo = new THREE.SphereGeometry(0.04, 8, 8);
      const tip = new THREE.Mesh(tipGeo, tipMat);
      tip.position.set(0, 0.72, 0);
      group.add(tip);
      break;
    }
    case 'head-5': {
      const bandGeo = new THREE.TorusGeometry(0.5, 0.04, 8, 32);
      const band = new THREE.Mesh(bandGeo, mat);
      band.rotation.x = Math.PI / 2;
      band.position.y = 0.2;
      group.add(band);

      const gemMat = new THREE.MeshPhongMaterial({
        color: 0xffd700,
        emissive: 0xffd700,
        emissiveIntensity: 0.8,
      });
      const gemGeo = new THREE.OctahedronGeometry(0.1);
      const gem = new THREE.Mesh(gemGeo, gemMat);
      gem.position.set(0, 0.3, 0.45);
      group.add(gem);

      const sideGemMat = new THREE.MeshPhongMaterial({
        color: 0x00ffff,
        emissive: 0x00ffff,
        emissiveIntensity: 0.6,
      });
      for (const x of [-0.3, 0.3]) {
        const sideGem = new THREE.Mesh(new THREE.OctahedronGeometry(0.06), sideGemMat);
        sideGem.position.set(x, 0.25, 0.35);
        group.add(sideGem);
      }

      const particleMat = new THREE.MeshPhongMaterial({
        color: 0xffd700,
        emissive: 0xffd700,
        emissiveIntensity: 1,
      });
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const p = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 6), particleMat);
        p.position.set(Math.cos(angle) * 0.55, 0.35, Math.sin(angle) * 0.55);
        group.add(p);
      }
      break;
    }
  }

  return group;
}

function createShirt(itemId: string): THREE.Group {
  const group = new THREE.Group();
  const item = clothingItems.find((c) => c.id === itemId);
  if (!item) return group;

  const color = RARITY_COLORS[item.rarity];
  const emissive = RARITY_EMISSIVE[item.rarity];
  const mat = new THREE.MeshPhongMaterial({ color, emissive, emissiveIntensity: 0.2 });

  switch (itemId) {
    case 'shirt-1': {
      const torsoGeo = new THREE.BoxGeometry(0.9, 1.1, 0.5);
      const torso = new THREE.Mesh(torsoGeo, mat);
      group.add(torso);

      const sleeveGeo = new THREE.BoxGeometry(0.25, 0.3, 0.45);
      const leftSleeve = new THREE.Mesh(sleeveGeo, mat);
      leftSleeve.position.set(-0.58, 0.35, 0);
      group.add(leftSleeve);
      const rightSleeve = new THREE.Mesh(sleeveGeo, mat);
      rightSleeve.position.set(0.58, 0.35, 0);
      group.add(rightSleeve);

      const collarGeo = new THREE.TorusGeometry(0.15, 0.04, 8, 16, Math.PI);
      const collarMat = new THREE.MeshPhongMaterial({ color: 0x1e293b });
      const collar = new THREE.Mesh(collarGeo, collarMat);
      collar.position.set(0, 0.55, 0.2);
      collar.rotation.x = -0.3;
      group.add(collar);
      break;
    }
    case 'shirt-2': {
      const jacketGeo = new THREE.BoxGeometry(0.95, 1.15, 0.55);
      const jacket = new THREE.Mesh(jacketGeo, mat);
      group.add(jacket);

      const sleeveGeo = new THREE.CylinderGeometry(0.14, 0.12, 0.8, 8);
      const leftSleeve = new THREE.Mesh(sleeveGeo, mat);
      leftSleeve.position.set(-0.58, 0.1, 0);
      leftSleeve.rotation.z = -0.3;
      group.add(leftSleeve);
      const rightSleeve = new THREE.Mesh(sleeveGeo, mat);
      rightSleeve.position.set(0.58, 0.1, 0);
      rightSleeve.rotation.z = 0.3;
      group.add(rightSleeve);

      const neonMat = new THREE.MeshPhongMaterial({
        color: 0x00ffff,
        emissive: 0x00ffff,
        emissiveIntensity: 0.8,
      });
      const stripGeo = new THREE.BoxGeometry(0.02, 1.1, 0.56);
      const leftStrip = new THREE.Mesh(stripGeo, neonMat);
      leftStrip.position.set(-0.35, 0, 0);
      group.add(leftStrip);
      const rightStrip = new THREE.Mesh(stripGeo, neonMat);
      rightStrip.position.set(0.35, 0, 0);
      group.add(rightStrip);

      const zipGeo = new THREE.BoxGeometry(0.03, 1.1, 0.01);
      const zip = new THREE.Mesh(zipGeo, neonMat);
      zip.position.set(0, 0, 0.28);
      group.add(zip);
      break;
    }
    case 'shirt-3': {
      const blazerGeo = new THREE.BoxGeometry(1.0, 1.2, 0.55);
      const blazer = new THREE.Mesh(blazerGeo, mat);
      group.add(blazer);

      const sleeveGeo = new THREE.CylinderGeometry(0.15, 0.13, 0.9, 8);
      const leftSleeve = new THREE.Mesh(sleeveGeo, mat);
      leftSleeve.position.set(-0.58, 0.05, 0);
      leftSleeve.rotation.z = -0.3;
      group.add(leftSleeve);
      const rightSleeve = new THREE.Mesh(sleeveGeo, mat);
      rightSleeve.position.set(0.58, 0.05, 0);
      rightSleeve.rotation.z = 0.3;
      group.add(rightSleeve);

      const lapelGeo = new THREE.BoxGeometry(0.15, 0.4, 0.02);
      const lapelMat = new THREE.MeshPhongMaterial({ color: 0x1e293b });
      const leftLapel = new THREE.Mesh(lapelGeo, lapelMat);
      leftLapel.position.set(-0.2, 0.4, 0.28);
      leftLapel.rotation.z = 0.15;
      group.add(leftLapel);
      const rightLapel = new THREE.Mesh(lapelGeo, lapelMat);
      rightLapel.position.set(0.2, 0.4, 0.28);
      rightLapel.rotation.z = -0.15;
      group.add(rightLapel);

      const buttonGeo = new THREE.SphereGeometry(0.04, 8, 8);
      const buttonMat = new THREE.MeshPhongMaterial({ color: 0xfbbf24 });
      const button = new THREE.Mesh(buttonGeo, buttonMat);
      button.position.set(0, 0.1, 0.28);
      group.add(button);
      break;
    }
    case 'shirt-4': {
      const suitGeo = new THREE.BoxGeometry(1.0, 1.2, 0.55);
      const suit = new THREE.Mesh(suitGeo, mat);
      group.add(suit);

      const sleeveGeo = new THREE.CylinderGeometry(0.15, 0.13, 0.9, 8);
      const leftSleeve = new THREE.Mesh(sleeveGeo, mat);
      leftSleeve.position.set(-0.58, 0.05, 0);
      leftSleeve.rotation.z = -0.3;
      group.add(leftSleeve);
      const rightSleeve = new THREE.Mesh(sleeveGeo, mat);
      rightSleeve.position.set(0.58, 0.05, 0);
      rightSleeve.rotation.z = 0.3;
      group.add(rightSleeve);

      const shirtMat = new THREE.MeshPhongMaterial({ color: 0xf8fafc });
      const shirtGeo = new THREE.BoxGeometry(0.3, 1.0, 0.01);
      const shirtFront = new THREE.Mesh(shirtGeo, shirtMat);
      shirtFront.position.set(0, 0, 0.28);
      group.add(shirtFront);

      const tieMat = new THREE.MeshPhongMaterial({
        color: 0xef4444,
        emissive: 0xef4444,
        emissiveIntensity: 0.2,
      });
      const tieGeo = new THREE.BoxGeometry(0.08, 0.7, 0.02);
      const tie = new THREE.Mesh(tieGeo, tieMat);
      tie.position.set(0, -0.05, 0.29);
      group.add(tie);

      const knotGeo = new THREE.BoxGeometry(0.1, 0.08, 0.02);
      const knot = new THREE.Mesh(knotGeo, tieMat);
      knot.position.set(0, 0.3, 0.29);
      group.add(knot);
      break;
    }
    case 'shirt-5': {
      const cosmicGeo = new THREE.BoxGeometry(0.95, 1.15, 0.55);
      const cosmic = new THREE.Mesh(cosmicGeo, mat);
      group.add(cosmic);

      const sleeveGeo = new THREE.CylinderGeometry(0.14, 0.12, 0.85, 8);
      const leftSleeve = new THREE.Mesh(sleeveGeo, mat);
      leftSleeve.position.set(-0.58, 0.05, 0);
      leftSleeve.rotation.z = -0.3;
      group.add(leftSleeve);
      const rightSleeve = new THREE.Mesh(sleeveGeo, mat);
      rightSleeve.position.set(0.58, 0.05, 0);
      rightSleeve.rotation.z = 0.3;
      group.add(rightSleeve);

      const starMat = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 1,
      });
      for (let i = 0; i < 8; i++) {
        const star = new THREE.Mesh(new THREE.SphereGeometry(0.025, 4, 4), starMat);
        star.position.set(
          (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 1.0,
          0.28
        );
        group.add(star);
      }

      const emblemMat = new THREE.MeshPhongMaterial({
        color: 0xffd700,
        emissive: 0xffd700,
        emissiveIntensity: 0.8,
      });
      const emblemGeo = new THREE.OctahedronGeometry(0.08);
      const emblem = new THREE.Mesh(emblemGeo, emblemMat);
      emblem.position.set(0, 0.2, 0.3);
      group.add(emblem);

      const ringMat = new THREE.MeshPhongMaterial({
        color: 0xffd700,
        emissive: 0xffd700,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.6,
      });
      const ringGeo = new THREE.TorusGeometry(0.4, 0.02, 8, 32);
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(0, 0, 0);
      ring.rotation.x = Math.PI / 2;
      group.add(ring);
      break;
    }
  }

  return group;
}

function createPants(itemId: string): THREE.Group {
  const group = new THREE.Group();
  const item = clothingItems.find((c) => c.id === itemId);
  if (!item) return group;

  const color = RARITY_COLORS[item.rarity];
  const emissive = RARITY_EMISSIVE[item.rarity];
  const mat = new THREE.MeshPhongMaterial({ color, emissive, emissiveIntensity: 0.2 });

  switch (itemId) {
    case 'pants-1': {
      const waistGeo = new THREE.BoxGeometry(0.85, 0.25, 0.5);
      const waist = new THREE.Mesh(waistGeo, mat);
      waist.position.y = 0.35;
      group.add(waist);

      const legGeo = new THREE.BoxGeometry(0.35, 0.9, 0.45);
      const leftLeg = new THREE.Mesh(legGeo, mat);
      leftLeg.position.set(-0.22, -0.15, 0);
      group.add(leftLeg);
      const rightLeg = new THREE.Mesh(legGeo, mat);
      rightLeg.position.set(0.22, -0.15, 0);
      group.add(rightLeg);

      const beltMat = new THREE.MeshPhongMaterial({ color: 0x78350f });
      const beltGeo = new THREE.BoxGeometry(0.87, 0.06, 0.52);
      const belt = new THREE.Mesh(beltGeo, beltMat);
      belt.position.y = 0.45;
      group.add(belt);

      const buckleMat = new THREE.MeshPhongMaterial({ color: 0xfbbf24, emissive: 0xfbbf24, emissiveIntensity: 0.3 });
      const buckleGeo = new THREE.BoxGeometry(0.08, 0.06, 0.02);
      const buckle = new THREE.Mesh(buckleGeo, buckleMat);
      buckle.position.set(0, 0.45, 0.27);
      group.add(buckle);
      break;
    }
    case 'pants-2': {
      const waistGeo = new THREE.BoxGeometry(0.85, 0.25, 0.5);
      const waist = new THREE.Mesh(waistGeo, mat);
      waist.position.y = 0.35;
      group.add(waist);

      const legGeo = new THREE.BoxGeometry(0.35, 0.9, 0.45);
      const leftLeg = new THREE.Mesh(legGeo, mat);
      leftLeg.position.set(-0.22, -0.15, 0);
      group.add(leftLeg);
      const rightLeg = new THREE.Mesh(legGeo, mat);
      rightLeg.position.set(0.22, -0.15, 0);
      group.add(rightLeg);

      const neonMat = new THREE.MeshPhongMaterial({
        color: 0x00ffff,
        emissive: 0x00ffff,
        emissiveIntensity: 0.8,
      });
      const stripGeo = new THREE.BoxGeometry(0.02, 0.9, 0.46);
      const strips = [-0.35, 0.35];
      strips.forEach((x) => {
        const strip = new THREE.Mesh(stripGeo, neonMat);
        strip.position.set(x, -0.15, 0);
        group.add(strip);
      });

      const patchGeo = new THREE.BoxGeometry(0.15, 0.1, 0.01);
      const leftPatch = new THREE.Mesh(patchGeo, neonMat);
      leftPatch.position.set(-0.22, 0.05, 0.23);
      group.add(leftPatch);
      const rightPatch = new THREE.Mesh(patchGeo, neonMat);
      rightPatch.position.set(0.22, 0.05, 0.23);
      group.add(rightPatch);
      break;
    }
    case 'pants-3': {
      const waistGeo = new THREE.BoxGeometry(0.85, 0.25, 0.5);
      const waist = new THREE.Mesh(waistGeo, mat);
      waist.position.y = 0.35;
      group.add(waist);

      const legGeo = new THREE.BoxGeometry(0.33, 0.95, 0.45);
      const leftLeg = new THREE.Mesh(legGeo, mat);
      leftLeg.position.set(-0.22, -0.15, 0);
      group.add(leftLeg);
      const rightLeg = new THREE.Mesh(legGeo, mat);
      rightLeg.position.set(0.22, -0.15, 0);
      group.add(rightLeg);

      const creaseMat = new THREE.MeshPhongMaterial({ color: 0x1e293b });
      const creaseGeo = new THREE.BoxGeometry(0.01, 0.9, 0.01);
      const leftCrease = new THREE.Mesh(creaseGeo, creaseMat);
      leftCrease.position.set(-0.22, -0.15, 0.23);
      group.add(leftCrease);
      const rightCrease = new THREE.Mesh(creaseGeo, creaseMat);
      rightCrease.position.set(0.22, -0.15, 0.23);
      group.add(rightCrease);

      const beltMat = new THREE.MeshPhongMaterial({ color: 0x1e293b });
      const beltGeo = new THREE.BoxGeometry(0.87, 0.06, 0.52);
      const belt = new THREE.Mesh(beltGeo, beltMat);
      belt.position.y = 0.45;
      group.add(belt);
      break;
    }
    case 'pants-4': {
      const waistGeo = new THREE.BoxGeometry(0.85, 0.25, 0.5);
      const waist = new THREE.Mesh(waistGeo, mat);
      waist.position.y = 0.35;
      group.add(waist);

      const legGeo = new THREE.BoxGeometry(0.35, 0.9, 0.45);
      const leftLeg = new THREE.Mesh(legGeo, mat);
      leftLeg.position.set(-0.22, -0.15, 0);
      group.add(leftLeg);
      const rightLeg = new THREE.Mesh(legGeo, mat);
      rightLeg.position.set(0.22, -0.15, 0);
      group.add(rightLeg);

      const panelMat = new THREE.MeshPhongMaterial({
        color: 0x00ffff,
        emissive: 0x00ffff,
        emissiveIntensity: 0.4,
        transparent: true,
        opacity: 0.6,
      });
      const panelGeo = new THREE.BoxGeometry(0.2, 0.15, 0.01);
      const leftPanel = new THREE.Mesh(panelGeo, panelMat);
      leftPanel.position.set(-0.22, 0.15, 0.23);
      group.add(leftPanel);
      const rightPanel = new THREE.Mesh(panelGeo, panelMat);
      rightPanel.position.set(0.22, 0.15, 0.23);
      group.add(rightPanel);

      const ringMat = new THREE.MeshPhongMaterial({
        color: 0x00ffff,
        emissive: 0x00ffff,
        emissiveIntensity: 0.6,
      });
      const ringGeo = new THREE.TorusGeometry(0.18, 0.02, 8, 16);
      const leftRing = new THREE.Mesh(ringGeo, ringMat);
      leftRing.position.set(-0.22, -0.55, 0);
      leftRing.rotation.x = Math.PI / 2;
      group.add(leftRing);
      const rightRing = new THREE.Mesh(ringGeo, ringMat);
      rightRing.position.set(0.22, -0.55, 0);
      rightRing.rotation.x = Math.PI / 2;
      group.add(rightRing);
      break;
    }
    case 'pants-5': {
      const waistGeo = new THREE.BoxGeometry(0.85, 0.25, 0.5);
      const waist = new THREE.Mesh(waistGeo, mat);
      waist.position.y = 0.35;
      group.add(waist);

      const legGeo = new THREE.BoxGeometry(0.35, 0.9, 0.45);
      const leftLeg = new THREE.Mesh(legGeo, mat);
      leftLeg.position.set(-0.22, -0.15, 0);
      group.add(leftLeg);
      const rightLeg = new THREE.Mesh(legGeo, mat);
      rightLeg.position.set(0.22, -0.15, 0);
      group.add(rightLeg);

      const infMat = new THREE.MeshPhongMaterial({
        color: 0xffd700,
        emissive: 0xffd700,
        emissiveIntensity: 0.8,
      });
      const infGeo = new THREE.TorusGeometry(0.1, 0.02, 8, 16);
      const leftInf = new THREE.Mesh(infGeo, infMat);
      leftInf.position.set(-0.12, 0.2, 0.24);
      leftInf.rotation.y = Math.PI / 4;
      group.add(leftInf);
      const rightInf = new THREE.Mesh(infGeo, infMat);
      rightInf.position.set(0.12, 0.2, 0.24);
      rightInf.rotation.y = -Math.PI / 4;
      group.add(rightInf);

      const particleMat = new THREE.MeshPhongMaterial({
        color: 0xffd700,
        emissive: 0xffd700,
        emissiveIntensity: 1,
      });
      for (let i = 0; i < 6; i++) {
        const p = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6, 6), particleMat);
        p.position.set(
          (Math.random() - 0.5) * 0.7,
          (Math.random() - 0.5) * 0.8,
          0.25
        );
        group.add(p);
      }

      const glowMat = new THREE.MeshPhongMaterial({
        color: 0xffd700,
        emissive: 0xffd700,
        emissiveIntensity: 0.5,
      });
      const glowGeo = new THREE.TorusGeometry(0.42, 0.03, 8, 24);
      const glow = new THREE.Mesh(glowGeo, glowMat);
      glow.position.y = 0.45;
      glow.rotation.x = Math.PI / 2;
      group.add(glow);
      break;
    }
  }

  return group;
}

function createFeet(itemId: string): THREE.Group {
  const group = new THREE.Group();
  const item = clothingItems.find((c) => c.id === itemId);
  if (!item) return group;

  const color = RARITY_COLORS[item.rarity];
  const emissive = RARITY_EMISSIVE[item.rarity];
  const mat = new THREE.MeshPhongMaterial({ color, emissive, emissiveIntensity: 0.2 });

  const makeShoe = (xPos: number): THREE.Mesh[] => {
    const meshes: THREE.Mesh[] = [];
    switch (itemId) {
      case 'feet-1': {
        const soleGeo = new THREE.BoxGeometry(0.3, 0.1, 0.5);
        const sole = new THREE.Mesh(soleGeo, new THREE.MeshPhongMaterial({ color: 0xf8fafc }));
        sole.position.set(xPos, -0.05, 0.05);
        meshes.push(sole);

        const upperGeo = new THREE.BoxGeometry(0.28, 0.18, 0.4);
        const upper = new THREE.Mesh(upperGeo, mat);
        upper.position.set(xPos, 0.04, 0);
        meshes.push(upper);
        break;
      }
      case 'feet-2': {
        const soleGeo = new THREE.BoxGeometry(0.3, 0.1, 0.5);
        const soleMat = new THREE.MeshPhongMaterial({
          color: 0x00ffff,
          emissive: 0x00ffff,
          emissiveIntensity: 0.6,
        });
        const sole = new THREE.Mesh(soleGeo, soleMat);
        sole.position.set(xPos, -0.05, 0.05);
        meshes.push(sole);

        const upperGeo = new THREE.BoxGeometry(0.28, 0.2, 0.4);
        const upper = new THREE.Mesh(upperGeo, mat);
        upper.position.set(xPos, 0.05, 0);
        meshes.push(upper);

        const ledGeo = new THREE.BoxGeometry(0.02, 0.15, 0.35);
        const led = new THREE.Mesh(ledGeo, soleMat);
        led.position.set(xPos > 0 ? 0.15 : -0.15, 0, 0);
        meshes.push(led);
        break;
      }
      case 'feet-3': {
        const soleGeo = new THREE.BoxGeometry(0.25, 0.08, 0.45);
        const soleMat = new THREE.MeshPhongMaterial({ color: 0x1e293b });
        const sole = new THREE.Mesh(soleGeo, soleMat);
        sole.position.set(xPos, -0.04, 0.02);
        meshes.push(sole);

        const upperGeo = new THREE.BoxGeometry(0.24, 0.16, 0.38);
        const upper = new THREE.Mesh(upperGeo, mat);
        upper.position.set(xPos, 0.04, 0);
        meshes.push(upper);

        const toeGeo = new THREE.BoxGeometry(0.24, 0.08, 0.12);
        const toe = new THREE.Mesh(toeGeo, mat);
        toe.position.set(xPos, 0.08, 0.2);
        meshes.push(toe);
        break;
      }
      case 'feet-4': {
        const bootGeo = new THREE.BoxGeometry(0.3, 0.45, 0.4);
        const boot = new THREE.Mesh(bootGeo, mat);
        boot.position.set(xPos, 0.12, 0);
        meshes.push(boot);

        const soleGeo = new THREE.BoxGeometry(0.32, 0.1, 0.5);
        const soleMat = new THREE.MeshPhongMaterial({ color: 0x1e293b });
        const sole = new THREE.Mesh(soleGeo, soleMat);
        sole.position.set(xPos, -0.15, 0.05);
        meshes.push(sole);

        const stripMat = new THREE.MeshPhongMaterial({
          color: 0xff0080,
          emissive: 0xff0080,
          emissiveIntensity: 0.6,
        });
        const stripGeo = new THREE.BoxGeometry(0.02, 0.35, 0.01);
        const strip = new THREE.Mesh(stripGeo, stripMat);
        strip.position.set(xPos > 0 ? 0.16 : -0.16, 0.12, 0.2);
        meshes.push(strip);

        const buckleMat = new THREE.MeshPhongMaterial({
          color: 0xff0080,
          emissive: 0xff0080,
          emissiveIntensity: 0.4,
        });
        const buckleGeo = new THREE.BoxGeometry(0.08, 0.06, 0.02);
        const buckle = new THREE.Mesh(buckleGeo, buckleMat);
        buckle.position.set(xPos, 0.25, 0.21);
        meshes.push(buckle);
        break;
      }
      case 'feet-5': {
        const shoeGeo = new THREE.BoxGeometry(0.28, 0.18, 0.4);
        const shoe = new THREE.Mesh(shoeGeo, mat);
        shoe.position.set(xPos, 0.05, 0);
        meshes.push(shoe);

        const wingMat = new THREE.MeshPhongMaterial({
          color: 0xffd700,
          emissive: 0xffd700,
          emissiveIntensity: 0.6,
          transparent: true,
          opacity: 0.8,
        });
        const wingGeo = new THREE.BoxGeometry(0.02, 0.2, 0.3);
        const wing = new THREE.Mesh(wingGeo, wingMat);
        wing.position.set(xPos > 0 ? 0.16 : -0.16, 0.15, -0.05);
        wing.rotation.z = xPos > 0 ? 0.3 : -0.3;
        meshes.push(wing);

        const glowMat = new THREE.MeshPhongMaterial({
          color: 0xffd700,
          emissive: 0xffd700,
          emissiveIntensity: 0.8,
          transparent: true,
          opacity: 0.5,
        });
        const glowGeo = new THREE.SphereGeometry(0.08, 8, 8);
        const glow = new THREE.Mesh(glowGeo, glowMat);
        glow.position.set(xPos, -0.1, 0);
        meshes.push(glow);
        break;
      }
    }
    return meshes;
  };

  const leftShoe = makeShoe(-0.22);
  leftShoe.forEach((m) => group.add(m));
  const rightShoe = makeShoe(0.22);
  rightShoe.forEach((m) => group.add(m));

  return group;
}

export const CharacterAvatar = ({ character, size = 'medium' }: CharacterAvatarProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);

  const containerSizes = {
    small: { width: 120, height: 160 },
    medium: { width: 160, height: 220 },
    large: { width: 240, height: 320 },
  };

  const dimensions = containerSizes[size];

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1e293b);

    const camera = new THREE.PerspectiveCamera(50, dimensions.width / dimensions.height, 0.1, 1000);
    camera.position.set(0, 0.3, 5.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(dimensions.width, dimensions.height);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const group = new THREE.Group();
    scene.add(group);
    groupRef.current = group;

    // Head
    const headGeo = new THREE.SphereGeometry(0.5, 32, 32);
    const headMat = new THREE.MeshPhongMaterial({ color: 0xf4a460 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 1.65;
    group.add(head);

    // Eyes
    const eyeMat = new THREE.MeshPhongMaterial({ color: 0x1e293b });
    const eyeGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.15, 1.7, 0.42);
    group.add(leftEye);
    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.15, 1.7, 0.42);
    group.add(rightEye);

    // Mouth
    const mouthGeo = new THREE.BoxGeometry(0.15, 0.03, 0.01);
    const mouth = new THREE.Mesh(mouthGeo, eyeMat);
    mouth.position.set(0, 1.53, 0.45);
    group.add(mouth);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.12, 0.18, 0.15, 16);
    const neck = new THREE.Mesh(neckGeo, headMat);
    neck.position.y = 1.25;
    group.add(neck);

    // Arms (visible skin, no spheres at ends)
    const armGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.9, 12);
    const leftArm = new THREE.Mesh(armGeo, headMat);
    leftArm.position.set(-0.58, 0.5, 0);
    leftArm.rotation.z = -0.3;
    group.add(leftArm);
    const rightArm = new THREE.Mesh(armGeo, headMat);
    rightArm.position.set(0.58, 0.5, 0);
    rightArm.rotation.z = 0.3;
    group.add(rightArm);

    // Hands (small, subtle)
    const handGeo = new THREE.SphereGeometry(0.08, 10, 10);
    const leftHand = new THREE.Mesh(handGeo, headMat);
    leftHand.position.set(-0.72, 0.05, 0);
    group.add(leftHand);
    const rightHand = new THREE.Mesh(handGeo, headMat);
    rightHand.position.set(0.72, 0.05, 0);
    group.add(rightHand);

    // Legs (visible below clothing)
    const legGeo = new THREE.CylinderGeometry(0.1, 0.09, 0.5, 12);
    const leftLeg = new THREE.Mesh(legGeo, headMat);
    leftLeg.position.set(-0.22, -1.25, 0);
    group.add(leftLeg);
    const rightLeg = new THREE.Mesh(legGeo, headMat);
    rightLeg.position.set(0.22, -1.25, 0);
    group.add(rightLeg);

    // Head accessory
    if (character.head) {
      const headAccessory = createHeadAccessory(character.head);
      headAccessory.position.y = 1.65;
      group.add(headAccessory);
    }

    // Shirt
    if (character.shirt) {
      const shirt = createShirt(character.shirt);
      shirt.position.y = 0.4;
      group.add(shirt);
    } else {
      const bodyGeo = new THREE.BoxGeometry(0.8, 1.1, 0.45);
      const bodyMat = new THREE.MeshPhongMaterial({ color: 0x6366f1 });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.position.y = 0.4;
      group.add(body);
    }

    // Pants
    if (character.pants) {
      const pants = createPants(character.pants);
      pants.position.y = -0.55;
      group.add(pants);
    } else {
      const defaultPantsGeo = new THREE.BoxGeometry(0.85, 1.0, 0.45);
      const defaultPantsMat = new THREE.MeshPhongMaterial({ color: 0x374151 });
      const defaultPants = new THREE.Mesh(defaultPantsGeo, defaultPantsMat);
      defaultPants.position.y = -0.55;
      group.add(defaultPants);
    }

    // Feet
    if (character.feet) {
      const feet = createFeet(character.feet);
      feet.position.y = -1.6;
      group.add(feet);
    } else {
      const footGeo = new THREE.BoxGeometry(0.28, 0.15, 0.4);
      const footMat = new THREE.MeshPhongMaterial({ color: 0x1f2937 });
      const leftFoot = new THREE.Mesh(footGeo, footMat);
      leftFoot.position.set(-0.22, -1.65, 0.02);
      group.add(leftFoot);
      const rightFoot = new THREE.Mesh(footGeo, footMat);
      rightFoot.position.set(0.22, -1.65, 0.02);
      group.add(rightFoot);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(3, 5, 5);
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0x00ffff, 0.3);
    rimLight.position.set(-3, 2, 3);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x3b82f6, 0.2);
    fillLight.position.set(0, -2, 3);
    scene.add(fillLight);

    // Animation
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (groupRef.current) {
        groupRef.current.rotation.y = Math.sin(elapsed * 0.5) * 0.4;
        const breathe = 1 + Math.sin(elapsed * 2) * 0.01;
        groupRef.current.scale.set(breathe, breathe, breathe);
      }

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
  }, [dimensions, character.head, character.shirt, character.pants, character.feet]);

  return (
    <div
      ref={containerRef}
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
      }}
      className="rounded-2xl border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/20 overflow-hidden"
    />
  );
};
