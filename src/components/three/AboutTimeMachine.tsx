"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface AboutTimeMachineProps {
  activeEra: number;
  onSelectEra: (index: number) => void;
}

export default function AboutTimeMachine({ activeEra, onSelectEra }: AboutTimeMachineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeEraRef = useRef(activeEra);

  useEffect(() => {
    activeEraRef.current = activeEra;
  }, [activeEra]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.015);

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Camera waypoint trajectory corresponding to the 3 eras
    const waypoints = [
      { camPos: new THREE.Vector3(0, 2, 28), lookAt: new THREE.Vector3(0, 0, 0) },
      { camPos: new THREE.Vector3(12, 4, 18), lookAt: new THREE.Vector3(4, 0, -5) },
      { camPos: new THREE.Vector3(-14, 6, 8), lookAt: new THREE.Vector3(-4, 0, -10) },
    ];

    camera.position.copy(waypoints[0].camPos);

    // Temporal Conduit Geometry (Time Spline Tunnel)
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 25),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(8, 2, -15),
      new THREE.Vector3(-8, 4, -30),
      new THREE.Vector3(0, 6, -45),
    ]);

    const tubeGeo = new THREE.TubeGeometry(curve, 64, 2.5, 8, false);
    const tubeMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
    scene.add(tubeMesh);

    // 3 Spatial Era Artifacts (Interactive 3D Milestone Spheres)
    const eraPositions = [
      new THREE.Vector3(0, 0, 8),      // Era 03: 2024-Present
      new THREE.Vector3(6, 1, -8),     // Era 02: 2023-2024
      new THREE.Vector3(-6, 3, -22),   // Era 01: 2022-2023
    ];

    const eraNodes: THREE.Group[] = [];
    const sphereGeo = new THREE.IcosahedronGeometry(1.8, 2);

    eraPositions.forEach((pos, idx) => {
      const eraGroup = new THREE.Group();
      eraGroup.position.copy(pos);

      // Core mesh
      const mat = new THREE.MeshBasicMaterial({
        color: idx === 0 ? 0x10b981 : idx === 1 ? 0x06b6d4 : 0x3b82f6,
        wireframe: true,
        transparent: true,
        opacity: 0.7,
      });
      const mesh = new THREE.Mesh(sphereGeo, mat);
      eraGroup.add(mesh);

      // Orbital Gyro Ring
      const ringGeo = new THREE.TorusGeometry(3.2, 0.08, 16, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: idx === 0 ? 0x34d399 : idx === 1 ? 0x22d3ee : 0x60a5fa,
        transparent: true,
        opacity: 0.4,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      eraGroup.add(ring);

      scene.add(eraGroup);
      eraNodes.push(eraGroup);
    });

    // Raycasting for direct 3D artifact clicking
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(eraNodes, true);

      if (intersects.length > 0) {
        let hitGroup: THREE.Group | null = null;
        let parent = intersects[0].object.parent;
        while (parent && parent !== scene) {
          if (eraNodes.includes(parent as THREE.Group)) {
            hitGroup = parent as THREE.Group;
            break;
          }
          parent = parent.parent;
        }
        if (hitGroup) {
          const hitIdx = eraNodes.indexOf(hitGroup);
          if (hitIdx !== -1) {
            onSelectEra(hitIdx);
          }
        }
      }
    };

    container.addEventListener("click", handleClick);

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
      const currentActive = activeEraRef.current;
      const targetWaypoint = waypoints[currentActive] || waypoints[0];

      // Smooth camera spline interpolation to active era waypoint
      camera.position.lerp(targetWaypoint.camPos, 0.04);
      camera.lookAt(targetWaypoint.lookAt);

      // Spin orbital rings and pulse active milestone
      eraNodes.forEach((nodeGroup, idx) => {
        const ring = nodeGroup.children[1] as THREE.Mesh;
        const sphere = nodeGroup.children[0] as THREE.Mesh;

        ring.rotation.x = elapsed * (0.8 + idx * 0.2);
        ring.rotation.y = elapsed * (0.5 + idx * 0.3);
        sphere.rotation.y = elapsed * 0.4;

        if (idx === currentActive) {
          const pulse = 1 + Math.sin(elapsed * 3) * 0.12;
          nodeGroup.scale.set(pulse, pulse, pulse);
          (sphere.material as THREE.MeshBasicMaterial).opacity = 0.95;
        } else {
          nodeGroup.scale.lerp(new THREE.Vector3(0.75, 0.75, 0.75), 0.05);
          (sphere.material as THREE.MeshBasicMaterial).opacity = 0.35;
        }
      });

      tubeMesh.rotation.z = elapsed * 0.05;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      isRunning = false;
      cancelAnimationFrame(rafId);
      container.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      tubeGeo.dispose();
      tubeMat.dispose();
      sphereGeo.dispose();
      renderer.dispose();
    };
  }, [onSelectEra]);

  return (
    <div className="relative w-full h-[340px] sm:h-[420px] rounded-3xl border border-emerald-500/30 overflow-hidden bg-black/80 shadow-2xl">
      <div ref={containerRef} className="w-full h-full cursor-pointer" />
      <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-mono text-emerald-400 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>SPATIAL TIME CONTINUUM // CLICK 3D ARTIFACT TO TRAVEL</span>
      </div>
    </div>
  );
}
