"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ContactVortexScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 36);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Neural Particle Vortex
    const count = 1600;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const originalAngles = new Float32Array(count);
    const radii = new Float32Array(count);

    const col1 = new THREE.Color(0x10b981);
    const col2 = new THREE.Color(0x06b6d4);
    const col3 = new THREE.Color(0x38bdf8);

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const radius = 2 + Math.pow(Math.random(), 1.5) * 24;
      const angle = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.5) * 30;

      radii[i] = radius;
      originalAngles[i] = angle;

      positions[idx] = Math.cos(angle) * radius;
      positions[idx + 1] = Math.sin(angle) * radius;
      positions[idx + 2] = z;

      const pick = radius / 26;
      const col = pick < 0.5 ? col1.clone().lerp(col2, pick * 2) : col2.clone().lerp(col3, (pick - 0.5) * 2);
      colors[idx] = col.r;
      colors[idx + 1] = col.g;
      colors[idx + 2] = col.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const vortex = new THREE.Points(geometry, material);
    scene.add(vortex);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 1.5;
      targetY = (e.clientY / window.innerHeight - 0.5) * 1.5;
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

      vortex.rotation.z = elapsed * 0.12;
      vortex.rotation.x = mouseY * 0.5;
      vortex.rotation.y = mouseX * 0.5;

      const pos = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const idx = i * 3;
        const currentAngle = originalAngles[i] + elapsed * (0.3 + 12 / (radii[i] + 4));
        pos[idx] = Math.cos(currentAngle) * radii[i];
        pos[idx + 1] = Math.sin(currentAngle) * radii[i];
      }
      geometry.attributes.position.needsUpdate = true;

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
      geometry.dispose();
      material.dispose();
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
