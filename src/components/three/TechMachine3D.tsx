"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface TechMachine3DProps {
  activeTechId: string;
  onSelectTech: (id: string) => void;
  techNodes: Array<{ id: string; name: string; icon: string; category: string }>;
}

export default function TechMachine3D({ activeTechId, onSelectTech, techNodes }: TechMachine3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTechRef = useRef(activeTechId);
  activeTechRef.current = activeTechId;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.02);

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 24);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Mechanical Core Ring
    const coreGeo = new THREE.TorusGeometry(8, 0.2, 16, 64);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Interactive Tech Modules on the Machine Ring
    const moduleGroup = new THREE.Group();
    scene.add(moduleGroup);

    const moduleMeshes: THREE.Mesh[] = [];
    const moduleGeo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
    const count = techNodes.length;

    techNodes.forEach((node, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = 8;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      const mat = new THREE.MeshBasicMaterial({
        color: node.id === activeTechRef.current ? 0x10b981 : 0x06b6d4,
        wireframe: true,
        transparent: true,
        opacity: 0.8,
      });

      const mesh = new THREE.Mesh(moduleGeo, mat);
      mesh.position.set(x, y, 0);
      mesh.userData = { id: node.id, index: i, angle };
      moduleGroup.add(mesh);
      moduleMeshes.push(mesh);
    });

    // Connecting Conduits
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });
    const lineGeo = new THREE.BufferGeometry();
    const linePoints: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      const next = (i + 1) % count;
      linePoints.push(moduleMeshes[i].position, moduleMeshes[next].position);
    }
    lineGeo.setFromPoints(linePoints);
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    moduleGroup.add(lines);

    // Raycasting for direct module selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(moduleMeshes);

      if (intersects.length > 0) {
        const hitId = intersects[0].object.userData.id;
        if (hitId) {
          onSelectTech(hitId);
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

      // Find active module index
      const activeIdx = techNodes.findIndex((n) => n.id === activeTechRef.current);
      const targetAngle = activeIdx !== -1 ? -((activeIdx / count) * Math.PI * 2) + Math.PI / 2 : 0;

      // Smooth mechanical rotation to bring active module to front/top
      moduleGroup.rotation.z += (targetAngle - moduleGroup.rotation.z) * 0.05;
      coreMesh.rotation.z = moduleGroup.rotation.z;

      moduleMeshes.forEach((mesh) => {
        const isCurrent = mesh.userData.id === activeTechRef.current;
        const scale = isCurrent ? 1.4 + Math.sin(elapsed * 4) * 0.1 : 1.0;
        mesh.scale.set(scale, scale, scale);
        (mesh.material as THREE.MeshBasicMaterial).color.setHex(isCurrent ? 0x10b981 : 0x06b6d4);
        (mesh.material as THREE.MeshBasicMaterial).opacity = isCurrent ? 1.0 : 0.45;
        mesh.rotation.x = elapsed * 0.8;
        mesh.rotation.y = elapsed * 0.6;
      });

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
      coreGeo.dispose();
      coreMat.dispose();
      moduleGeo.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      renderer.dispose();
    };
  }, [onSelectTech, techNodes]);

  return (
    <div className="relative w-full h-[320px] sm:h-[400px] rounded-3xl border border-emerald-500/30 overflow-hidden bg-black/80 shadow-2xl mb-8">
      <div ref={containerRef} className="w-full h-full cursor-pointer" />
      <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-mono text-emerald-400 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>3D TECHNOLOGICAL MACHINE // CLICK MODULE TO INSPECT SUBSYSTEM</span>
      </div>
    </div>
  );
}
