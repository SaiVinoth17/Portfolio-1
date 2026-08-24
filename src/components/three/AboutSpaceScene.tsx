"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function AboutSpaceScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020508, 0.0018);

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 45);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Starfield particles
    const starCount = 1200;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const colorA = new THREE.Color(0x10b981);
    const colorB = new THREE.Color(0x06b6d4);
    const colorC = new THREE.Color(0xffffff);

    for (let i = 0; i < starCount; i++) {
      const idx = i * 3;
      starPos[idx] = (Math.random() - 0.5) * 160;
      starPos[idx + 1] = (Math.random() - 0.5) * 160;
      starPos[idx + 2] = (Math.random() - 0.5) * 140;

      const pick = Math.random();
      const col = pick > 0.6 ? colorA : pick > 0.3 ? colorB : colorC;
      starColors[idx] = col.r;
      starColors[idx + 1] = col.g;
      starColors[idx + 2] = col.b;
    }

    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // Concentric Gyro Orbital Rings
    const ringGroup = new THREE.Group();
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(18, 0.15, 16, 64), ringMat1);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(26, 0.15, 16, 64), ringMat2);
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(34, 0.15, 16, 64), ringMat1);

    ringGroup.add(ring1);
    ringGroup.add(ring2);
    ringGroup.add(ring3);
    ringGroup.position.set(0, 0, -10);
    scene.add(ringGroup);

    // Floating spatial nodes
    const nodeCount = 18;
    const nodeGeo = new THREE.SphereGeometry(0.6, 16, 16);
    const nodeMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const nodes: THREE.Mesh[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 22 + (i % 3) * 6;
      node.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        (Math.random() - 0.5) * 20
      );
      scene.add(node);
      nodes.push(node);
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      targetX = (e.clientX - halfW) * 0.015;
      targetY = (e.clientY - halfH) * 0.015;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });

    let scrollProgress = 0;
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1;
      scrollProgress = scrollY / maxScroll;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

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

      // Smooth mouse interpolation
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      camera.position.x = mouseX;
      camera.position.y = -mouseY;
      camera.position.z = 45 - scrollProgress * 15;
      camera.lookAt(0, 0, 0);

      // Rotate starfield and rings
      starPoints.rotation.y = elapsed * 0.02;
      starPoints.rotation.x = elapsed * 0.01;

      ring1.rotation.x = elapsed * 0.15;
      ring1.rotation.y = elapsed * 0.2;
      ring2.rotation.y = -elapsed * 0.12;
      ring2.rotation.z = elapsed * 0.1;
      ring3.rotation.x = elapsed * 0.08;
      ring3.rotation.z = -elapsed * 0.14;

      nodes.forEach((node, i) => {
        node.position.y += Math.sin(elapsed * 1.5 + i) * 0.02;
      });

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      isRunning = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      starGeo.dispose();
      starMat.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
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
