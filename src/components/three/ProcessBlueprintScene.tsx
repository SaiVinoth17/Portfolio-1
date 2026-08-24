"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ProcessBlueprintScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 12, 32);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Infinite CAD Blueprint Grids
    const gridHelper1 = new THREE.GridHelper(80, 40, 0x10b981, 0x064e3b);
    gridHelper1.position.y = -8;
    scene.add(gridHelper1);

    const gridHelper2 = new THREE.GridHelper(80, 20, 0x06b6d4, 0x083344);
    gridHelper2.position.y = 16;
    gridHelper2.rotation.x = Math.PI;
    scene.add(gridHelper2);

    // Scanning laser wireframe plane
    const scanGeo = new THREE.PlaneGeometry(60, 4);
    const scanMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const scanPlane = new THREE.Mesh(scanGeo, scanMat);
    scanPlane.rotation.x = Math.PI / 2;
    scene.add(scanPlane);

    // Floating blueprint geometric components
    const group = new THREE.Group();
    const boxMat = new THREE.MeshBasicMaterial({
      color: 0x14b8a6,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    const octGeo = new THREE.OctahedronGeometry(2);
    const boxGeo = new THREE.BoxGeometry(3, 3, 3);
    const torusGeo = new THREE.TorusGeometry(3, 0.4, 8, 32);

    const m1 = new THREE.Mesh(octGeo, boxMat);
    m1.position.set(-14, 2, -6);
    const m2 = new THREE.Mesh(boxGeo, boxMat);
    m2.position.set(0, 0, -8);
    const m3 = new THREE.Mesh(torusGeo, boxMat);
    m3.position.set(14, 2, -6);

    group.add(m1, m2, m3);
    scene.add(group);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    let isRunning = true;
    let rafId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!isRunning) return;
      const elapsed = clock.getElapsedTime();

      // Continuous blueprint grid movement
      gridHelper1.position.z = (elapsed * 3) % 2;
      gridHelper2.position.z = (elapsed * 3) % 4;

      // Laser scan oscillation
      scanPlane.position.z = Math.sin(elapsed * 1.2) * 16;

      // Rotate geometric wireframes
      m1.rotation.x = elapsed * 0.4;
      m1.rotation.y = elapsed * 0.6;
      m2.rotation.y = elapsed * 0.3;
      m2.rotation.z = elapsed * 0.2;
      m3.rotation.x = elapsed * 0.5;
      m3.rotation.y = elapsed * 0.3;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      isRunning = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      gridHelper1.dispose();
      gridHelper2.dispose();
      scanGeo.dispose();
      scanMat.dispose();
      boxMat.dispose();
      octGeo.dispose();
      boxGeo.dispose();
      torusGeo.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
      aria-hidden="true"
    />
  );
}
