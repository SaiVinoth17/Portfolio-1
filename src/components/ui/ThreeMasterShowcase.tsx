"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import {
  Play,
  Pause,
  RotateCcw,
  Sun,
  Moon,
  Flame,
  Layers,
  Activity,
  Sparkles,
  Maximize2,
  Minimize2,
  Box,
  Eye,
  Search,
  ExternalLink,
  BookOpen,
  Wrench,
  Compass,
  Sliders,
  Check,
  ChevronRight,
} from "lucide-react";
import {
  ALL_THREE_EXAMPLES,
  THREE_CATEGORIES,
  THREE_TOTAL_EXAMPLES,
  ThreeExampleItem,
} from "@/lib/data/threeExamplesData";

type MasterViewMode = "native-studio" | "live-example" | "all-examples" | "editor" | "docs" | "manual";
type NativeScene = "keyframe-metropolis" | "quantum-core" | "particle-field";
type LightingPreset = "daylight" | "cyberpunk" | "sunset";

const FEATURED_HIGHLIGHTS = [
  { id: "webgl_animation_keyframes", label: "Littlest Tokyo", category: "Animation" },
  { id: "webgl_shaders_ocean", label: "Ocean Water & Sky", category: "Shaders" },
  { id: "webgl_animation_skinning_blending", label: "Character Skinning", category: "Animation" },
  { id: "webgl_postprocessing_unreal_bloom", label: "Unreal Bloom", category: "Postprocessing" },
  { id: "physics_ammo_cloth", label: "Physics Cloth", category: "Physics" },
  { id: "webgl_materials_variations_physical", label: "PBR Physical", category: "Materials" },
  { id: "games_fps", label: "FPS 3D Octree", category: "Games" },
  { id: "webgl_instancing_performance", label: "Instanced Mesh", category: "Performance" },
  { id: "webgl_morphtargets_face", label: "Facial Morph", category: "Morph Targets" },
  { id: "webgl_materials_car", label: "Raycast Car", category: "Automotive" },
];

export default function ThreeMasterShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);

  // View Navigation
  const [viewMode, setViewMode] = useState<MasterViewMode>("native-studio");
  const [nativeScene, setNativeScene] = useState<NativeScene>("keyframe-metropolis");
  const [currentExample, setCurrentExample] = useState<ThreeExampleItem>({
    id: "webgl_animation_keyframes",
    title: "Animation Keyframes",
    category: "webgl",
    url: "https://threejs.org/examples/webgl_animation_keyframes.html",
  });

  // Example Explorer Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Native Studio States
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isWireframe, setIsWireframe] = useState(false);
  const [lighting, setLighting] = useState<LightingPreset>("daylight");
  const [fps, setFps] = useState(60);
  const [triangles, setTriangles] = useState(0);
  const [drawCalls, setDrawCalls] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [cameraPreset, setCameraPreset] = useState<"isometric" | "street" | "aerial">("isometric");

  const runtimeRef = useRef<{
    renderer?: THREE.WebGLRenderer;
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    controls?: OrbitControls;
    mixer?: THREE.AnimationMixer;
    clock?: THREE.Clock;
    model?: THREE.Group;
    quantumMesh?: THREE.Mesh;
    particles?: THREE.Points;
    dirLight?: THREE.DirectionalLight;
    ambientLight?: THREE.AmbientLight;
    pointLights: THREE.PointLight[];
    animationId?: number;
    materials: Map<THREE.Mesh, THREE.Material | THREE.Material[]>;
    statsFrames: number;
    lastStatsTime: number;
  }>({
    pointLights: [],
    materials: new Map(),
    statsFrames: 0,
    lastStatsTime: performance.now(),
  });

  // Filtered Examples
  const filteredExamples = useMemo(() => {
    return ALL_THREE_EXAMPLES.filter((item) => {
      const matchesCat = selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Handle Native 3D Studio Setup
  useEffect(() => {
    if (viewMode !== "native-studio") return;

    const container = containerRef.current;
    const mount = mountRef.current;
    if (!container || !mount) return;

    let isDisposed = false;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 600;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0c);
    const clock = new THREE.Clock();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(5, 2, 8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    mount.replaceChildren(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    scene.environment = pmremGenerator.fromScene(roomEnv).texture;
    roomEnv.dispose();

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.5, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.05;
    controls.minDistance = 2;
    controls.maxDistance = 20;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff5e6, 2.5);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const pointLight1 = new THREE.PointLight(0x00e5ff, 0, 10);
    pointLight1.position.set(-3, 2, 2);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff0077, 0, 10);
    pointLight2.position.set(3, 2, -2);
    scene.add(pointLight2);

    runtimeRef.current = {
      renderer,
      scene,
      camera,
      controls,
      clock,
      dirLight,
      ambientLight,
      pointLights: [pointLight1, pointLight2],
      materials: new Map(),
      statsFrames: 0,
      lastStatsTime: performance.now(),
    };

    if (nativeScene === "keyframe-metropolis") {
      setIsLoading(true);
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("/draco/gltf/");

      const loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);

      loader.load(
        "/models/gltf/LittlestTokyo.glb",
        (gltf) => {
          if (isDisposed) return;
          const model = gltf.scene;
          model.position.set(1, 1, 0);
          model.scale.set(0.01, 0.01, 0.01);
          scene.add(model);
          runtimeRef.current.model = model;

          model.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;
              runtimeRef.current.materials.set(mesh, mesh.material);
            }
          });

          const mixer = new THREE.AnimationMixer(model);
          if (gltf.animations && gltf.animations.length > 0) {
            mixer.clipAction(gltf.animations[0]).play();
          }
          runtimeRef.current.mixer = mixer;

          setIsLoading(false);
        },
        (xhr) => {
          if (xhr.total > 0) {
            setLoadingProgress(Math.round((xhr.loaded / xhr.total) * 100));
          }
        },
        () => setIsLoading(false)
      );
    } else if (nativeScene === "quantum-core") {
      setIsLoading(false);
      const geom = new THREE.TorusKnotGeometry(1.2, 0.35, 180, 32);
      const customMat = new THREE.ShaderMaterial({
        wireframe: isWireframe,
        uniforms: {
          uTime: { value: 0 },
          uColorA: { value: new THREE.Color(0x8a2be2) },
          uColorB: { value: new THREE.Color(0x00ffff) },
        },
        vertexShader: `
          uniform float uTime;
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            vNormal = normal;
            vPosition = position;
            vec3 pos = position;
            float wave = sin(pos.x * 2.0 + uTime * 2.0) * cos(pos.y * 2.0 + uTime * 2.0) * 0.15;
            pos += normal * wave;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.5);
            vec3 color = mix(uColorA, uColorB, sin(vPosition.y * 2.0 + uTime) * 0.5 + 0.5);
            gl_FragColor = vec4(color + vec3(fresnel * 0.8), 0.95);
          }
        `,
        transparent: true,
      });
      const mesh = new THREE.Mesh(geom, customMat);
      mesh.position.set(0, 0.5, 0);
      scene.add(mesh);
      runtimeRef.current.quantumMesh = mesh;
    } else if (nativeScene === "particle-field") {
      setIsLoading(false);
      const count = 6000;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const color1 = new THREE.Color(0x00ffff);
      const color2 = new THREE.Color(0xff00bb);

      for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const radius = 1.0 + Math.random() * 4.5;
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);
        const mixed = color1.clone().lerp(color2, Math.random());
        colors[i * 3] = mixed.r;
        colors[i * 3 + 1] = mixed.g;
        colors[i * 3 + 2] = mixed.b;
      }

      const pGeom = new THREE.BufferGeometry();
      pGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      pGeom.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      const pMat = new THREE.PointsMaterial({
        size: 0.04,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });
      const points = new THREE.Points(pGeom, pMat);
      points.position.set(0, 0.5, 0);
      scene.add(points);
      runtimeRef.current.particles = points;
    }

    const animate = () => {
      if (isDisposed) return;
      runtimeRef.current.animationId = requestAnimationFrame(animate);

      const delta = clock.getDelta();

      if (runtimeRef.current.mixer && isPlaying) {
        runtimeRef.current.mixer.update(delta * playbackSpeed);
      }

      if (runtimeRef.current.quantumMesh) {
        runtimeRef.current.quantumMesh.rotation.y += 0.01;
        runtimeRef.current.quantumMesh.rotation.x += 0.005;
        const mat = runtimeRef.current.quantumMesh.material as THREE.ShaderMaterial;
        if (mat.uniforms?.uTime) {
          mat.uniforms.uTime.value += delta;
        }
      }

      if (runtimeRef.current.particles) {
        runtimeRef.current.particles.rotation.y += 0.004;
        runtimeRef.current.particles.rotation.x += 0.002;
      }

      controls.update();
      renderer.render(scene, camera);

      const now = performance.now();
      runtimeRef.current.statsFrames++;
      if (now - runtimeRef.current.lastStatsTime >= 500) {
        setFps(
          Math.round((runtimeRef.current.statsFrames * 1000) / (now - runtimeRef.current.lastStatsTime))
        );
        setTriangles(renderer.info.render.triangles);
        setDrawCalls(renderer.info.render.calls);
        runtimeRef.current.statsFrames = 0;
        runtimeRef.current.lastStatsTime = now;
      }
    };

    animate();

    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      isDisposed = true;
      window.removeEventListener("resize", handleResize);
      if (runtimeRef.current.animationId) {
        cancelAnimationFrame(runtimeRef.current.animationId);
      }
      pmremGenerator.dispose();
      renderer.dispose();
      controls.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [viewMode, nativeScene]);

  // Wireframe toggle
  useEffect(() => {
    const { model, quantumMesh, materials } = runtimeRef.current;
    if (model) {
      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (isWireframe) {
            mesh.material = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x00ffff });
          } else {
            const original = materials.get(mesh);
            if (original) mesh.material = original;
          }
        }
      });
    }
    if (quantumMesh) {
      (quantumMesh.material as THREE.ShaderMaterial).wireframe = isWireframe;
    }
  }, [isWireframe]);

  // Lighting presets
  useEffect(() => {
    const { dirLight, ambientLight, pointLights, scene } = runtimeRef.current;
    if (!dirLight || !ambientLight || !scene) return;

    if (lighting === "daylight") {
      scene.background = new THREE.Color(0x0a0a0c);
      ambientLight.color.set(0xffffff);
      ambientLight.intensity = 1.2;
      dirLight.color.set(0xfff5e6);
      dirLight.intensity = 2.5;
      pointLights[0].intensity = 0;
      pointLights[1].intensity = 0;
    } else if (lighting === "cyberpunk") {
      scene.background = new THREE.Color(0x05030a);
      ambientLight.color.set(0x331166);
      ambientLight.intensity = 0.8;
      dirLight.color.set(0x8822ff);
      dirLight.intensity = 1.0;
      pointLights[0].intensity = 8;
      pointLights[1].intensity = 8;
    } else if (lighting === "sunset") {
      scene.background = new THREE.Color(0x1a090d);
      ambientLight.color.set(0xff8866);
      ambientLight.intensity = 1.0;
      dirLight.color.set(0xff4422);
      dirLight.intensity = 3.0;
      pointLights[0].intensity = 2;
      pointLights[1].intensity = 0;
    }
  }, [lighting]);

  const setCameraView = (preset: "isometric" | "street" | "aerial") => {
    setCameraPreset(preset);
    const { camera, controls } = runtimeRef.current;
    if (!camera || !controls) return;

    if (preset === "isometric") {
      camera.position.set(5, 2, 8);
      controls.target.set(0, 0.5, 0);
    } else if (preset === "street") {
      camera.position.set(1.5, 0.8, 2.5);
      controls.target.set(0.5, 0.6, 0);
    } else if (preset === "aerial") {
      camera.position.set(0, 8, 4);
      controls.target.set(0, 0, 0);
    }
    controls.update();
  };

  const launchExample = (item: ThreeExampleItem) => {
    setCurrentExample(item);
    setViewMode("live-example");
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`w-full relative overflow-hidden bg-black select-none transition-all duration-300 ${
        isFullscreen ? "h-screen" : "h-[80vh] sm:h-[88vh]"
      } flex flex-col`}
    >
      {/* 1. MASTER HEADER NAVIGATION */}
      <div className="z-30 bg-zinc-950/90 backdrop-blur-md border-b border-white/10 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Left: View Mode Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-white/10 overflow-x-auto max-w-full">
          <button
            onClick={() => setViewMode("native-studio")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              viewMode === "native-studio"
                ? "bg-purple-600 text-white font-bold shadow-lg"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Box size={13} />
            <span>Native Studio</span>
          </button>

          <button
            onClick={() => setViewMode("all-examples")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              viewMode === "all-examples"
                ? "bg-purple-600 text-white font-bold shadow-lg"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Compass size={13} />
            <span>All 588 Examples</span>
            <span className="px-1.5 py-0.2 rounded bg-purple-400/20 text-purple-300 text-[10px] font-extrabold">
              588
            </span>
          </button>

          <button
            onClick={() => setViewMode("editor")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              viewMode === "editor"
                ? "bg-purple-600 text-white font-bold shadow-lg"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Wrench size={13} />
            <span>3D Editor</span>
          </button>

          <button
            onClick={() => setViewMode("docs")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              viewMode === "docs"
                ? "bg-purple-600 text-white font-bold shadow-lg"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <BookOpen size={13} />
            <span>API Docs</span>
          </button>

          <button
            onClick={() => setViewMode("manual")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              viewMode === "manual"
                ? "bg-purple-600 text-white font-bold shadow-lg"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Sliders size={13} />
            <span>Manual</span>
          </button>
        </div>

        {/* Right: Master Status & Fullscreen */}
        <div className="flex items-center gap-3 font-mono text-xs text-zinc-400">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-bold">THREE.JS 0.185 MASTER</span>
            <span className="text-zinc-600">·</span>
            <span className="text-cyan-400">588 EXAMPLES ACTIVE</span>
          </div>

          <a
            href={
              viewMode === "editor"
                ? "https://threejs.org/editor/"
                : viewMode === "docs"
                ? "https://threejs.org/docs/"
                : viewMode === "manual"
                ? "https://threejs.org/manual/"
                : viewMode === "live-example"
                ? currentExample.url
                : "https://threejs.org/examples/"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            title="Open Current Environment in New Tab"
          >
            <ExternalLink size={14} />
          </a>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            title="Toggle Fullscreen View"
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>

      {/* 2. CURATED TOP QUICK-LAUNCH BAR */}
      <div className="z-20 bg-zinc-950/60 backdrop-blur-md border-b border-white/5 px-4 py-2 flex items-center gap-2 overflow-x-auto text-[11px] font-mono no-scrollbar">
        <span className="text-purple-400 font-bold uppercase tracking-wider text-[10px] shrink-0 mr-1 flex items-center gap-1">
          <Sparkles size={12} /> Highlights:
        </span>
        {FEATURED_HIGHLIGHTS.map((item) => {
          const isSelected = viewMode === "live-example" && currentExample.id === item.id;
          return (
            <button
              key={item.id}
              onClick={() =>
                launchExample({
                  id: item.id,
                  title: item.label,
                  category: item.category,
                  url: `https://threejs.org/examples/${item.id}.html`,
                })
              }
              className={`shrink-0 px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                isSelected
                  ? "bg-purple-500/30 text-purple-300 border border-purple-500/50 font-bold"
                  : "bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5"
              }`}
            >
              <span>{item.label}</span>
              <span className="text-[9px] text-zinc-500">[{item.category}]</span>
            </button>
          );
        })}
      </div>

      {/* 3. MAIN CONTENT STAGE */}
      <div className="flex-1 relative w-full overflow-hidden">
        {/* VIEW 1: NATIVE THREE.JS STUDIO */}
        {viewMode === "native-studio" && (
          <div className="w-full h-full relative">
            <div ref={mountRef} className="absolute inset-0 w-full h-full z-0" />

            {/* Loading Indicator */}
            {isLoading && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md text-white font-mono text-xs space-y-4">
                <div className="w-12 h-12 rounded-full border-2 border-purple-500/20 border-t-purple-400 animate-spin" />
                <div className="text-center space-y-1">
                  <div className="text-purple-400 font-bold tracking-wider">
                    LOADING THREE.JS MASTER ASSETS
                  </div>
                  <div className="text-zinc-500 text-[11px]">
                    Draco WASM Decompressor: {loadingProgress}%
                  </div>
                </div>
                <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-200"
                    style={{ width: `${Math.max(5, loadingProgress)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Native Scene Switcher Tabs (Metropolis, Quantum Shader, Particle Nexus) */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-1 p-1 rounded-xl bg-zinc-950/80 backdrop-blur-md border border-white/10 shadow-2xl">
              <button
                onClick={() => setNativeScene("keyframe-metropolis")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  nativeScene === "keyframe-metropolis"
                    ? "bg-purple-600/30 text-purple-300 border border-purple-500/40 shadow"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Box size={13} />
                <span>Littlest Tokyo (GLTF)</span>
              </button>
              <button
                onClick={() => setNativeScene("quantum-core")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  nativeScene === "quantum-core"
                    ? "bg-purple-600/30 text-purple-300 border border-purple-500/40 shadow"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Sparkles size={13} />
                <span>Quantum Shader Core</span>
              </button>
              <button
                onClick={() => setNativeScene("particle-field")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  nativeScene === "particle-field"
                    ? "bg-purple-600/30 text-purple-300 border border-purple-500/40 shadow"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Activity size={13} />
                <span>Particle Nexus</span>
              </button>
            </div>

            {/* Real-time Performance HUD */}
            <div className="absolute top-4 right-4 z-20 hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-zinc-950/80 backdrop-blur-md border border-white/10 font-mono text-[11px] text-zinc-400 shadow-2xl">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-white font-bold">{fps}</span> FPS
              </div>
              <span className="text-zinc-700">|</span>
              <div>
                <span className="text-zinc-300 font-bold">{triangles.toLocaleString()}</span> TRIS
              </div>
              <span className="text-zinc-700">|</span>
              <div>
                <span className="text-cyan-400 font-bold">{drawCalls}</span> CALLS
              </div>
            </div>

            {/* Bottom Controls Dock */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
              <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-zinc-950/80 backdrop-blur-md border border-white/10 pointer-events-auto shadow-2xl">
                {nativeScene === "keyframe-metropolis" && (
                  <>
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                      title={isPlaying ? "Pause Animation" : "Play Animation"}
                    >
                      {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                    </button>
                    <div className="flex items-center gap-1 px-1 text-xs font-mono">
                      {[0.5, 1, 2].map((spd) => (
                        <button
                          key={spd}
                          onClick={() => setPlaybackSpeed(spd)}
                          className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${
                            playbackSpeed === spd
                              ? "bg-purple-500 text-black"
                              : "text-zinc-400 hover:text-white"
                          }`}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>
                    <div className="w-[1px] h-4 bg-white/10 mx-1" />
                  </>
                )}

                <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400">
                  <Eye size={12} className="text-zinc-500 ml-1" />
                  {(["isometric", "street", "aerial"] as const).map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setCameraView(preset)}
                      className={`px-2 py-1 rounded capitalize text-[10px] transition-all ${
                        cameraPreset === preset
                          ? "bg-white/15 text-white font-bold"
                          : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCameraView("isometric")}
                  className="p-2 rounded-lg text-zinc-400 hover:text-white transition-colors ml-1"
                  title="Reset Camera View"
                >
                  <RotateCcw size={13} />
                </button>
              </div>

              <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-zinc-950/80 backdrop-blur-md border border-white/10 pointer-events-auto shadow-2xl">
                <div className="flex items-center gap-1 px-1">
                  <button
                    onClick={() => setLighting("daylight")}
                    className={`p-1.5 rounded-lg transition-colors ${
                      lighting === "daylight"
                        ? "bg-amber-500/20 text-amber-300"
                        : "text-zinc-400 hover:text-white"
                    }`}
                    title="Daylight Lighting"
                  >
                    <Sun size={14} />
                  </button>
                  <button
                    onClick={() => setLighting("cyberpunk")}
                    className={`p-1.5 rounded-lg transition-colors ${
                      lighting === "cyberpunk"
                        ? "bg-cyan-500/20 text-cyan-300"
                        : "text-zinc-400 hover:text-white"
                    }`}
                    title="Cyberpunk Neon Mode"
                  >
                    <Moon size={14} />
                  </button>
                  <button
                    onClick={() => setLighting("sunset")}
                    className={`p-1.5 rounded-lg transition-colors ${
                      lighting === "sunset"
                        ? "bg-orange-500/20 text-orange-300"
                        : "text-zinc-400 hover:text-white"
                    }`}
                    title="Golden Sunset Mode"
                  >
                    <Flame size={14} />
                  </button>
                </div>

                <div className="w-[1px] h-4 bg-white/10" />

                <button
                  onClick={() => setIsWireframe(!isWireframe)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-mono transition-all ${
                    isWireframe
                      ? "bg-cyan-500/30 text-cyan-300 border border-cyan-500/40"
                      : "text-zinc-400 hover:text-white"
                  }`}
                  title="Toggle Wireframe Rendering"
                >
                  <Layers size={13} />
                  <span className="hidden sm:inline">Wireframe</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: LIVE RUNNING THREE.JS MASTER EXAMPLE */}
        {viewMode === "live-example" && (
          <div className="w-full h-full relative flex flex-col bg-black">
            <div className="px-4 py-2 bg-zinc-950/80 border-b border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="text-purple-400 font-bold">{currentExample.title}</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-zinc-400">
                  {currentExample.category}
                </span>
                <span className="text-zinc-600 text-[10px]">({currentExample.id}.html)</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={currentExample.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] text-cyan-400 hover:underline"
                >
                  <span>Open Fullscreen</span>
                  <ExternalLink size={12} />
                </a>
                <button
                  onClick={() => setViewMode("all-examples")}
                  className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[11px] transition-colors"
                >
                  Browse All 588
                </button>
              </div>
            </div>
            <iframe
              src={currentExample.url}
              className="w-full flex-1 border-0"
              title={currentExample.title}
              allow="accelerometer; autoplay; camera; gyroscope; vr; xr; xr-spatial-tracking"
            />
          </div>
        )}

        {/* VIEW 3: ALL 588 EXAMPLES DIRECTORY & SEARCH */}
        {viewMode === "all-examples" && (
          <div className="w-full h-full bg-zinc-950 flex flex-col overflow-hidden text-white font-mono">
            {/* Search & Category Filter Header */}
            <div className="p-4 border-b border-white/10 bg-zinc-900/50 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search 588 official Three.js master examples..."
                    className="w-full bg-black/60 border border-white/15 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-purple-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-white"
                    >
                      ×
                    </button>
                  )}
                </div>

                <div className="text-xs text-zinc-400">
                  Showing <span className="text-purple-400 font-bold">{filteredExamples.length}</span> of{" "}
                  <span className="text-white font-bold">{THREE_TOTAL_EXAMPLES}</span> examples
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-3 py-1 rounded-lg transition-all shrink-0 ${
                    selectedCategory === "all"
                      ? "bg-purple-600 text-white font-bold shadow"
                      : "bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5"
                  }`}
                >
                  All ({THREE_TOTAL_EXAMPLES})
                </button>
                {THREE_CATEGORIES.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`px-3 py-1 rounded-lg transition-all shrink-0 ${
                      selectedCategory === cat.name
                        ? "bg-purple-600 text-white font-bold shadow"
                        : "bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5"
                    }`}
                  >
                    {cat.name} ({cat.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Examples */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredExamples.map((item) => (
                <div
                  key={item.id}
                  onClick={() => launchExample(item)}
                  className="group p-3 rounded-xl bg-black/50 border border-white/10 hover:border-purple-500/50 hover:bg-purple-950/20 transition-all cursor-pointer flex flex-col justify-between space-y-2 shadow-lg hover:-translate-y-0.5 duration-150"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-zinc-500">
                      <span className="uppercase tracking-wider">{item.category}</span>
                      <span className="group-hover:text-purple-400 transition-colors">Launch ↗</span>
                    </div>
                    <div className="text-xs font-bold text-zinc-200 group-hover:text-purple-300 transition-colors line-clamp-1">
                      {item.title}
                    </div>
                  </div>
                  <div className="text-[10px] text-zinc-600 truncate">{item.id}.html</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: OFFICIAL 3D SCENE EDITOR */}
        {viewMode === "editor" && (
          <div className="w-full h-full flex flex-col bg-black">
            <div className="px-4 py-2 bg-zinc-950/80 border-b border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="text-purple-400 font-bold">Three.js Official 3D Scene Editor</span>
              <a
                href="https://threejs.org/editor/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] text-cyan-400 hover:underline"
              >
                <span>Pop Out Editor</span>
                <ExternalLink size={12} />
              </a>
            </div>
            <iframe
              src="https://threejs.org/editor/"
              className="w-full flex-1 border-0"
              title="Three.js 3D Editor"
            />
          </div>
        )}

        {/* VIEW 5: OFFICIAL API DOCUMENTATION */}
        {viewMode === "docs" && (
          <div className="w-full h-full flex flex-col bg-black">
            <div className="px-4 py-2 bg-zinc-950/80 border-b border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="text-purple-400 font-bold">Three.js Master API Reference & Documentation</span>
              <a
                href="https://threejs.org/docs/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] text-cyan-400 hover:underline"
              >
                <span>Open in Fullscreen Tab</span>
                <ExternalLink size={12} />
              </a>
            </div>
            <iframe
              src="https://threejs.org/docs/"
              className="w-full flex-1 border-0"
              title="Three.js Documentation"
            />
          </div>
        )}

        {/* VIEW 6: OFFICIAL MANUAL */}
        {viewMode === "manual" && (
          <div className="w-full h-full flex flex-col bg-black">
            <div className="px-4 py-2 bg-zinc-950/80 border-b border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="text-purple-400 font-bold">Three.js Official Tutorials & Manual</span>
              <a
                href="https://threejs.org/manual/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] text-cyan-400 hover:underline"
              >
                <span>Open in Fullscreen Tab</span>
                <ExternalLink size={12} />
              </a>
            </div>
            <iframe
              src="https://threejs.org/manual/"
              className="w-full flex-1 border-0"
              title="Three.js Manual"
            />
          </div>
        )}
      </div>
    </div>
  );
}
