"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Compass, MapPin, Mountain } from "lucide-react";

interface Waypoint {
  id: string;
  name: string;
  altitude: string;
  coords: string;
  pos: [number, number, number];
}

const WAYPOINTS: Waypoint[] = [
  { id: "doddabetta", name: "Doddabetta Peak", altitude: "2,637m MSL", coords: "11.4014° N, 76.7356° E", pos: [0, 3.5, 0] },
  { id: "ooty", name: "Ooty Valley Lake", altitude: "2,240m MSL", coords: "11.4102° N, 76.6950° E", pos: [-6, 1.2, 4] },
  { id: "avalanche", name: "Avalanche Sanctuary", altitude: "2,150m MSL", coords: "11.3001° N, 76.5900° E", pos: [6, 1.0, -5] },
  { id: "coonoor", name: "Coonoor Tea Slopes", altitude: "1,850m MSL", coords: "11.3530° N, 76.7959° E", pos: [8, 0.5, 5] },
];

export default function GeoTerrainEngine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeWp, setActiveWp] = useState<Waypoint>(WAYPOINTS[0]);
  const activeWpRef = useRef(activeWp);

  useEffect(() => {
    activeWpRef.current = activeWp;
  }, [activeWp]);

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
    camera.position.set(0, 14, 22);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Procedural Topographic Elevation Mesh
    const gridX = 40;
    const gridY = 40;
    const terrainGeo = new THREE.PlaneGeometry(28, 28, gridX, gridY);
    terrainGeo.rotateX(-Math.PI / 2);

    const pos = terrainGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const dist = Math.sqrt(x * x + z * z);
      const elevation = Math.cos(dist * 0.3) * 2.8 + Math.sin(x * 0.5) * Math.cos(z * 0.5) * 1.5;
      pos.setY(i, Math.max(0, elevation));
    }
    terrainGeo.computeVertexNormals();

    const terrainMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    scene.add(terrainMesh);

    // Target Elevation Marker Pin
    const markerGeo = new THREE.ConeGeometry(0.6, 1.6, 8);
    const markerMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const markerMesh = new THREE.Mesh(markerGeo, markerMat);
    markerMesh.rotation.x = Math.PI;
    scene.add(markerMesh);

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
      const current = activeWpRef.current;

      // Slow orbital terrain rotation
      terrainMesh.rotation.y = elapsed * 0.08;

      // Marker animation on active waypoint
      const targetPos = new THREE.Vector3(...current.pos);
      markerMesh.position.lerp(
        new THREE.Vector3(targetPos.x, targetPos.y + 1.2 + Math.sin(elapsed * 4) * 0.3, targetPos.z),
        0.08
      );

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
      terrainGeo.dispose();
      terrainMat.dispose();
      markerGeo.dispose();
      markerMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="p-6 rounded-3xl bg-zinc-950 border border-emerald-500/30 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
          <Mountain size={16} /> NILGIRIS TOPOGRAPHIC ELEVATION ENGINE
        </div>
        <span className="text-xs font-mono text-zinc-400">Click waypoint to calibrate telemetry</span>
      </div>

      {/* 3D Topographic Terrain Canvas */}
      <div className="relative h-[280px] rounded-2xl overflow-hidden bg-black border border-white/10">
        <div ref={containerRef} className="w-full h-full" />
        <div className="absolute bottom-3 left-3 bg-black/80 px-3 py-1.5 rounded-xl border border-white/10 text-xs font-mono text-cyan-400">
          ALTITUDE: <span className="text-white font-bold">{activeWp.altitude}</span> • COORDS: {activeWp.coords}
        </div>
      </div>

      {/* Interactive Waypoint Selectors */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {WAYPOINTS.map((wp) => {
          const isActive = activeWp.id === wp.id;
          return (
            <button
              key={wp.id}
              onClick={() => setActiveWp(wp)}
              className={`p-3 rounded-2xl border text-left font-mono text-xs transition-all cursor-pointer ${
                isActive
                  ? "bg-emerald-500 text-black font-bold border-emerald-400"
                  : "bg-zinc-900 border-white/10 text-zinc-400 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <MapPin size={12} />
                <span className="truncate">{wp.name}</span>
              </div>
              <span className="text-[10px] block opacity-80">{wp.altitude}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
