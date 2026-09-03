export interface LabExperiment {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  category: "GLSL Shader" | "3D Hardware" | "Physics & Dynamics" | "Kinetic Typography" | "Fluid Simulation";
  renderer: "Three.js (WebGL)" | "Custom GLSL Fragment" | "Canvas 2D GPU";
  status: "PUBLISHED" | "DRAFT";
  performanceProfile: string;
  mobileSupport: "Fully Responsive" | "Optimized Fallback" | "Hardware Accelerated";
  description: string;
  technicalDetails: string[];
  controls: string[];
}

export const LAB_EXPERIMENTS: LabExperiment[] = [
  {
    slug: "threejs-master",
    title: "Three.js Master · Complete 588 Examples & 3D Suite",
    subtitle: "Official Three.js Master build featuring all 588 examples, 3D Editor, API Documentation, and Keyframe Metropolis",
    image: "/images/lab/threejs-master.jpg",
    category: "3D Hardware",
    renderer: "Three.js (WebGL)",
    status: "PUBLISHED",
    performanceProfile: "All 588 examples, DRACOLoader WASM decompression, AnimationMixer, ACES Filmic tonemapping",
    mobileSupport: "Fully Responsive",
    description:
      "Full integration of the Three.js master repository: searchable directory of all 588 official WebGL, WebGPU, physics, shader, and animation examples, live 3D Scene Editor, complete API documentation, and native Draco keyframe studio.",
    technicalDetails: [
      "Complete official catalog of 588 Three.js Master examples (WebGL, WebGPU, Postprocessing, Physics, WebXR, Games)",
      "Live embedded Three.js 3D Scene Editor with scene graph inspection and material editors",
      "Full searchable Three.js API Reference and interactive manual tutorials",
      "Native WebGL Keyframe Metropolis studio with local Draco WASM decoding and AnimationMixer",
      "Dynamic lighting presets, wireframe modes, camera presets, and real-time GPU diagnostics",
    ],
    controls: [
      "Top Navigation Bar: Switch between Native Studio, All 588 Examples, 3D Editor, API Docs, and Manual",
      "Quick Highlights Bar: Instantly launch top demos (Littlest Tokyo, Ocean Shaders, Ammo Physics Cloth, Unreal Bloom, FPS Game)",
      "Search Bar: Filter all 588 examples by keyword, category, or module name",
      "Left Click / Touch Drag: Orbit and interact with any live 3D scene",
      "Lighting & Wireframe Buttons: Customize rendering modes and time-of-day illumination",
    ],
  },
  {
    slug: "macbook-neo",
    title: "MacBook Neo 3D",
    subtitle: "Hardware-accelerated photorealistic device model",
    image: "/images/lab/macbook-neo.jpg",
    category: "3D Hardware",
    renderer: "Three.js (WebGL)",
    status: "PUBLISHED",
    performanceProfile: "Adaptive DPR (1.0–1.5), instanced PBR materials, clamped shadow maps",
    mobileSupport: "Fully Responsive",
    description:
      "A cinematic 3D laptop inspection canvas featuring dynamic directional illumination, metallic roughness reflections, and smooth orbit damping.",
    technicalDetails: [
      "Physically Based Rendering (PBR) metallic surface shaders",
      "Dynamic procedural lighting with smooth ambient occlusion",
      "Orbit control damping with inertial deceleration",
      "Touch gesture camera manipulation for mobile devices",
    ],
    controls: ["Left click / Touch drag to orbit", "Scroll wheel / Pinch to zoom", "Right click to pan"],
  },
  {
    slug: "molten-metal",
    title: "Molten Metal Shader",
    subtitle: "Real-time liquid chrome surface deformation",
    image: "/images/lab/molten-metal.jpg",
    category: "GLSL Shader",
    renderer: "Custom GLSL Fragment",
    status: "PUBLISHED",
    performanceProfile: "High-efficiency fragment pass, GPU math calculation, zero CPU physics overhead",
    mobileSupport: "Hardware Accelerated",
    description:
      "A fluid metallic simulation utilizing custom GLSL noise algorithms to compute iridescent light scattering across liquid mercury topologies.",
    technicalDetails: [
      "Simplex 3D procedural noise matrix in GLSL fragment shader",
      "Custom specular reflections with chromatic aberration",
      "Real-time mouse pointer repulsion vector tracking",
      "Automatic framerate degradation protection on low-power mode",
    ],
    controls: ["Move cursor across canvas to induce surface ripples", "Touch & drag on mobile"],
  },
  {
    slug: "scroll-morph",
    title: "Scroll Morph Kinetic Engine",
    subtitle: "Inertial scroll-driven geometric topology deformation",
    image: "/images/lab/scroll-morph.jpg",
    category: "Kinetic Typography",
    renderer: "Three.js (WebGL)",
    status: "PUBLISHED",
    performanceProfile: "Decoupled scroll observation via GSAP ScrollTrigger, zero layout thrashing",
    mobileSupport: "Fully Responsive",
    description:
      "A multi-dimensional mesh deformation system linked directly to browser scroll velocity, transforming geometric primitives into organic forms.",
    technicalDetails: [
      "Vertex position interpolation based on normalized scroll delta",
      "GSAP ScrollTrigger sync with sub-pixel interpolation",
      "Wireframe and solid surface dual-pass rendering",
      "Respects prefers-reduced-motion with static isometric view",
    ],
    controls: ["Scroll viewport vertically to trigger mesh morphing"],
  },
  {
    slug: "ballpit",
    title: "Ballpit Matter Simulation",
    subtitle: "Interactive 2D/3D rigid body collision matrix",
    image: "/images/lab/ballpit.jpg",
    category: "Physics & Dynamics",
    renderer: "Canvas 2D GPU",
    status: "PUBLISHED",
    performanceProfile: "Sub-stepping spatial hash collision detection, stable 60fps",
    mobileSupport: "Fully Responsive",
    description:
      "A high-density kinetic particle field reacting to cursor gravity wells, barrier collisions, and kinetic impulse transfers.",
    technicalDetails: [
      "Verlet integration physics loop with restitution dampening",
      "Cursor magnetic gravity pull and explosive impulse on click",
      "Dynamic boundary re-sizing with responsive viewport adaptation",
      "Memory pooling to eliminate garbage collection stutters",
    ],
    controls: ["Hover cursor to attract particles", "Click / Tap to trigger explosive shockwave"],
  },
  {
    slug: "drift-wall",
    title: "Drift Wall Typography",
    subtitle: "Perspective camera parallax typography wall",
    image: "/images/lab/drift-wall.jpg",
    category: "Kinetic Typography",
    renderer: "Three.js (WebGL)",
    status: "PUBLISHED",
    performanceProfile: "Orthographic perspective projection, GPU vertex instancing",
    mobileSupport: "Fully Responsive",
    description:
      "A kinetic typographic wall utilizing matrix transformations to generate infinite depth corridors with cursor-following camera parallax.",
    technicalDetails: [
      "3D typographic geometry generation with instanced transforms",
      "Smooth quaternion camera rotation driven by normalized mouse coords",
      "Post-processing chromatic fringe and focal vignette",
      "Touch gyro integration on mobile devices",
    ],
    controls: ["Move cursor to alter perspective camera angle", "Tilt device on mobile"],
  },
  {
    slug: "ripple-distortion",
    title: "Ripple Distortion Refraction",
    subtitle: "Interactive water droplet refraction shader",
    image: "/images/lab/ripple-distortion.jpg",
    category: "Fluid Simulation",
    renderer: "Custom GLSL Fragment",
    status: "PUBLISHED",
    performanceProfile: "Single-pass fullscreen quad shader with texture coordinate displacement",
    mobileSupport: "Hardware Accelerated",
    description:
      "A hydrodynamic refraction filter that calculates wave propagation equations to distort underlying high-resolution graphical layers.",
    technicalDetails: [
      "Wave equation numerical integration in GPU texture buffer",
      "Fresnel refraction calculations with normal map perturbation",
      "Continuous velocity dissipation to prevent infinite resonance",
      "Zero DOM mutation during active interaction",
    ],
    controls: ["Move cursor over canvas to propagate water ripples", "Click to drop large droplet"],
  },
  {
    slug: "click-spark",
    title: "Click Spark Particle Engine",
    subtitle: "High-performance procedural radial spark emitter",
    image: "/images/lab/click-spark.jpg",
    category: "Physics & Dynamics",
    renderer: "Canvas 2D GPU",
    status: "PUBLISHED",
    performanceProfile: "Microsecond timestamp interpolation, vector pooling, 60fps",
    mobileSupport: "Fully Responsive",
    description:
      "A radial kinetic particle emitter that computes multi-vector spark trajectories using customizable easing curves, scalable velocity multipliers, and hardware-accelerated canvas 2D rendering.",
    technicalDetails: [
      "Procedural radial velocity vectors computed via trigonometry Math.cos/sin distribution",
      "Dynamic easing curves (linear, ease-in, ease-in-out, ease-out) for realistic deceleration",
      "Decoupled ResizeObserver loop with debounce protection for zero layout thrashing",
      "Pointer-events transparent overlay for seamless UX wrapping over any interactive DOM elements",
    ],
    controls: [
      "Click or tap anywhere on the canvas or interactive target to ignite radial sparks",
      "Configure spark color, size, radius, count, and duration in real time",
    ],
  },
];
