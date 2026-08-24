"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function TechGraphScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 38);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Tech nodes data & positions
    const nodeCount = 28;
    const nodePositions: THREE.Vector3[] = [];
    const nodeColors = [0x10b981, 0x06b6d4, 0x3b82f6, 0x14b8a6, 0xa855f7];

    const group = new THREE.Group();
    scene.add(group);

    const nodeGeo = new THREE.IcosahedronGeometry(0.7, 1);
    const nodeMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const radius = 14 + (i % 4) * 2.5;

      const pos = new THREE.Vector3(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      );
      nodePositions.push(pos);

      const color = nodeColors[i % nodeColors.length];
      const mat = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.8,
      });

      const mesh = new THREE.Mesh(nodeGeo, mat);
      mesh.position.copy(pos);
      group.add(mesh);
      nodeMeshes.push(mesh);
    }

    // Connect nodes with line conduits
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });

    const linePoints: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 12) {
          linePoints.push(nodePositions[i], nodePositions[j]);
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
    const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
    group.add(lineSegments);

    // Ambient floating dust particles
    const dustCount = 400;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i++) {
      dustPos[i] = (Math.random() - 0.5) * 80;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.8,
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    scene.add(dustPoints);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });

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

      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      group.rotation.y = elapsed * 0.1 + mouseX * 0.6;
      group.rotation.x = mouseY * 0.4;

      nodeMeshes.forEach((mesh, idx) => {
        mesh.rotation.x = elapsed * 0.5 + idx;
        mesh.rotation.y = elapsed * 0.3 + idx;
        const scale = 1 + Math.sin(elapsed * 2 + idx) * 0.15;
        mesh.scale.set(scale, scale, scale);
      });

      dustPoints.rotation.y = elapsed * 0.02;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      isRunning = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      nodeGeo.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
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
