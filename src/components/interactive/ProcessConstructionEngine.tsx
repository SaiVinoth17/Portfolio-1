"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ProcessConstructionEngineProps {
  currentStage: number; // 0 to 5
}

export default function ProcessConstructionEngine({ currentStage }: ProcessConstructionEngineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef(currentStage);
  stageRef.current = currentStage;

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
    camera.position.set(0, 4, 22);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Dynamic Construction Layers
    const systemGroup = new THREE.Group();
    scene.add(systemGroup);

    // Layer 1: Base CAD Wireframe Grid (Always present, grows in intensity)
    const gridHelper = new THREE.GridHelper(24, 16, 0x10b981, 0x064e3b);
    gridHelper.position.y = -3;
    systemGroup.add(gridHelper);

    // Layer 2: Discovery Wireframe Box
    const boxGeo = new THREE.BoxGeometry(8, 5, 1);
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true });
    const wireMesh = new THREE.Mesh(boxGeo, wireMat);
    systemGroup.add(wireMesh);

    // Layer 3: Database Nodes & Conduits (Visible >= Stage 1)
    const dbNodesGroup = new THREE.Group();
    const nodeGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.5, 16);
    const dbMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true });
    for (let i = 0; i < 4; i++) {
      const cyl = new THREE.Mesh(nodeGeo, dbMat);
      cyl.position.set(-4 + i * 2.6, 1.5, -2);
      dbNodesGroup.add(cyl);
    }
    systemGroup.add(dbNodesGroup);

    // Layer 4: UI Component Blocks (Visible >= Stage 3)
    const uiBlocksGroup = new THREE.Group();
    const blockGeo = new THREE.PlaneGeometry(1.8, 1.2);
    const blockMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65,
    });
    for (let i = 0; i < 6; i++) {
      const p = new THREE.Mesh(blockGeo, blockMat);
      p.position.set(-2.5 + (i % 3) * 2.5, 0.5 - Math.floor(i / 3) * 1.6, 0.6);
      uiBlocksGroup.add(p);
    }
    systemGroup.add(uiBlocksGroup);

    // Layer 5: Operational Deployment Energy Halo (Visible Stage 5)
    const haloGeo = new THREE.TorusGeometry(6, 0.1, 16, 64);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.8,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.rotation.x = Math.PI / 2;
    halo.position.y = -2;
    systemGroup.add(halo);

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
      const stg = stageRef.current;

      // Construction Assembly Logic Based on Active Stage
      systemGroup.rotation.y = elapsed * 0.25;

      // Stage 0 (Discovery): Only Wireframe
      wireMesh.visible = stg >= 0;
      wireMesh.scale.set(1 + Math.sin(elapsed * 2) * 0.03, 1, 1);

      // Stage 1-2 (Architecture & Schema): Show Database Nodes
      dbNodesGroup.visible = stg >= 1;
      dbNodesGroup.children.forEach((c, idx) => {
        c.rotation.y = elapsed * 0.8 + idx;
      });

      // Stage 3-4 (Engineering & Motion): Assemble UI Component Blocks
      uiBlocksGroup.visible = stg >= 3;
      uiBlocksGroup.children.forEach((b, idx) => {
        b.position.z = 0.6 + Math.sin(elapsed * 3 + idx) * 0.1;
      });

      // Stage 5 (Live Deployment): Halo active & operational pulse
      halo.visible = stg === 5;
      if (halo.visible) {
        halo.scale.setScalar(1 + Math.sin(elapsed * 4) * 0.08);
      }

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
      boxGeo.dispose();
      wireMat.dispose();
      nodeGeo.dispose();
      dbMat.dispose();
      blockGeo.dispose();
      blockMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[320px] sm:h-[380px] rounded-3xl border border-emerald-500/30 overflow-hidden bg-black/80 shadow-2xl mb-8">
      <div ref={containerRef} className="w-full h-full" />
      <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-mono text-emerald-400 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>LIVE SOFTWARE CONSTRUCTION ENGINE // STAGE {stageRef.current + 1} OF 6</span>
      </div>
    </div>
  );
}
