import React from "react";
import Image from "next/image";

const Globe: React.FC = () => {
  return (
    <>
      <style>
        {`
          @keyframes earthRotateComposited {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-400px, 0, 0); }
          }
          @keyframes twinkling { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
          @keyframes twinkling-slow { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
          @keyframes twinkling-long { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
          @keyframes twinkling-fast { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
        `}
      </style>
      <div className="flex items-center justify-center h-screen">
        <div className="relative w-[250px] h-[250px]">
          {/* Earth Spherical Globe with Hardware-Composited Transform Rotation */}
          <div className="relative w-[250px] h-[250px] rounded-full overflow-hidden select-none">
            {/* Sliding texture track running on GPU compositor thread */}
            <div
              className="flex w-[800px] h-full will-change-transform"
              style={{
                animation: "earthRotateComposited 30s linear infinite",
              }}
            >
              <Image
                src="/images/earth-map.jpg"
                alt="Earth Texture Map"
                width={400}
                height={250}
                priority
                className="w-[400px] h-[250px] object-cover shrink-0 select-none pointer-events-none"
              />
              <Image
                src="/images/earth-map.jpg"
                alt=""
                aria-hidden="true"
                width={400}
                height={250}
                priority
                className="w-[400px] h-[250px] object-cover shrink-0 select-none pointer-events-none"
              />
            </div>

            {/* Atmosphere & 3D Shading Spherical Inset Overlay */}
            <div
              className="pointer-events-none absolute inset-0 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2),-5px_0_8px_#c3f4ff_inset,15px_2px_25px_#000_inset,-24px_-2px_34px_#c3f4ff99_inset,250px_0_44px_#00000066_inset,150px_0_38px_#000000aa_inset]"
              aria-hidden="true"
            />
          </div>

          {/* Atmospheric Star Field */}
          <div
            className="absolute left-[-20px] top-[120px] w-1 h-1 bg-white rounded-full pointer-events-none"
            style={{ animation: "twinkling 3s infinite" }}
          />
          <div
            className="absolute left-[-40px] top-[30px] w-1 h-1 bg-white rounded-full pointer-events-none"
            style={{ animation: "twinkling-slow 2s infinite" }}
          />
          <div
            className="absolute left-[350px] top-[90px] w-1 h-1 bg-white rounded-full pointer-events-none"
            style={{ animation: "twinkling-long 4s infinite" }}
          />
          <div
            className="absolute left-[200px] top-[290px] w-1 h-1 bg-white rounded-full pointer-events-none"
            style={{ animation: "twinkling 3s infinite" }}
          />
          <div
            className="absolute left-[50px] top-[270px] w-1 h-1 bg-white rounded-full pointer-events-none"
            style={{ animation: "twinkling-fast 1.5s infinite" }}
          />
          <div
            className="absolute left-[250px] top-[-50px] w-1 h-1 bg-white rounded-full pointer-events-none"
            style={{ animation: "twinkling-long 4s infinite" }}
          />
          <div
            className="absolute left-[290px] top-[60px] w-1 h-1 bg-white rounded-full pointer-events-none"
            style={{ animation: "twinkling-slow 2s infinite" }}
          />
        </div>
      </div>
    </>
  );
};

export default Globe;
