export interface ThreeExampleItem {
  id: string;
  title: string;
  category: string;
  url: string;
}

export interface ThreeExampleCategory {
  name: string;
  count: number;
  items: ThreeExampleItem[];
}

export const THREE_TOTAL_EXAMPLES = 588;

export const THREE_CATEGORIES: ThreeExampleCategory[] = [
  {
    "name": "webgl",
    "count": 218,
    "items": [
      {
        "id": "webgl_animation_keyframes",
        "title": "Animation Keyframes",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_animation_keyframes.html"
      },
      {
        "id": "webgl_animation_skinning_blending",
        "title": "Animation Skinning Blending",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_animation_skinning_blending.html"
      },
      {
        "id": "webgl_animation_skinning_additive_blending",
        "title": "Animation Skinning Additive Blending",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_animation_skinning_additive_blending.html"
      },
      {
        "id": "webgl_animation_skinning_ik",
        "title": "Animation Skinning Ik",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_animation_skinning_ik.html"
      },
      {
        "id": "webgl_animation_skinning_morph",
        "title": "Animation Skinning Morph",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_animation_skinning_morph.html"
      },
      {
        "id": "webgl_animation_multiple",
        "title": "Animation Multiple",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_animation_multiple.html"
      },
      {
        "id": "webgl_animation_walk",
        "title": "Animation Walk",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_animation_walk.html"
      },
      {
        "id": "webgl_batch_lod_bvh",
        "title": "Batch Lod Bvh",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_batch_lod_bvh.html"
      },
      {
        "id": "webgl_camera",
        "title": "Camera",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_camera.html"
      },
      {
        "id": "webgl_camera_array",
        "title": "Camera Array",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_camera_array.html"
      },
      {
        "id": "webgl_camera_logarithmicdepthbuffer",
        "title": "Camera Logarithmicdepthbuffer",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_camera_logarithmicdepthbuffer.html"
      },
      {
        "id": "webgl_clipping",
        "title": "Clipping",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_clipping.html"
      },
      {
        "id": "webgl_clipping_advanced",
        "title": "Clipping Advanced",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_clipping_advanced.html"
      },
      {
        "id": "webgl_clipping_intersection",
        "title": "Clipping Intersection",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_clipping_intersection.html"
      },
      {
        "id": "webgl_clipping_stencil",
        "title": "Clipping Stencil",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_clipping_stencil.html"
      },
      {
        "id": "webgl_decals",
        "title": "Decals",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_decals.html"
      },
      {
        "id": "webgl_depth_texture",
        "title": "Depth Texture",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_depth_texture.html"
      },
      {
        "id": "webgl_effects_anaglyph",
        "title": "Effects Anaglyph",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_effects_anaglyph.html"
      },
      {
        "id": "webgl_effects_ascii",
        "title": "Effects Ascii",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_effects_ascii.html"
      },
      {
        "id": "webgl_effects_parallaxbarrier",
        "title": "Effects Parallaxbarrier",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_effects_parallaxbarrier.html"
      },
      {
        "id": "webgl_effects_stereo",
        "title": "Effects Stereo",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_effects_stereo.html"
      },
      {
        "id": "webgl_framebuffer_texture",
        "title": "Framebuffer Texture",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_framebuffer_texture.html"
      },
      {
        "id": "webgl_geometries",
        "title": "Geometries",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_geometries.html"
      },
      {
        "id": "webgl_geometry_colors",
        "title": "Geometry Colors",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_geometry_colors.html"
      },
      {
        "id": "webgl_geometry_colors_lookuptable",
        "title": "Geometry Colors Lookuptable",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_geometry_colors_lookuptable.html"
      },
      {
        "id": "webgl_geometry_convex",
        "title": "Geometry Convex",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_geometry_convex.html"
      },
      {
        "id": "webgl_geometry_csg",
        "title": "Geometry Csg",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_geometry_csg.html"
      },
      {
        "id": "webgl_geometry_cube",
        "title": "Geometry Cube",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_geometry_cube.html"
      },
      {
        "id": "webgl_geometry_extrude_shapes",
        "title": "Geometry Extrude Shapes",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_geometry_extrude_shapes.html"
      },
      {
        "id": "webgl_geometry_extrude_splines",
        "title": "Geometry Extrude Splines",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_geometry_extrude_splines.html"
      },
      {
        "id": "webgl_geometry_minecraft",
        "title": "Geometry Minecraft",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_geometry_minecraft.html"
      },
      {
        "id": "webgl_geometry_nurbs",
        "title": "Geometry Nurbs",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_geometry_nurbs.html"
      },
      {
        "id": "webgl_geometry_shapes",
        "title": "Geometry Shapes",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_geometry_shapes.html"
      },
      {
        "id": "webgl_geometry_spline_editor",
        "title": "Geometry Spline Editor",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_geometry_spline_editor.html"
      },
      {
        "id": "webgl_geometry_teapot",
        "title": "Geometry Teapot",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_geometry_teapot.html"
      },
      {
        "id": "webgl_geometry_terrain",
        "title": "Geometry Terrain",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_geometry_terrain.html"
      },
      {
        "id": "webgl_geometry_terrain_raycast",
        "title": "Geometry Terrain Raycast",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_geometry_terrain_raycast.html"
      },
      {
        "id": "webgl_geometry_text",
        "title": "Geometry Text",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_geometry_text.html"
      },
      {
        "id": "webgl_geometry_text_shapes",
        "title": "Geometry Text Shapes",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_geometry_text_shapes.html"
      },
      {
        "id": "webgl_geometry_text_stroke",
        "title": "Geometry Text Stroke",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_geometry_text_stroke.html"
      },
      {
        "id": "webgl_helpers",
        "title": "Helpers",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_helpers.html"
      },
      {
        "id": "webgl_instancing_morph",
        "title": "Instancing Morph",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_instancing_morph.html"
      },
      {
        "id": "webgl_instancing_dynamic",
        "title": "Instancing Dynamic",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_instancing_dynamic.html"
      },
      {
        "id": "webgl_instancing_performance",
        "title": "Instancing Performance",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_instancing_performance.html"
      },
      {
        "id": "webgl_instancing_raycast",
        "title": "Instancing Raycast",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_instancing_raycast.html"
      },
      {
        "id": "webgl_instancing_scatter",
        "title": "Instancing Scatter",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_instancing_scatter.html"
      },
      {
        "id": "webgl_interactive_buffergeometry",
        "title": "Interactive Buffergeometry",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_interactive_buffergeometry.html"
      },
      {
        "id": "webgl_interactive_cubes",
        "title": "Interactive Cubes",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_interactive_cubes.html"
      },
      {
        "id": "webgl_interactive_cubes_gpu",
        "title": "Interactive Cubes Gpu",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_interactive_cubes_gpu.html"
      },
      {
        "id": "webgl_interactive_cubes_ortho",
        "title": "Interactive Cubes Ortho",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_interactive_cubes_ortho.html"
      },
      {
        "id": "webgl_interactive_lines",
        "title": "Interactive Lines",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_interactive_lines.html"
      },
      {
        "id": "webgl_interactive_points",
        "title": "Interactive Points",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_interactive_points.html"
      },
      {
        "id": "webgl_interactive_raycasting_points",
        "title": "Interactive Raycasting Points",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_interactive_raycasting_points.html"
      },
      {
        "id": "webgl_interactive_voxelpainter",
        "title": "Interactive Voxelpainter",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_interactive_voxelpainter.html"
      },
      {
        "id": "webgl_lensflares",
        "title": "Lensflares",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_lensflares.html"
      },
      {
        "id": "webgl_lightprobe",
        "title": "Lightprobe",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_lightprobe.html"
      },
      {
        "id": "webgl_lightprobe_cubecamera",
        "title": "Lightprobe Cubecamera",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_lightprobe_cubecamera.html"
      },
      {
        "id": "webgl_lightprobes",
        "title": "Lightprobes",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_lightprobes.html"
      },
      {
        "id": "webgl_lightprobes_complex",
        "title": "Lightprobes Complex",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_lightprobes_complex.html"
      },
      {
        "id": "webgl_lightprobes_sponza",
        "title": "Lightprobes Sponza",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_lightprobes_sponza.html"
      },
      {
        "id": "webgl_lights_hemisphere",
        "title": "Lights Hemisphere",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_lights_hemisphere.html"
      },
      {
        "id": "webgl_lights_physical",
        "title": "Lights Physical",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_lights_physical.html"
      },
      {
        "id": "webgl_lights_spotlight",
        "title": "Lights Spotlight",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_lights_spotlight.html"
      },
      {
        "id": "webgl_lights_spotlights",
        "title": "Lights Spotlights",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_lights_spotlights.html"
      },
      {
        "id": "webgl_lights_rectarealight",
        "title": "Lights Rectarealight",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_lights_rectarealight.html"
      },
      {
        "id": "webgl_lines_colors",
        "title": "Lines Colors",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_lines_colors.html"
      },
      {
        "id": "webgl_lines_dashed",
        "title": "Lines Dashed",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_lines_dashed.html"
      },
      {
        "id": "webgl_lines_fat",
        "title": "Lines Fat",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_lines_fat.html"
      },
      {
        "id": "webgl_lines_fat_raycasting",
        "title": "Lines Fat Raycasting",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_lines_fat_raycasting.html"
      },
      {
        "id": "webgl_lines_fat_wireframe",
        "title": "Lines Fat Wireframe",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_lines_fat_wireframe.html"
      },
      {
        "id": "webgl_loader_3dm",
        "title": "Loader 3dm",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_3dm.html"
      },
      {
        "id": "webgl_loader_3ds",
        "title": "Loader 3ds",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_3ds.html"
      },
      {
        "id": "webgl_loader_3dtiles",
        "title": "Loader 3dtiles",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_3dtiles.html"
      },
      {
        "id": "webgl_loader_3mf",
        "title": "Loader 3mf",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_3mf.html"
      },
      {
        "id": "webgl_loader_3mf_materials",
        "title": "Loader 3mf Materials",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_3mf_materials.html"
      },
      {
        "id": "webgl_loader_amf",
        "title": "Loader Amf",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_amf.html"
      },
      {
        "id": "webgl_loader_bvh",
        "title": "Loader Bvh",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_bvh.html"
      },
      {
        "id": "webgl_loader_collada",
        "title": "Loader Collada",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_collada.html"
      },
      {
        "id": "webgl_loader_collada_kinematics",
        "title": "Loader Collada Kinematics",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_collada_kinematics.html"
      },
      {
        "id": "webgl_loader_collada_skinning",
        "title": "Loader Collada Skinning",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_collada_skinning.html"
      },
      {
        "id": "webgl_loader_draco",
        "title": "Loader Draco",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_draco.html"
      },
      {
        "id": "webgl_loader_fbx",
        "title": "Loader Fbx",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_fbx.html"
      },
      {
        "id": "webgl_loader_fbx_nurbs",
        "title": "Loader Fbx Nurbs",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_fbx_nurbs.html"
      },
      {
        "id": "webgl_loader_gcode",
        "title": "Loader Gcode",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_gcode.html"
      },
      {
        "id": "webgl_loader_gltf",
        "title": "Loader Gltf",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_gltf.html"
      },
      {
        "id": "webgl_loader_gltf_animation_pointer",
        "title": "Loader Gltf Animation Pointer",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_gltf_animation_pointer.html"
      },
      {
        "id": "webgl_loader_gltf_progressive_lod",
        "title": "Loader Gltf Progressive Lod",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_gltf_progressive_lod.html"
      },
      {
        "id": "webgl_loader_gltf_avif",
        "title": "Loader Gltf Avif",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_gltf_avif.html"
      },
      {
        "id": "webgl_loader_gltf_compressed",
        "title": "Loader Gltf Compressed",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_gltf_compressed.html"
      },
      {
        "id": "webgl_loader_gltf_dispersion",
        "title": "Loader Gltf Dispersion",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_gltf_dispersion.html"
      },
      {
        "id": "webgl_loader_gltf_instancing",
        "title": "Loader Gltf Instancing",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_gltf_instancing.html"
      },
      {
        "id": "webgl_loader_gltf_iridescence",
        "title": "Loader Gltf Iridescence",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_gltf_iridescence.html"
      },
      {
        "id": "webgl_loader_gltf_sheen",
        "title": "Loader Gltf Sheen",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_gltf_sheen.html"
      },
      {
        "id": "webgl_loader_gltf_transmission",
        "title": "Loader Gltf Transmission",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_gltf_transmission.html"
      },
      {
        "id": "webgl_loader_gltf_variants",
        "title": "Loader Gltf Variants",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_gltf_variants.html"
      },
      {
        "id": "webgl_loader_gltf_anisotropy",
        "title": "Loader Gltf Anisotropy",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_gltf_anisotropy.html"
      },
      {
        "id": "webgl_loader_ifc",
        "title": "Loader Ifc",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_ifc.html"
      },
      {
        "id": "webgl_loader_imagebitmap",
        "title": "Loader Imagebitmap",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_imagebitmap.html"
      },
      {
        "id": "webgl_loader_kmz",
        "title": "Loader Kmz",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_kmz.html"
      },
      {
        "id": "webgl_loader_ldraw",
        "title": "Loader Ldraw",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_ldraw.html"
      },
      {
        "id": "webgl_loader_md2",
        "title": "Loader Md2",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_md2.html"
      },
      {
        "id": "webgl_loader_md2_control",
        "title": "Loader Md2 Control",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_md2_control.html"
      },
      {
        "id": "webgl_loader_mdd",
        "title": "Loader Mdd",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_mdd.html"
      },
      {
        "id": "webgl_loader_nrrd",
        "title": "Loader Nrrd",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_nrrd.html"
      },
      {
        "id": "webgl_loader_obj",
        "title": "Loader Obj",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_obj.html"
      },
      {
        "id": "webgl_loader_pcd",
        "title": "Loader Pcd",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_pcd.html"
      },
      {
        "id": "webgl_loader_pdb",
        "title": "Loader Pdb",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_pdb.html"
      },
      {
        "id": "webgl_loader_ply",
        "title": "Loader Ply",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_ply.html"
      },
      {
        "id": "webgl_loader_stl",
        "title": "Loader Stl",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_stl.html"
      },
      {
        "id": "webgl_loader_svg",
        "title": "Loader Svg",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_svg.html"
      },
      {
        "id": "webgl_loader_texture_dds",
        "title": "Loader Texture Dds",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_texture_dds.html"
      },
      {
        "id": "webgl_loader_texture_exr",
        "title": "Loader Texture Exr",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_texture_exr.html"
      },
      {
        "id": "webgl_loader_texture_ultrahdr",
        "title": "Loader Texture Ultrahdr",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_texture_ultrahdr.html"
      },
      {
        "id": "webgl_loader_texture_hdr",
        "title": "Loader Texture Hdr",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_texture_hdr.html"
      },
      {
        "id": "webgl_loader_texture_ktx",
        "title": "Loader Texture Ktx",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_texture_ktx.html"
      },
      {
        "id": "webgl_loader_texture_ktx2",
        "title": "Loader Texture Ktx2",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_texture_ktx2.html"
      },
      {
        "id": "webgl_loader_texture_lottie",
        "title": "Loader Texture Lottie",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_texture_lottie.html"
      },
      {
        "id": "webgl_loader_texture_pvrtc",
        "title": "Loader Texture Pvrtc",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_texture_pvrtc.html"
      },
      {
        "id": "webgl_loader_texture_tga",
        "title": "Loader Texture Tga",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_texture_tga.html"
      },
      {
        "id": "webgl_loader_texture_tiff",
        "title": "Loader Texture Tiff",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_texture_tiff.html"
      },
      {
        "id": "webgl_loader_ttf",
        "title": "Loader Ttf",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_ttf.html"
      },
      {
        "id": "webgl_loader_usdz",
        "title": "Loader Usdz",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_usdz.html"
      },
      {
        "id": "webgl_loader_vox",
        "title": "Loader Vox",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_vox.html"
      },
      {
        "id": "webgl_loader_vrml",
        "title": "Loader Vrml",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_vrml.html"
      },
      {
        "id": "webgl_loader_xyz",
        "title": "Loader Xyz",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_loader_xyz.html"
      },
      {
        "id": "webgl_lod",
        "title": "Lod",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_lod.html"
      },
      {
        "id": "webgl_marchingcubes",
        "title": "Marchingcubes",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_marchingcubes.html"
      },
      {
        "id": "webgl_materials_alphahash",
        "title": "Materials Alphahash",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_materials_alphahash.html"
      },
      {
        "id": "webgl_materials_blending",
        "title": "Materials Blending",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_materials_blending.html"
      },
      {
        "id": "webgl_materials_blending_custom",
        "title": "Materials Blending Custom",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_materials_blending_custom.html"
      },
      {
        "id": "webgl_materials_bumpmap",
        "title": "Materials Bumpmap",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_materials_bumpmap.html"
      },
      {
        "id": "webgl_materials_car",
        "title": "Materials Car",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_materials_car.html"
      },
      {
        "id": "webgl_materials_channels",
        "title": "Materials Channels",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_materials_channels.html"
      },
      {
        "id": "webgl_materials_cubemap",
        "title": "Materials Cubemap",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_materials_cubemap.html"
      },
      {
        "id": "webgl_materials_cubemap_dynamic",
        "title": "Materials Cubemap Dynamic",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_materials_cubemap_dynamic.html"
      },
      {
        "id": "webgl_materials_cubemap_refraction",
        "title": "Materials Cubemap Refraction",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_materials_cubemap_refraction.html"
      },
      {
        "id": "webgl_materials_cubemap_mipmaps",
        "title": "Materials Cubemap Mipmaps",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_materials_cubemap_mipmaps.html"
      },
      {
        "id": "webgl_materials_cubemap_render_to_mipmaps",
        "title": "Materials Cubemap Render To Mipmaps",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_materials_cubemap_render_to_mipmaps.html"
      },
      {
        "id": "webgl_materials_displacementmap",
        "title": "Materials Displacementmap",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_materials_displacementmap.html"
      },
      {
        "id": "webgl_materials_envmaps",
        "title": "Materials Envmaps",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_materials_envmaps.html"
      },
      {
        "id": "webgl_materials_envmaps_exr",
        "title": "Materials Envmaps Exr",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_materials_envmaps_exr.html"
      },
      {
        "id": "webgl_materials_envmaps_groundprojected",
        "title": "Materials Envmaps Groundprojected",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_materials_envmaps_groundprojected.html"
      },
      {
        "id": "webgl_materials_envmaps_hdr",
        "title": "Materials Envmaps Hdr",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_materials_envmaps_hdr.html"
      },
      {
        "id": "webgl_materials_envmaps_fasthdr",
        "title": "Materials Envmaps Fasthdr",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_materials_envmaps_fasthdr.html"
      },
      {
        "id": "webgl_materials_matcap",
        "title": "Materials Matcap",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_materials_matcap.html"
      },
      {
        "id": "webgl_materials_normalmap",
        "title": "Materials Normalmap",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_materials_normalmap.html"
      },
      {
        "id": "webgl_materials_normalmap_object_space",
        "title": "Materials Normalmap Object Space",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_materials_normalmap_object_space.html"
      },
      {
        "id": "webgl_materials_physical_clearcoat",
        "title": "Materials Physical Clearcoat",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_materials_physical_clearcoat.html"
      },
      {
        "id": "webgl_materials_physical_transmission",
        "title": "Materials Physical Transmission",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_materials_physical_transmission.html"
      },
      {
        "id": "webgl_materials_physical_transmission_alpha",
        "title": "Materials Physical Transmission Alpha",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_materials_physical_transmission_alpha.html"
      },
      {
        "id": "webgl_materials_subsurface_scattering",
        "title": "Materials Subsurface Scattering",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_materials_subsurface_scattering.html"
      },
      {
        "id": "webgl_materials_texture_anisotropy",
        "title": "Materials Texture Anisotropy",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_materials_texture_anisotropy.html"
      },
      {
        "id": "webgl_materials_texture_canvas",
        "title": "Materials Texture Canvas",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_materials_texture_canvas.html"
      },
      {
        "id": "webgl_materials_texture_filters",
        "title": "Materials Texture Filters",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_materials_texture_filters.html"
      },
      {
        "id": "webgl_materials_texture_html",
        "title": "Materials Texture Html",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_materials_texture_html.html"
      },
      {
        "id": "webgl_materials_texture_manualmipmap",
        "title": "Materials Texture Manualmipmap",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_materials_texture_manualmipmap.html"
      },
      {
        "id": "webgl_materials_texture_partialupdate",
        "title": "Materials Texture Partialupdate",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_materials_texture_partialupdate.html"
      },
      {
        "id": "webgl_materials_texture_rotation",
        "title": "Materials Texture Rotation",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_materials_texture_rotation.html"
      },
      {
        "id": "webgl_materials_toon",
        "title": "Materials Toon",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_materials_toon.html"
      },
      {
        "id": "webgl_materials_video",
        "title": "Materials Video",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_materials_video.html"
      },
      {
        "id": "webgl_materials_video_webcam",
        "title": "Materials Video Webcam",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_materials_video_webcam.html"
      },
      {
        "id": "webgl_materials_wireframe",
        "title": "Materials Wireframe",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_materials_wireframe.html"
      },
      {
        "id": "webgl_pmrem_cubemap",
        "title": "Pmrem Cubemap",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_pmrem_cubemap.html"
      },
      {
        "id": "webgl_pmrem_equirectangular",
        "title": "Pmrem Equirectangular",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_pmrem_equirectangular.html"
      },
      {
        "id": "webgl_pmrem_test",
        "title": "Pmrem Test",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_pmrem_test.html"
      },
      {
        "id": "webgl_math_obb",
        "title": "Math Obb",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_math_obb.html"
      },
      {
        "id": "webgl_math_orientation_transform",
        "title": "Math Orientation Transform",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_math_orientation_transform.html"
      },
      {
        "id": "webgl_mesh_batch",
        "title": "Mesh Batch",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_mesh_batch.html"
      },
      {
        "id": "webgl_mirror",
        "title": "Mirror",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_mirror.html"
      },
      {
        "id": "webgl_modifier_curve",
        "title": "Modifier Curve",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_modifier_curve.html"
      },
      {
        "id": "webgl_modifier_curve_instanced",
        "title": "Modifier Curve Instanced",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_modifier_curve_instanced.html"
      },
      {
        "id": "webgl_modifier_edgesplit",
        "title": "Modifier Edgesplit",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_modifier_edgesplit.html"
      },
      {
        "id": "webgl_modifier_simplifier",
        "title": "Modifier Simplifier",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_modifier_simplifier.html"
      },
      {
        "id": "webgl_modifier_subdivision",
        "title": "Modifier Subdivision",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_modifier_subdivision.html"
      },
      {
        "id": "webgl_modifier_tessellation",
        "title": "Modifier Tessellation",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_modifier_tessellation.html"
      },
      {
        "id": "webgl_morphtargets",
        "title": "Morphtargets",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_morphtargets.html"
      },
      {
        "id": "webgl_morphtargets_face",
        "title": "Morphtargets Face",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_morphtargets_face.html"
      },
      {
        "id": "webgl_morphtargets_horse",
        "title": "Morphtargets Horse",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_morphtargets_horse.html"
      },
      {
        "id": "webgl_morphtargets_sphere",
        "title": "Morphtargets Sphere",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_morphtargets_sphere.html"
      },
      {
        "id": "webgl_morphtargets_webcam",
        "title": "Morphtargets Webcam",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_morphtargets_webcam.html"
      },
      {
        "id": "webgl_multiple_elements",
        "title": "Multiple Elements",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_multiple_elements.html"
      },
      {
        "id": "webgl_multiple_elements_text",
        "title": "Multiple Elements Text",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_multiple_elements_text.html"
      },
      {
        "id": "webgl_multiple_scenes_comparison",
        "title": "Multiple Scenes Comparison",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_multiple_scenes_comparison.html"
      },
      {
        "id": "webgl_multiple_views",
        "title": "Multiple Views",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_multiple_views.html"
      },
      {
        "id": "webgl_panorama_cube",
        "title": "Panorama Cube",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_panorama_cube.html"
      },
      {
        "id": "webgl_panorama_equirectangular",
        "title": "Panorama Equirectangular",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_panorama_equirectangular.html"
      },
      {
        "id": "webgl_points_billboards",
        "title": "Points Billboards",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_points_billboards.html"
      },
      {
        "id": "webgl_points_dynamic",
        "title": "Points Dynamic",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_points_dynamic.html"
      },
      {
        "id": "webgl_points_sprites",
        "title": "Points Sprites",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_points_sprites.html"
      },
      {
        "id": "webgl_points_waves",
        "title": "Points Waves",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_points_waves.html"
      },
      {
        "id": "webgl_portal",
        "title": "Portal",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_portal.html"
      },
      {
        "id": "webgl_random_uv",
        "title": "Random Uv",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_random_uv.html"
      },
      {
        "id": "webgl_raycaster_bvh",
        "title": "Raycaster Bvh",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_raycaster_bvh.html"
      },
      {
        "id": "webgl_raycaster_sprite",
        "title": "Raycaster Sprite",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_raycaster_sprite.html"
      },
      {
        "id": "webgl_raycaster_texture",
        "title": "Raycaster Texture",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_raycaster_texture.html"
      },
      {
        "id": "webgl_read_float_buffer",
        "title": "Read Float Buffer",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_read_float_buffer.html"
      },
      {
        "id": "webgl_renderer_pathtracer",
        "title": "Renderer Pathtracer",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_renderer_pathtracer.html"
      },
      {
        "id": "webgl_refraction",
        "title": "Refraction",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_refraction.html"
      },
      {
        "id": "webgl_rtt",
        "title": "Rtt",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_rtt.html"
      },
      {
        "id": "webgl_shader",
        "title": "Shader",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_shader.html"
      },
      {
        "id": "webgl_shader_lava",
        "title": "Shader Lava",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_shader_lava.html"
      },
      {
        "id": "webgl_shaders_ocean",
        "title": "Shaders Ocean",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_shaders_ocean.html"
      },
      {
        "id": "webgl_shaders_sky",
        "title": "Shaders Sky",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_shaders_sky.html"
      },
      {
        "id": "webgl_shadow_contact",
        "title": "Shadow Contact",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_shadow_contact.html"
      },
      {
        "id": "webgl_shadowmap",
        "title": "Shadowmap",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_shadowmap.html"
      },
      {
        "id": "webgl_shadowmap_performance",
        "title": "Shadowmap Performance",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_shadowmap_performance.html"
      },
      {
        "id": "webgl_shadowmap_pointlight",
        "title": "Shadowmap Pointlight",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_shadowmap_pointlight.html"
      },
      {
        "id": "webgl_shadowmap_viewer",
        "title": "Shadowmap Viewer",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_shadowmap_viewer.html"
      },
      {
        "id": "webgl_shadowmap_vsm",
        "title": "Shadowmap Vsm",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_shadowmap_vsm.html"
      },
      {
        "id": "webgl_shadowmesh",
        "title": "Shadowmesh",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_shadowmesh.html"
      },
      {
        "id": "webgl_sprites",
        "title": "Sprites",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_sprites.html"
      },
      {
        "id": "webgl_test_memory",
        "title": "Test Memory",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_test_memory.html"
      },
      {
        "id": "webgl_test_memory2",
        "title": "Test Memory2",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_test_memory2.html"
      },
      {
        "id": "webgl_test_wide_gamut",
        "title": "Test Wide Gamut",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_test_wide_gamut.html"
      },
      {
        "id": "webgl_tonemapping",
        "title": "Tonemapping",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_tonemapping.html"
      },
      {
        "id": "webgl_video_kinect",
        "title": "Video Kinect",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_video_kinect.html"
      },
      {
        "id": "webgl_video_panorama_equirectangular",
        "title": "Video Panorama Equirectangular",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_video_panorama_equirectangular.html"
      },
      {
        "id": "webgl_watch",
        "title": "Watch",
        "category": "webgl",
        "url": "https://threejs.org/examples/webgl_watch.html"
      }
    ]
  },
  {
    "name": "webgl / postprocessing",
    "count": 26,
    "items": [
      {
        "id": "webgl_postprocessing",
        "title": "Postprocessing",
        "category": "webgl / postprocessing",
        "url": "https://threejs.org/examples/webgl_postprocessing.html"
      },
      {
        "id": "webgl_postprocessing_3dlut",
        "title": "Postprocessing 3dlut",
        "category": "webgl / postprocessing",
        "url": "https://threejs.org/examples/webgl_postprocessing_3dlut.html"
      },
      {
        "id": "webgl_postprocessing_advanced",
        "title": "Postprocessing Advanced",
        "category": "webgl / postprocessing",
        "url": "https://threejs.org/examples/webgl_postprocessing_advanced.html"
      },
      {
        "id": "webgl_postprocessing_afterimage",
        "title": "Postprocessing Afterimage",
        "category": "webgl / postprocessing",
        "url": "https://threejs.org/examples/webgl_postprocessing_afterimage.html"
      },
      {
        "id": "webgl_postprocessing_backgrounds",
        "title": "Postprocessing Backgrounds",
        "category": "webgl / postprocessing",
        "url": "https://threejs.org/examples/webgl_postprocessing_backgrounds.html"
      },
      {
        "id": "webgl_postprocessing_transition",
        "title": "Postprocessing Transition",
        "category": "webgl / postprocessing",
        "url": "https://threejs.org/examples/webgl_postprocessing_transition.html"
      },
      {
        "id": "webgl_postprocessing_dof",
        "title": "Postprocessing Dof",
        "category": "webgl / postprocessing",
        "url": "https://threejs.org/examples/webgl_postprocessing_dof.html"
      },
      {
        "id": "webgl_postprocessing_dof2",
        "title": "Postprocessing Dof2",
        "category": "webgl / postprocessing",
        "url": "https://threejs.org/examples/webgl_postprocessing_dof2.html"
      },
      {
        "id": "webgl_postprocessing_fxaa",
        "title": "Postprocessing Fxaa",
        "category": "webgl / postprocessing",
        "url": "https://threejs.org/examples/webgl_postprocessing_fxaa.html"
      },
      {
        "id": "webgl_postprocessing_glitch",
        "title": "Postprocessing Glitch",
        "category": "webgl / postprocessing",
        "url": "https://threejs.org/examples/webgl_postprocessing_glitch.html"
      },
      {
        "id": "webgl_postprocessing_godrays",
        "title": "Postprocessing Godrays",
        "category": "webgl / postprocessing",
        "url": "https://threejs.org/examples/webgl_postprocessing_godrays.html"
      },
      {
        "id": "webgl_postprocessing_gtao",
        "title": "Postprocessing Gtao",
        "category": "webgl / postprocessing",
        "url": "https://threejs.org/examples/webgl_postprocessing_gtao.html"
      },
      {
        "id": "webgl_postprocessing_rgb_halftone",
        "title": "Postprocessing Rgb Halftone",
        "category": "webgl / postprocessing",
        "url": "https://threejs.org/examples/webgl_postprocessing_rgb_halftone.html"
      },
      {
        "id": "webgl_postprocessing_masking",
        "title": "Postprocessing Masking",
        "category": "webgl / postprocessing",
        "url": "https://threejs.org/examples/webgl_postprocessing_masking.html"
      },
      {
        "id": "webgl_postprocessing_ssaa",
        "title": "Postprocessing Ssaa",
        "category": "webgl / postprocessing",
        "url": "https://threejs.org/examples/webgl_postprocessing_ssaa.html"
      },
      {
        "id": "webgl_postprocessing_outline",
        "title": "Postprocessing Outline",
        "category": "webgl / postprocessing",
        "url": "https://threejs.org/examples/webgl_postprocessing_outline.html"
      },
      {
        "id": "webgl_postprocessing_pixel",
        "title": "Postprocessing Pixel",
        "category": "webgl / postprocessing",
        "url": "https://threejs.org/examples/webgl_postprocessing_pixel.html"
      },
      {
        "id": "webgl_postprocessing_procedural",
        "title": "Postprocessing Procedural",
        "category": "webgl / postprocessing",
        "url": "https://threejs.org/examples/webgl_postprocessing_procedural.html"
      },
      {
        "id": "webgl_postprocessing_sao",
        "title": "Postprocessing Sao",
        "category": "webgl / postprocessing",
        "url": "https://threejs.org/examples/webgl_postprocessing_sao.html"
      },
      {
        "id": "webgl_postprocessing_smaa",
        "title": "Postprocessing Smaa",
        "category": "webgl / postprocessing",
        "url": "https://threejs.org/examples/webgl_postprocessing_smaa.html"
      },
      {
        "id": "webgl_postprocessing_sobel",
        "title": "Postprocessing Sobel",
        "category": "webgl / postprocessing",
        "url": "https://threejs.org/examples/webgl_postprocessing_sobel.html"
      },
      {
        "id": "webgl_postprocessing_ssao",
        "title": "Postprocessing Ssao",
        "category": "webgl / postprocessing",
        "url": "https://threejs.org/examples/webgl_postprocessing_ssao.html"
      },
      {
        "id": "webgl_postprocessing_ssr",
        "title": "Postprocessing Ssr",
        "category": "webgl / postprocessing",
        "url": "https://threejs.org/examples/webgl_postprocessing_ssr.html"
      },
      {
        "id": "webgl_postprocessing_taa",
        "title": "Postprocessing Taa",
        "category": "webgl / postprocessing",
        "url": "https://threejs.org/examples/webgl_postprocessing_taa.html"
      },
      {
        "id": "webgl_postprocessing_unreal_bloom",
        "title": "Postprocessing Unreal Bloom",
        "category": "webgl / postprocessing",
        "url": "https://threejs.org/examples/webgl_postprocessing_unreal_bloom.html"
      },
      {
        "id": "webgl_postprocessing_unreal_bloom_selective",
        "title": "Postprocessing Unreal Bloom Selective",
        "category": "webgl / postprocessing",
        "url": "https://threejs.org/examples/webgl_postprocessing_unreal_bloom_selective.html"
      }
    ]
  },
  {
    "name": "webgl / advanced",
    "count": 48,
    "items": [
      {
        "id": "webgl_buffergeometry",
        "title": "Buffergeometry",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_buffergeometry.html"
      },
      {
        "id": "webgl_buffergeometry_attributes_integer",
        "title": "Buffergeometry Attributes Integer",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_buffergeometry_attributes_integer.html"
      },
      {
        "id": "webgl_buffergeometry_attributes_none",
        "title": "Buffergeometry Attributes None",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_buffergeometry_attributes_none.html"
      },
      {
        "id": "webgl_buffergeometry_custom_attributes_particles",
        "title": "Buffergeometry Custom Attributes Particles",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_buffergeometry_custom_attributes_particles.html"
      },
      {
        "id": "webgl_buffergeometry_drawrange",
        "title": "Buffergeometry Drawrange",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_buffergeometry_drawrange.html"
      },
      {
        "id": "webgl_buffergeometry_glbufferattribute",
        "title": "Buffergeometry Glbufferattribute",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_buffergeometry_glbufferattribute.html"
      },
      {
        "id": "webgl_buffergeometry_indexed",
        "title": "Buffergeometry Indexed",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_buffergeometry_indexed.html"
      },
      {
        "id": "webgl_buffergeometry_instancing",
        "title": "Buffergeometry Instancing",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_buffergeometry_instancing.html"
      },
      {
        "id": "webgl_buffergeometry_instancing_billboards",
        "title": "Buffergeometry Instancing Billboards",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_buffergeometry_instancing_billboards.html"
      },
      {
        "id": "webgl_buffergeometry_instancing_interleaved",
        "title": "Buffergeometry Instancing Interleaved",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_buffergeometry_instancing_interleaved.html"
      },
      {
        "id": "webgl_buffergeometry_lines",
        "title": "Buffergeometry Lines",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_buffergeometry_lines.html"
      },
      {
        "id": "webgl_buffergeometry_lines_indexed",
        "title": "Buffergeometry Lines Indexed",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_buffergeometry_lines_indexed.html"
      },
      {
        "id": "webgl_buffergeometry_points",
        "title": "Buffergeometry Points",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_buffergeometry_points.html"
      },
      {
        "id": "webgl_buffergeometry_points_interleaved",
        "title": "Buffergeometry Points Interleaved",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_buffergeometry_points_interleaved.html"
      },
      {
        "id": "webgl_buffergeometry_rawshader",
        "title": "Buffergeometry Rawshader",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_buffergeometry_rawshader.html"
      },
      {
        "id": "webgl_buffergeometry_selective_draw",
        "title": "Buffergeometry Selective Draw",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_buffergeometry_selective_draw.html"
      },
      {
        "id": "webgl_buffergeometry_uint",
        "title": "Buffergeometry Uint",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_buffergeometry_uint.html"
      },
      {
        "id": "webgl_clipculldistance",
        "title": "Clipculldistance",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_clipculldistance.html"
      },
      {
        "id": "webgl_custom_attributes",
        "title": "Custom Attributes",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_custom_attributes.html"
      },
      {
        "id": "webgl_custom_attributes_lines",
        "title": "Custom Attributes Lines",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_custom_attributes_lines.html"
      },
      {
        "id": "webgl_custom_attributes_points",
        "title": "Custom Attributes Points",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_custom_attributes_points.html"
      },
      {
        "id": "webgl_custom_attributes_points2",
        "title": "Custom Attributes Points2",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_custom_attributes_points2.html"
      },
      {
        "id": "webgl_custom_attributes_points3",
        "title": "Custom Attributes Points3",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_custom_attributes_points3.html"
      },
      {
        "id": "webgl_gpgpu_birds",
        "title": "Gpgpu Birds",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_gpgpu_birds.html"
      },
      {
        "id": "webgl_gpgpu_birds_gltf",
        "title": "Gpgpu Birds Gltf",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_gpgpu_birds_gltf.html"
      },
      {
        "id": "webgl_gpgpu_water",
        "title": "Gpgpu Water",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_gpgpu_water.html"
      },
      {
        "id": "webgl_gpgpu_protoplanet",
        "title": "Gpgpu Protoplanet",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_gpgpu_protoplanet.html"
      },
      {
        "id": "webgl_materials_modified",
        "title": "Materials Modified",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_materials_modified.html"
      },
      {
        "id": "webgl_multiple_rendertargets",
        "title": "Multiple Rendertargets",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_multiple_rendertargets.html"
      },
      {
        "id": "webgl_multisampled_renderbuffers",
        "title": "Multisampled Renderbuffers",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_multisampled_renderbuffers.html"
      },
      {
        "id": "webgl_rendertarget_texture2darray",
        "title": "Rendertarget Texture2darray",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_rendertarget_texture2darray.html"
      },
      {
        "id": "webgl_reversed_depth_buffer",
        "title": "Reversed Depth Buffer",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_reversed_depth_buffer.html"
      },
      {
        "id": "webgl_shadowmap_csm",
        "title": "Shadowmap Csm",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_shadowmap_csm.html"
      },
      {
        "id": "webgl_shadowmap_pcss",
        "title": "Shadowmap Pcss",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_shadowmap_pcss.html"
      },
      {
        "id": "webgl_shadowmap_progressive",
        "title": "Shadowmap Progressive",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_shadowmap_progressive.html"
      },
      {
        "id": "webgl_simple_gi",
        "title": "Simple Gi",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_simple_gi.html"
      },
      {
        "id": "webgl_texture2darray",
        "title": "Texture2darray",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_texture2darray.html"
      },
      {
        "id": "webgl_texture2darray_compressed",
        "title": "Texture2darray Compressed",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_texture2darray_compressed.html"
      },
      {
        "id": "webgl_texture2darray_layerupdate",
        "title": "Texture2darray Layerupdate",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_texture2darray_layerupdate.html"
      },
      {
        "id": "webgl_texture3d",
        "title": "Texture3d",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_texture3d.html"
      },
      {
        "id": "webgl_texture3d_partialupdate",
        "title": "Texture3d Partialupdate",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_texture3d_partialupdate.html"
      },
      {
        "id": "webgl_ubo",
        "title": "Ubo",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_ubo.html"
      },
      {
        "id": "webgl_ubo_arrays",
        "title": "Ubo Arrays",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_ubo_arrays.html"
      },
      {
        "id": "webgl_volume_cloud",
        "title": "Volume Cloud",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_volume_cloud.html"
      },
      {
        "id": "webgl_volume_instancing",
        "title": "Volume Instancing",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_volume_instancing.html"
      },
      {
        "id": "webgl_volume_perlin",
        "title": "Volume Perlin",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_volume_perlin.html"
      },
      {
        "id": "webgl_worker_offscreencanvas",
        "title": "Worker Offscreencanvas",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_worker_offscreencanvas.html"
      },
      {
        "id": "webgl_performance",
        "title": "Performance",
        "category": "webgl / advanced",
        "url": "https://threejs.org/examples/webgl_performance.html"
      }
    ]
  },
  {
    "name": "webgl / tsl",
    "count": 4,
    "items": [
      {
        "id": "webgl_tsl_shadowmap",
        "title": "Tsl Shadowmap",
        "category": "webgl / tsl",
        "url": "https://threejs.org/examples/webgl_tsl_shadowmap.html"
      },
      {
        "id": "webgl_tsl_skinning",
        "title": "Tsl Skinning",
        "category": "webgl / tsl",
        "url": "https://threejs.org/examples/webgl_tsl_skinning.html"
      },
      {
        "id": "webgl_tsl_clearcoat",
        "title": "Tsl Clearcoat",
        "category": "webgl / tsl",
        "url": "https://threejs.org/examples/webgl_tsl_clearcoat.html"
      },
      {
        "id": "webgl_tsl_instancing",
        "title": "Tsl Instancing",
        "category": "webgl / tsl",
        "url": "https://threejs.org/examples/webgl_tsl_instancing.html"
      }
    ]
  },
  {
    "name": "webgpu (wip)",
    "count": 214,
    "items": [
      {
        "id": "webgpu_animation_retargeting",
        "title": "Animation Retargeting",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_animation_retargeting.html"
      },
      {
        "id": "webgpu_animation_retargeting_readyplayer",
        "title": "Animation Retargeting Readyplayer",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_animation_retargeting_readyplayer.html"
      },
      {
        "id": "webgpu_backdrop",
        "title": "Backdrop",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_backdrop.html"
      },
      {
        "id": "webgpu_backdrop_area",
        "title": "Backdrop Area",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_backdrop_area.html"
      },
      {
        "id": "webgpu_backdrop_water",
        "title": "Backdrop Water",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_backdrop_water.html"
      },
      {
        "id": "webgpu_camera",
        "title": "Camera",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_camera.html"
      },
      {
        "id": "webgpu_camera_array",
        "title": "Camera Array",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_camera_array.html"
      },
      {
        "id": "webgpu_camera_logarithmicdepthbuffer",
        "title": "Camera Logarithmicdepthbuffer",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_camera_logarithmicdepthbuffer.html"
      },
      {
        "id": "webgpu_caustics",
        "title": "Caustics",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_caustics.html"
      },
      {
        "id": "webgpu_centroid_sampling",
        "title": "Centroid Sampling",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_centroid_sampling.html"
      },
      {
        "id": "webgpu_clearcoat",
        "title": "Clearcoat",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_clearcoat.html"
      },
      {
        "id": "webgpu_clipping",
        "title": "Clipping",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_clipping.html"
      },
      {
        "id": "webgpu_compile_async",
        "title": "Compile Async",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_compile_async.html"
      },
      {
        "id": "webgpu_compute_audio",
        "title": "Compute Audio",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_compute_audio.html"
      },
      {
        "id": "webgpu_compute_birds",
        "title": "Compute Birds",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_compute_birds.html"
      },
      {
        "id": "webgpu_compute_cloth",
        "title": "Compute Cloth",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_compute_cloth.html"
      },
      {
        "id": "webgpu_compute_geometry",
        "title": "Compute Geometry",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_compute_geometry.html"
      },
      {
        "id": "webgpu_compute_particles",
        "title": "Compute Particles",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_compute_particles.html"
      },
      {
        "id": "webgpu_compute_particles_fluid",
        "title": "Compute Particles Fluid",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_compute_particles_fluid.html"
      },
      {
        "id": "webgpu_compute_particles_rain",
        "title": "Compute Particles Rain",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_compute_particles_rain.html"
      },
      {
        "id": "webgpu_compute_particles_snow",
        "title": "Compute Particles Snow",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_compute_particles_snow.html"
      },
      {
        "id": "webgpu_compute_points",
        "title": "Compute Points",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_compute_points.html"
      },
      {
        "id": "webgpu_compute_rasterizer",
        "title": "Compute Rasterizer",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_compute_rasterizer.html"
      },
      {
        "id": "webgpu_compute_rasterizer_ibl",
        "title": "Compute Rasterizer Ibl",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_compute_rasterizer_ibl.html"
      },
      {
        "id": "webgpu_compute_reduce",
        "title": "Compute Reduce",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_compute_reduce.html"
      },
      {
        "id": "webgpu_compute_sort_bitonic",
        "title": "Compute Sort Bitonic",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_compute_sort_bitonic.html"
      },
      {
        "id": "webgpu_compute_texture",
        "title": "Compute Texture",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_compute_texture.html"
      },
      {
        "id": "webgpu_compute_texture_3d",
        "title": "Compute Texture 3d",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_compute_texture_3d.html"
      },
      {
        "id": "webgpu_compute_texture_pingpong",
        "title": "Compute Texture Pingpong",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_compute_texture_pingpong.html"
      },
      {
        "id": "webgpu_compute_water",
        "title": "Compute Water",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_compute_water.html"
      },
      {
        "id": "webgpu_cubemap_adjustments",
        "title": "Cubemap Adjustments",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_cubemap_adjustments.html"
      },
      {
        "id": "webgpu_cubemap_dynamic",
        "title": "Cubemap Dynamic",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_cubemap_dynamic.html"
      },
      {
        "id": "webgpu_cubemap_mix",
        "title": "Cubemap Mix",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_cubemap_mix.html"
      },
      {
        "id": "webgpu_custom_fog",
        "title": "Custom Fog",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_custom_fog.html"
      },
      {
        "id": "webgpu_custom_fog_background",
        "title": "Custom Fog Background",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_custom_fog_background.html"
      },
      {
        "id": "webgpu_custom_fog_scattering",
        "title": "Custom Fog Scattering",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_custom_fog_scattering.html"
      },
      {
        "id": "webgpu_depth_texture",
        "title": "Depth Texture",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_depth_texture.html"
      },
      {
        "id": "webgpu_display_stereo",
        "title": "Display Stereo",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_display_stereo.html"
      },
      {
        "id": "webgpu_equirectangular",
        "title": "Equirectangular",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_equirectangular.html"
      },
      {
        "id": "webgpu_fog_height",
        "title": "Fog Height",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_fog_height.html"
      },
      {
        "id": "webgpu_furnace_test",
        "title": "Furnace Test",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_furnace_test.html"
      },
      {
        "id": "webgpu_generator_building",
        "title": "Generator Building",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_generator_building.html"
      },
      {
        "id": "webgpu_generator_city",
        "title": "Generator City",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_generator_city.html"
      },
      {
        "id": "webgpu_geometry_loft",
        "title": "Geometry Loft",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_geometry_loft.html"
      },
      {
        "id": "webgpu_hdr",
        "title": "Hdr",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_hdr.html"
      },
      {
        "id": "webgpu_instance_mesh",
        "title": "Instance Mesh",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_instance_mesh.html"
      },
      {
        "id": "webgpu_instance_path",
        "title": "Instance Path",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_instance_path.html"
      },
      {
        "id": "webgpu_instance_points",
        "title": "Instance Points",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_instance_points.html"
      },
      {
        "id": "webgpu_instance_sprites",
        "title": "Instance Sprites",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_instance_sprites.html"
      },
      {
        "id": "webgpu_instance_uniform",
        "title": "Instance Uniform",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_instance_uniform.html"
      },
      {
        "id": "webgpu_instancing_morph",
        "title": "Instancing Morph",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_instancing_morph.html"
      },
      {
        "id": "webgpu_layers",
        "title": "Layers",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_layers.html"
      },
      {
        "id": "webgpu_lensflares",
        "title": "Lensflares",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_lensflares.html"
      },
      {
        "id": "webgpu_lightprobe",
        "title": "Lightprobe",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_lightprobe.html"
      },
      {
        "id": "webgpu_lightprobe_cubecamera",
        "title": "Lightprobe Cubecamera",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_lightprobe_cubecamera.html"
      },
      {
        "id": "webgpu_lights_clustered",
        "title": "Lights Clustered",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_lights_clustered.html"
      },
      {
        "id": "webgpu_lights_custom",
        "title": "Lights Custom",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_lights_custom.html"
      },
      {
        "id": "webgpu_lights_dynamic",
        "title": "Lights Dynamic",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_lights_dynamic.html"
      },
      {
        "id": "webgpu_lights_ies_spotlight",
        "title": "Lights Ies Spotlight",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_lights_ies_spotlight.html"
      },
      {
        "id": "webgpu_lights_phong",
        "title": "Lights Phong",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_lights_phong.html"
      },
      {
        "id": "webgpu_lights_physical",
        "title": "Lights Physical",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_lights_physical.html"
      },
      {
        "id": "webgpu_lights_pointlights",
        "title": "Lights Pointlights",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_lights_pointlights.html"
      },
      {
        "id": "webgpu_lights_projector",
        "title": "Lights Projector",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_lights_projector.html"
      },
      {
        "id": "webgpu_lights_rectarealight",
        "title": "Lights Rectarealight",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_lights_rectarealight.html"
      },
      {
        "id": "webgpu_lights_selective",
        "title": "Lights Selective",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_lights_selective.html"
      },
      {
        "id": "webgpu_lights_spotlight",
        "title": "Lights Spotlight",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_lights_spotlight.html"
      },
      {
        "id": "webgpu_lines_fat_raycasting",
        "title": "Lines Fat Raycasting",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_lines_fat_raycasting.html"
      },
      {
        "id": "webgpu_lines_fat_wireframe",
        "title": "Lines Fat Wireframe",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_lines_fat_wireframe.html"
      },
      {
        "id": "webgpu_lines_fat",
        "title": "Lines Fat",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_lines_fat.html"
      },
      {
        "id": "webgpu_loader_gltf",
        "title": "Loader Gltf",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_loader_gltf.html"
      },
      {
        "id": "webgpu_loader_gltf_anisotropy",
        "title": "Loader Gltf Anisotropy",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_loader_gltf_anisotropy.html"
      },
      {
        "id": "webgpu_loader_gltf_compressed",
        "title": "Loader Gltf Compressed",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_loader_gltf_compressed.html"
      },
      {
        "id": "webgpu_loader_gltf_dispersion",
        "title": "Loader Gltf Dispersion",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_loader_gltf_dispersion.html"
      },
      {
        "id": "webgpu_loader_gltf_iridescence",
        "title": "Loader Gltf Iridescence",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_loader_gltf_iridescence.html"
      },
      {
        "id": "webgpu_loader_gltf_sheen",
        "title": "Loader Gltf Sheen",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_loader_gltf_sheen.html"
      },
      {
        "id": "webgpu_loader_gltf_transmission",
        "title": "Loader Gltf Transmission",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_loader_gltf_transmission.html"
      },
      {
        "id": "webgpu_loader_materialx",
        "title": "Loader Materialx",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_loader_materialx.html"
      },
      {
        "id": "webgpu_loader_texture_ktx2",
        "title": "Loader Texture Ktx2",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_loader_texture_ktx2.html"
      },
      {
        "id": "webgpu_materials",
        "title": "Materials",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_materials.html"
      },
      {
        "id": "webgpu_materials_alphahash",
        "title": "Materials Alphahash",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_materials_alphahash.html"
      },
      {
        "id": "webgpu_materials_arrays",
        "title": "Materials Arrays",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_materials_arrays.html"
      },
      {
        "id": "webgpu_materials_basic",
        "title": "Materials Basic",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_materials_basic.html"
      },
      {
        "id": "webgpu_materials_cubemap_mipmaps",
        "title": "Materials Cubemap Mipmaps",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_materials_cubemap_mipmaps.html"
      },
      {
        "id": "webgpu_materials_displacementmap",
        "title": "Materials Displacementmap",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_materials_displacementmap.html"
      },
      {
        "id": "webgpu_materials_envmaps_bpcem",
        "title": "Materials Envmaps Bpcem",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_materials_envmaps_bpcem.html"
      },
      {
        "id": "webgpu_materials_envmaps_groundprojected",
        "title": "Materials Envmaps Groundprojected",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_materials_envmaps_groundprojected.html"
      },
      {
        "id": "webgpu_materials_envmaps",
        "title": "Materials Envmaps",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_materials_envmaps.html"
      },
      {
        "id": "webgpu_materials_lightmap",
        "title": "Materials Lightmap",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_materials_lightmap.html"
      },
      {
        "id": "webgpu_materials_matcap",
        "title": "Materials Matcap",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_materials_matcap.html"
      },
      {
        "id": "webgpu_materials_sss",
        "title": "Materials Sss",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_materials_sss.html"
      },
      {
        "id": "webgpu_materials_texture_html",
        "title": "Materials Texture Html",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_materials_texture_html.html"
      },
      {
        "id": "webgpu_materials_texture_manualmipmap",
        "title": "Materials Texture Manualmipmap",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_materials_texture_manualmipmap.html"
      },
      {
        "id": "webgpu_materials_transmission",
        "title": "Materials Transmission",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_materials_transmission.html"
      },
      {
        "id": "webgpu_materials_toon",
        "title": "Materials Toon",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_materials_toon.html"
      },
      {
        "id": "webgpu_materials_video",
        "title": "Materials Video",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_materials_video.html"
      },
      {
        "id": "webgpu_materialx_noise",
        "title": "Materialx Noise",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_materialx_noise.html"
      },
      {
        "id": "webgpu_mesh_batch",
        "title": "Mesh Batch",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_mesh_batch.html"
      },
      {
        "id": "webgpu_mirror",
        "title": "Mirror",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_mirror.html"
      },
      {
        "id": "webgpu_modifier_curve",
        "title": "Modifier Curve",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_modifier_curve.html"
      },
      {
        "id": "webgpu_morphtargets",
        "title": "Morphtargets",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_morphtargets.html"
      },
      {
        "id": "webgpu_morphtargets_face",
        "title": "Morphtargets Face",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_morphtargets_face.html"
      },
      {
        "id": "webgpu_mrt",
        "title": "Mrt",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_mrt.html"
      },
      {
        "id": "webgpu_multiple_canvas",
        "title": "Multiple Canvas",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_multiple_canvas.html"
      },
      {
        "id": "webgpu_multiple_elements",
        "title": "Multiple Elements",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_multiple_elements.html"
      },
      {
        "id": "webgpu_mrt_mask",
        "title": "Mrt Mask",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_mrt_mask.html"
      },
      {
        "id": "webgpu_multiple_rendertargets",
        "title": "Multiple Rendertargets",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_multiple_rendertargets.html"
      },
      {
        "id": "webgpu_multiple_rendertargets_readback",
        "title": "Multiple Rendertargets Readback",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_multiple_rendertargets_readback.html"
      },
      {
        "id": "webgpu_multisampled_renderbuffers",
        "title": "Multisampled Renderbuffers",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_multisampled_renderbuffers.html"
      },
      {
        "id": "webgpu_occlusion",
        "title": "Occlusion",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_occlusion.html"
      },
      {
        "id": "webgpu_ocean",
        "title": "Ocean",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_ocean.html"
      },
      {
        "id": "webgpu_parallax_uv",
        "title": "Parallax Uv",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_parallax_uv.html"
      },
      {
        "id": "webgpu_particles",
        "title": "Particles",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_particles.html"
      },
      {
        "id": "webgpu_performance",
        "title": "Performance",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_performance.html"
      },
      {
        "id": "webgpu_performance_renderbundle",
        "title": "Performance Renderbundle",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_performance_renderbundle.html"
      },
      {
        "id": "webgpu_pmrem_cubemap",
        "title": "Pmrem Cubemap",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_pmrem_cubemap.html"
      },
      {
        "id": "webgpu_pmrem_equirectangular",
        "title": "Pmrem Equirectangular",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_pmrem_equirectangular.html"
      },
      {
        "id": "webgpu_pmrem_scene",
        "title": "Pmrem Scene",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_pmrem_scene.html"
      },
      {
        "id": "webgpu_pmrem_test",
        "title": "Pmrem Test",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_pmrem_test.html"
      },
      {
        "id": "webgpu_portal",
        "title": "Portal",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_portal.html"
      },
      {
        "id": "webgpu_postprocessing_3dlut",
        "title": "Postprocessing 3dlut",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_postprocessing_3dlut.html"
      },
      {
        "id": "webgpu_postprocessing_afterimage",
        "title": "Postprocessing Afterimage",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_postprocessing_afterimage.html"
      },
      {
        "id": "webgpu_postprocessing_anamorphic",
        "title": "Postprocessing Anamorphic",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_postprocessing_anamorphic.html"
      },
      {
        "id": "webgpu_postprocessing_ao",
        "title": "Postprocessing Ao",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_postprocessing_ao.html"
      },
      {
        "id": "webgpu_postprocessing_bloom",
        "title": "Postprocessing Bloom",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_postprocessing_bloom.html"
      },
      {
        "id": "webgpu_postprocessing_bloom_emissive",
        "title": "Postprocessing Bloom Emissive",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_postprocessing_bloom_emissive.html"
      },
      {
        "id": "webgpu_postprocessing_bloom_selective",
        "title": "Postprocessing Bloom Selective",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_postprocessing_bloom_selective.html"
      },
      {
        "id": "webgpu_postprocessing_difference",
        "title": "Postprocessing Difference",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_postprocessing_difference.html"
      },
      {
        "id": "webgpu_postprocessing_dof",
        "title": "Postprocessing Dof",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_postprocessing_dof.html"
      },
      {
        "id": "webgpu_postprocessing_dof_basic",
        "title": "Postprocessing Dof Basic",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_postprocessing_dof_basic.html"
      },
      {
        "id": "webgpu_postprocessing_fxaa",
        "title": "Postprocessing Fxaa",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_postprocessing_fxaa.html"
      },
      {
        "id": "webgpu_postprocessing_godrays",
        "title": "Postprocessing Godrays",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_postprocessing_godrays.html"
      },
      {
        "id": "webgpu_postprocessing_lensflare",
        "title": "Postprocessing Lensflare",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_postprocessing_lensflare.html"
      },
      {
        "id": "webgpu_postprocessing_masking",
        "title": "Postprocessing Masking",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_postprocessing_masking.html"
      },
      {
        "id": "webgpu_postprocessing_ca",
        "title": "Postprocessing Ca",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_postprocessing_ca.html"
      },
      {
        "id": "webgpu_postprocessing_motion_blur",
        "title": "Postprocessing Motion Blur",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_postprocessing_motion_blur.html"
      },
      {
        "id": "webgpu_postprocessing_outline",
        "title": "Postprocessing Outline",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_postprocessing_outline.html"
      },
      {
        "id": "webgpu_postprocessing_pixel",
        "title": "Postprocessing Pixel",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_postprocessing_pixel.html"
      },
      {
        "id": "webgpu_postprocessing_radial_blur",
        "title": "Postprocessing Radial Blur",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_postprocessing_radial_blur.html"
      },
      {
        "id": "webgpu_postprocessing_retro",
        "title": "Postprocessing Retro",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_postprocessing_retro.html"
      },
      {
        "id": "webgpu_postprocessing_smaa",
        "title": "Postprocessing Smaa",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_postprocessing_smaa.html"
      },
      {
        "id": "webgpu_postprocessing_sobel",
        "title": "Postprocessing Sobel",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_postprocessing_sobel.html"
      },
      {
        "id": "webgpu_postprocessing_ssaa",
        "title": "Postprocessing Ssaa",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_postprocessing_ssaa.html"
      },
      {
        "id": "webgpu_postprocessing_ssgi",
        "title": "Postprocessing Ssgi",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_postprocessing_ssgi.html"
      },
      {
        "id": "webgpu_postprocessing_ssgi_ballpool",
        "title": "Postprocessing Ssgi Ballpool",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_postprocessing_ssgi_ballpool.html"
      },
      {
        "id": "webgpu_postprocessing_ssr",
        "title": "Postprocessing Ssr",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_postprocessing_ssr.html"
      },
      {
        "id": "webgpu_postprocessing_ssr_denoise",
        "title": "Postprocessing Ssr Denoise",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_postprocessing_ssr_denoise.html"
      },
      {
        "id": "webgpu_postprocessing_sss",
        "title": "Postprocessing Sss",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_postprocessing_sss.html"
      },
      {
        "id": "webgpu_postprocessing_traa",
        "title": "Postprocessing Traa",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_postprocessing_traa.html"
      },
      {
        "id": "webgpu_postprocessing_transition",
        "title": "Postprocessing Transition",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_postprocessing_transition.html"
      },
      {
        "id": "webgpu_postprocessing",
        "title": "Postprocessing",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_postprocessing.html"
      },
      {
        "id": "webgpu_procedural_texture",
        "title": "Procedural Texture",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_procedural_texture.html"
      },
      {
        "id": "webgpu_reflection",
        "title": "Reflection",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_reflection.html"
      },
      {
        "id": "webgpu_reflection_blurred",
        "title": "Reflection Blurred",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_reflection_blurred.html"
      },
      {
        "id": "webgpu_reflection_roughness",
        "title": "Reflection Roughness",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_reflection_roughness.html"
      },
      {
        "id": "webgpu_refraction",
        "title": "Refraction",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_refraction.html"
      },
      {
        "id": "webgpu_rendertarget_2d-array_3d",
        "title": "Rendertarget 2d-array 3d",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_rendertarget_2d-array_3d.html"
      },
      {
        "id": "webgpu_reversed_depth_buffer",
        "title": "Reversed Depth Buffer",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_reversed_depth_buffer.html"
      },
      {
        "id": "webgpu_rtt",
        "title": "Rtt",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_rtt.html"
      },
      {
        "id": "webgpu_sandbox",
        "title": "Sandbox",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_sandbox.html"
      },
      {
        "id": "webgpu_shadertoy",
        "title": "Shadertoy",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_shadertoy.html"
      },
      {
        "id": "webgpu_shadow_contact",
        "title": "Shadow Contact",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_shadow_contact.html"
      },
      {
        "id": "webgpu_shadowmap",
        "title": "Shadowmap",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_shadowmap.html"
      },
      {
        "id": "webgpu_shadowmap_array",
        "title": "Shadowmap Array",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_shadowmap_array.html"
      },
      {
        "id": "webgpu_shadowmap_csm",
        "title": "Shadowmap Csm",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_shadowmap_csm.html"
      },
      {
        "id": "webgpu_shadowmap_opacity",
        "title": "Shadowmap Opacity",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_shadowmap_opacity.html"
      },
      {
        "id": "webgpu_shadowmap_pointlight",
        "title": "Shadowmap Pointlight",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_shadowmap_pointlight.html"
      },
      {
        "id": "webgpu_shadowmap_progressive",
        "title": "Shadowmap Progressive",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_shadowmap_progressive.html"
      },
      {
        "id": "webgpu_shadowmap_vsm",
        "title": "Shadowmap Vsm",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_shadowmap_vsm.html"
      },
      {
        "id": "webgpu_skinning",
        "title": "Skinning",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_skinning.html"
      },
      {
        "id": "webgpu_skinning_instancing",
        "title": "Skinning Instancing",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_skinning_instancing.html"
      },
      {
        "id": "webgpu_skinning_instancing_individual",
        "title": "Skinning Instancing Individual",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_skinning_instancing_individual.html"
      },
      {
        "id": "webgpu_skinning_points",
        "title": "Skinning Points",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_skinning_points.html"
      },
      {
        "id": "webgpu_sky",
        "title": "Sky",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_sky.html"
      },
      {
        "id": "webgpu_sprites",
        "title": "Sprites",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_sprites.html"
      },
      {
        "id": "webgpu_storage_buffer",
        "title": "Storage Buffer",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_storage_buffer.html"
      },
      {
        "id": "webgpu_struct_drawindirect",
        "title": "Struct Drawindirect",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_struct_drawindirect.html"
      },
      {
        "id": "webgpu_test_memory",
        "title": "Test Memory",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_test_memory.html"
      },
      {
        "id": "webgpu_texturegather",
        "title": "Texturegather",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_texturegather.html"
      },
      {
        "id": "webgpu_texturegrad",
        "title": "Texturegrad",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_texturegrad.html"
      },
      {
        "id": "webgpu_textures_2d-array",
        "title": "Textures 2d-array",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_textures_2d-array.html"
      },
      {
        "id": "webgpu_textures_2d-array_compressed",
        "title": "Textures 2d-array Compressed",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_textures_2d-array_compressed.html"
      },
      {
        "id": "webgpu_textures_anisotropy",
        "title": "Textures Anisotropy",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_textures_anisotropy.html"
      },
      {
        "id": "webgpu_textures_partialupdate",
        "title": "Textures Partialupdate",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_textures_partialupdate.html"
      },
      {
        "id": "webgpu_tonemapping",
        "title": "Tonemapping",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_tonemapping.html"
      },
      {
        "id": "webgpu_tsl_angular_slicing",
        "title": "Tsl Angular Slicing",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_tsl_angular_slicing.html"
      },
      {
        "id": "webgpu_tsl_compute_attractors_particles",
        "title": "Tsl Compute Attractors Particles",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_tsl_compute_attractors_particles.html"
      },
      {
        "id": "webgpu_tsl_earth",
        "title": "Tsl Earth",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_tsl_earth.html"
      },
      {
        "id": "webgpu_tsl_editor",
        "title": "Tsl Editor",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_tsl_editor.html"
      },
      {
        "id": "webgpu_tsl_galaxy",
        "title": "Tsl Galaxy",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_tsl_galaxy.html"
      },
      {
        "id": "webgpu_tsl_graph",
        "title": "Tsl Graph",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_tsl_graph.html"
      },
      {
        "id": "webgpu_tsl_halftone",
        "title": "Tsl Halftone",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_tsl_halftone.html"
      },
      {
        "id": "webgpu_tsl_interoperability",
        "title": "Tsl Interoperability",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_tsl_interoperability.html"
      },
      {
        "id": "webgpu_tsl_procedural_terrain",
        "title": "Tsl Procedural Terrain",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_tsl_procedural_terrain.html"
      },
      {
        "id": "webgpu_tsl_raging_sea",
        "title": "Tsl Raging Sea",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_tsl_raging_sea.html"
      },
      {
        "id": "webgpu_tsl_transpiler",
        "title": "Tsl Transpiler",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_tsl_transpiler.html"
      },
      {
        "id": "webgpu_tsl_vfx_flames",
        "title": "Tsl Vfx Flames",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_tsl_vfx_flames.html"
      },
      {
        "id": "webgpu_tsl_vfx_linkedparticles",
        "title": "Tsl Vfx Linkedparticles",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_tsl_vfx_linkedparticles.html"
      },
      {
        "id": "webgpu_tsl_vfx_tornado",
        "title": "Tsl Vfx Tornado",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_tsl_vfx_tornado.html"
      },
      {
        "id": "webgpu_tsl_wood",
        "title": "Tsl Wood",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_tsl_wood.html"
      },
      {
        "id": "webgpu_upscaling_fsr1",
        "title": "Upscaling Fsr1",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_upscaling_fsr1.html"
      },
      {
        "id": "webgpu_upscaling_taau",
        "title": "Upscaling Taau",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_upscaling_taau.html"
      },
      {
        "id": "webgpu_video_frame",
        "title": "Video Frame",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_video_frame.html"
      },
      {
        "id": "webgpu_video_panorama",
        "title": "Video Panorama",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_video_panorama.html"
      },
      {
        "id": "webgpu_volume_caustics",
        "title": "Volume Caustics",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_volume_caustics.html"
      },
      {
        "id": "webgpu_volume_cloud",
        "title": "Volume Cloud",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_volume_cloud.html"
      },
      {
        "id": "webgpu_volume_fire",
        "title": "Volume Fire",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_volume_fire.html"
      },
      {
        "id": "webgpu_volume_lighting",
        "title": "Volume Lighting",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_volume_lighting.html"
      },
      {
        "id": "webgpu_volume_lighting_rectarea",
        "title": "Volume Lighting Rectarea",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_volume_lighting_rectarea.html"
      },
      {
        "id": "webgpu_volume_lighting_traa",
        "title": "Volume Lighting Traa",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_volume_lighting_traa.html"
      },
      {
        "id": "webgpu_volume_perlin",
        "title": "Volume Perlin",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_volume_perlin.html"
      },
      {
        "id": "webgpu_water",
        "title": "Water",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_water.html"
      },
      {
        "id": "webgpu_xr_rollercoaster",
        "title": "Xr Rollercoaster",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_xr_rollercoaster.html"
      },
      {
        "id": "webgpu_xr_cubes",
        "title": "Xr Cubes",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_xr_cubes.html"
      },
      {
        "id": "webgpu_xr_native_layers",
        "title": "Xr Native Layers",
        "category": "webgpu (wip)",
        "url": "https://threejs.org/examples/webgpu_xr_native_layers.html"
      }
    ]
  },
  {
    "name": "webaudio",
    "count": 4,
    "items": [
      {
        "id": "webaudio_orientation",
        "title": "Orientation",
        "category": "webaudio",
        "url": "https://threejs.org/examples/webaudio_orientation.html"
      },
      {
        "id": "webaudio_sandbox",
        "title": "Sandbox",
        "category": "webaudio",
        "url": "https://threejs.org/examples/webaudio_sandbox.html"
      },
      {
        "id": "webaudio_timing",
        "title": "Timing",
        "category": "webaudio",
        "url": "https://threejs.org/examples/webaudio_timing.html"
      },
      {
        "id": "webaudio_visualizer",
        "title": "Visualizer",
        "category": "webaudio",
        "url": "https://threejs.org/examples/webaudio_visualizer.html"
      }
    ]
  },
  {
    "name": "webxr",
    "count": 26,
    "items": [
      {
        "id": "webxr_ar_camera_access",
        "title": "Ar Camera Access",
        "category": "webxr",
        "url": "https://threejs.org/examples/webxr_ar_camera_access.html"
      },
      {
        "id": "webxr_ar_cones",
        "title": "Ar Cones",
        "category": "webxr",
        "url": "https://threejs.org/examples/webxr_ar_cones.html"
      },
      {
        "id": "webxr_ar_hittest",
        "title": "Ar Hittest",
        "category": "webxr",
        "url": "https://threejs.org/examples/webxr_ar_hittest.html"
      },
      {
        "id": "webxr_ar_lighting",
        "title": "Ar Lighting",
        "category": "webxr",
        "url": "https://threejs.org/examples/webxr_ar_lighting.html"
      },
      {
        "id": "webxr_ar_plane_detection",
        "title": "Ar Plane Detection",
        "category": "webxr",
        "url": "https://threejs.org/examples/webxr_ar_plane_detection.html"
      },
      {
        "id": "webxr_vr_handinput",
        "title": "Vr Handinput",
        "category": "webxr",
        "url": "https://threejs.org/examples/webxr_vr_handinput.html"
      },
      {
        "id": "webxr_vr_handinput_cubes",
        "title": "Vr Handinput Cubes",
        "category": "webxr",
        "url": "https://threejs.org/examples/webxr_vr_handinput_cubes.html"
      },
      {
        "id": "webxr_vr_handinput_profiles",
        "title": "Vr Handinput Profiles",
        "category": "webxr",
        "url": "https://threejs.org/examples/webxr_vr_handinput_profiles.html"
      },
      {
        "id": "webxr_vr_handinput_pointerclick",
        "title": "Vr Handinput Pointerclick",
        "category": "webxr",
        "url": "https://threejs.org/examples/webxr_vr_handinput_pointerclick.html"
      },
      {
        "id": "webxr_vr_handinput_pointerdrag",
        "title": "Vr Handinput Pointerdrag",
        "category": "webxr",
        "url": "https://threejs.org/examples/webxr_vr_handinput_pointerdrag.html"
      },
      {
        "id": "webxr_vr_handinput_pressbutton",
        "title": "Vr Handinput Pressbutton",
        "category": "webxr",
        "url": "https://threejs.org/examples/webxr_vr_handinput_pressbutton.html"
      },
      {
        "id": "webxr_vr_layers",
        "title": "Vr Layers",
        "category": "webxr",
        "url": "https://threejs.org/examples/webxr_vr_layers.html"
      },
      {
        "id": "webxr_vr_panorama",
        "title": "Vr Panorama",
        "category": "webxr",
        "url": "https://threejs.org/examples/webxr_vr_panorama.html"
      },
      {
        "id": "webxr_vr_panorama_depth",
        "title": "Vr Panorama Depth",
        "category": "webxr",
        "url": "https://threejs.org/examples/webxr_vr_panorama_depth.html"
      },
      {
        "id": "webxr_vr_rollercoaster",
        "title": "Vr Rollercoaster",
        "category": "webxr",
        "url": "https://threejs.org/examples/webxr_vr_rollercoaster.html"
      },
      {
        "id": "webxr_vr_sandbox",
        "title": "Vr Sandbox",
        "category": "webxr",
        "url": "https://threejs.org/examples/webxr_vr_sandbox.html"
      },
      {
        "id": "webxr_vr_teleport",
        "title": "Vr Teleport",
        "category": "webxr",
        "url": "https://threejs.org/examples/webxr_vr_teleport.html"
      },
      {
        "id": "webxr_vr_video",
        "title": "Vr Video",
        "category": "webxr",
        "url": "https://threejs.org/examples/webxr_vr_video.html"
      },
      {
        "id": "webxr_xr_ballshooter",
        "title": "Xr Ballshooter",
        "category": "webxr",
        "url": "https://threejs.org/examples/webxr_xr_ballshooter.html"
      },
      {
        "id": "webxr_xr_controls_transform",
        "title": "Xr Controls Transform",
        "category": "webxr",
        "url": "https://threejs.org/examples/webxr_xr_controls_transform.html"
      },
      {
        "id": "webxr_xr_cubes",
        "title": "Xr Cubes",
        "category": "webxr",
        "url": "https://threejs.org/examples/webxr_xr_cubes.html"
      },
      {
        "id": "webxr_xr_dragging",
        "title": "Xr Dragging",
        "category": "webxr",
        "url": "https://threejs.org/examples/webxr_xr_dragging.html"
      },
      {
        "id": "webxr_xr_dragging_custom_depth",
        "title": "Xr Dragging Custom Depth",
        "category": "webxr",
        "url": "https://threejs.org/examples/webxr_xr_dragging_custom_depth.html"
      },
      {
        "id": "webxr_xr_haptics",
        "title": "Xr Haptics",
        "category": "webxr",
        "url": "https://threejs.org/examples/webxr_xr_haptics.html"
      },
      {
        "id": "webxr_xr_marchingcubes",
        "title": "Xr Marchingcubes",
        "category": "webxr",
        "url": "https://threejs.org/examples/webxr_xr_marchingcubes.html"
      },
      {
        "id": "webxr_xr_paint",
        "title": "Xr Paint",
        "category": "webxr",
        "url": "https://threejs.org/examples/webxr_xr_paint.html"
      }
    ]
  },
  {
    "name": "games",
    "count": 1,
    "items": [
      {
        "id": "games_fps",
        "title": "Fps",
        "category": "games",
        "url": "https://threejs.org/examples/games_fps.html"
      }
    ]
  },
  {
    "name": "physics",
    "count": 13,
    "items": [
      {
        "id": "physics_ammo_break",
        "title": "Ammo Break",
        "category": "physics",
        "url": "https://threejs.org/examples/physics_ammo_break.html"
      },
      {
        "id": "physics_ammo_cloth",
        "title": "Ammo Cloth",
        "category": "physics",
        "url": "https://threejs.org/examples/physics_ammo_cloth.html"
      },
      {
        "id": "physics_ammo_instancing",
        "title": "Ammo Instancing",
        "category": "physics",
        "url": "https://threejs.org/examples/physics_ammo_instancing.html"
      },
      {
        "id": "physics_ammo_rope",
        "title": "Ammo Rope",
        "category": "physics",
        "url": "https://threejs.org/examples/physics_ammo_rope.html"
      },
      {
        "id": "physics_ammo_terrain",
        "title": "Ammo Terrain",
        "category": "physics",
        "url": "https://threejs.org/examples/physics_ammo_terrain.html"
      },
      {
        "id": "physics_ammo_volume",
        "title": "Ammo Volume",
        "category": "physics",
        "url": "https://threejs.org/examples/physics_ammo_volume.html"
      },
      {
        "id": "physics_jolt_instancing",
        "title": "Jolt Instancing",
        "category": "physics",
        "url": "https://threejs.org/examples/physics_jolt_instancing.html"
      },
      {
        "id": "physics_rapier_basic",
        "title": "Rapier Basic",
        "category": "physics",
        "url": "https://threejs.org/examples/physics_rapier_basic.html"
      },
      {
        "id": "physics_rapier_instancing",
        "title": "Rapier Instancing",
        "category": "physics",
        "url": "https://threejs.org/examples/physics_rapier_instancing.html"
      },
      {
        "id": "physics_rapier_joints",
        "title": "Rapier Joints",
        "category": "physics",
        "url": "https://threejs.org/examples/physics_rapier_joints.html"
      },
      {
        "id": "physics_rapier_character_controller",
        "title": "Rapier Character Controller",
        "category": "physics",
        "url": "https://threejs.org/examples/physics_rapier_character_controller.html"
      },
      {
        "id": "physics_rapier_vehicle_controller",
        "title": "Rapier Vehicle Controller",
        "category": "physics",
        "url": "https://threejs.org/examples/physics_rapier_vehicle_controller.html"
      },
      {
        "id": "physics_rapier_terrain",
        "title": "Rapier Terrain",
        "category": "physics",
        "url": "https://threejs.org/examples/physics_rapier_terrain.html"
      }
    ]
  },
  {
    "name": "misc",
    "count": 22,
    "items": [
      {
        "id": "misc_animation_groups",
        "title": "Animation Groups",
        "category": "misc",
        "url": "https://threejs.org/examples/misc_animation_groups.html"
      },
      {
        "id": "misc_animation_keys",
        "title": "Animation Keys",
        "category": "misc",
        "url": "https://threejs.org/examples/misc_animation_keys.html"
      },
      {
        "id": "misc_boxselection",
        "title": "Boxselection",
        "category": "misc",
        "url": "https://threejs.org/examples/misc_boxselection.html"
      },
      {
        "id": "misc_controls_arcball",
        "title": "Controls Arcball",
        "category": "misc",
        "url": "https://threejs.org/examples/misc_controls_arcball.html"
      },
      {
        "id": "misc_controls_drag",
        "title": "Controls Drag",
        "category": "misc",
        "url": "https://threejs.org/examples/misc_controls_drag.html"
      },
      {
        "id": "misc_controls_fly",
        "title": "Controls Fly",
        "category": "misc",
        "url": "https://threejs.org/examples/misc_controls_fly.html"
      },
      {
        "id": "misc_controls_map",
        "title": "Controls Map",
        "category": "misc",
        "url": "https://threejs.org/examples/misc_controls_map.html"
      },
      {
        "id": "misc_controls_orbit",
        "title": "Controls Orbit",
        "category": "misc",
        "url": "https://threejs.org/examples/misc_controls_orbit.html"
      },
      {
        "id": "misc_controls_pointerlock",
        "title": "Controls Pointerlock",
        "category": "misc",
        "url": "https://threejs.org/examples/misc_controls_pointerlock.html"
      },
      {
        "id": "misc_controls_trackball",
        "title": "Controls Trackball",
        "category": "misc",
        "url": "https://threejs.org/examples/misc_controls_trackball.html"
      },
      {
        "id": "misc_controls_transform",
        "title": "Controls Transform",
        "category": "misc",
        "url": "https://threejs.org/examples/misc_controls_transform.html"
      },
      {
        "id": "misc_exporter_draco",
        "title": "Exporter Draco",
        "category": "misc",
        "url": "https://threejs.org/examples/misc_exporter_draco.html"
      },
      {
        "id": "misc_exporter_gcode",
        "title": "Exporter Gcode",
        "category": "misc",
        "url": "https://threejs.org/examples/misc_exporter_gcode.html"
      },
      {
        "id": "misc_exporter_gltf",
        "title": "Exporter Gltf",
        "category": "misc",
        "url": "https://threejs.org/examples/misc_exporter_gltf.html"
      },
      {
        "id": "misc_exporter_gltf_normals",
        "title": "Exporter Gltf Normals",
        "category": "misc",
        "url": "https://threejs.org/examples/misc_exporter_gltf_normals.html"
      },
      {
        "id": "misc_exporter_obj",
        "title": "Exporter Obj",
        "category": "misc",
        "url": "https://threejs.org/examples/misc_exporter_obj.html"
      },
      {
        "id": "misc_exporter_ply",
        "title": "Exporter Ply",
        "category": "misc",
        "url": "https://threejs.org/examples/misc_exporter_ply.html"
      },
      {
        "id": "misc_exporter_stl",
        "title": "Exporter Stl",
        "category": "misc",
        "url": "https://threejs.org/examples/misc_exporter_stl.html"
      },
      {
        "id": "misc_exporter_usdz",
        "title": "Exporter Usdz",
        "category": "misc",
        "url": "https://threejs.org/examples/misc_exporter_usdz.html"
      },
      {
        "id": "misc_exporter_exr",
        "title": "Exporter Exr",
        "category": "misc",
        "url": "https://threejs.org/examples/misc_exporter_exr.html"
      },
      {
        "id": "misc_exporter_ktx2",
        "title": "Exporter Ktx2",
        "category": "misc",
        "url": "https://threejs.org/examples/misc_exporter_ktx2.html"
      },
      {
        "id": "misc_raycaster_helper",
        "title": "Raycaster Helper",
        "category": "misc",
        "url": "https://threejs.org/examples/misc_raycaster_helper.html"
      }
    ]
  },
  {
    "name": "css2d",
    "count": 1,
    "items": [
      {
        "id": "css2d_label",
        "title": "Label",
        "category": "css2d",
        "url": "https://threejs.org/examples/css2d_label.html"
      }
    ]
  },
  {
    "name": "css3d",
    "count": 7,
    "items": [
      {
        "id": "css3d_mixed",
        "title": "Mixed",
        "category": "css3d",
        "url": "https://threejs.org/examples/css3d_mixed.html"
      },
      {
        "id": "css3d_molecules",
        "title": "Molecules",
        "category": "css3d",
        "url": "https://threejs.org/examples/css3d_molecules.html"
      },
      {
        "id": "css3d_orthographic",
        "title": "Orthographic",
        "category": "css3d",
        "url": "https://threejs.org/examples/css3d_orthographic.html"
      },
      {
        "id": "css3d_periodictable",
        "title": "Periodictable",
        "category": "css3d",
        "url": "https://threejs.org/examples/css3d_periodictable.html"
      },
      {
        "id": "css3d_sandbox",
        "title": "Sandbox",
        "category": "css3d",
        "url": "https://threejs.org/examples/css3d_sandbox.html"
      },
      {
        "id": "css3d_sprites",
        "title": "Sprites",
        "category": "css3d",
        "url": "https://threejs.org/examples/css3d_sprites.html"
      },
      {
        "id": "css3d_youtube",
        "title": "Youtube",
        "category": "css3d",
        "url": "https://threejs.org/examples/css3d_youtube.html"
      }
    ]
  },
  {
    "name": "svg",
    "count": 2,
    "items": [
      {
        "id": "svg_lines",
        "title": "Lines",
        "category": "svg",
        "url": "https://threejs.org/examples/svg_lines.html"
      },
      {
        "id": "svg_sandbox",
        "title": "Sandbox",
        "category": "svg",
        "url": "https://threejs.org/examples/svg_sandbox.html"
      }
    ]
  },
  {
    "name": "tests",
    "count": 2,
    "items": [
      {
        "id": "webgl_furnace_test",
        "title": "Furnace Test",
        "category": "tests",
        "url": "https://threejs.org/examples/webgl_furnace_test.html"
      },
      {
        "id": "misc_uv_tests",
        "title": "Uv Tests",
        "category": "tests",
        "url": "https://threejs.org/examples/misc_uv_tests.html"
      }
    ]
  }
];

export const ALL_THREE_EXAMPLES: ThreeExampleItem[] = THREE_CATEGORIES.flatMap(c => c.items);
