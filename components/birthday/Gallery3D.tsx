"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { RotateCw, Smartphone } from "lucide-react";
import * as THREE from "three";

type Memory = {
  url: string;
  message?: string;
};

function getTextureSize(texture: THREE.Texture) {
  const image = texture.image as { width?: number; height?: number } | undefined;
  const imageWidth = image?.width || 1;
  const imageHeight = image?.height || 1;
  const aspect = imageWidth / imageHeight;
  const maxWidth = 3.5;
  const maxHeight = 3;

  if (aspect >= maxWidth / maxHeight) {
    return { width: maxWidth, height: maxWidth / aspect };
  }

  return { width: maxHeight * aspect, height: maxHeight };
}

function GalleryPhoto({
  texture,
  memory,
  radius,
  angle,
  yPos,
  width,
  height,
  onClick,
}: {
  texture: THREE.Texture;
  memory: Memory;
  radius: number;
  angle: number;
  yPos: number;
  width: number;
  height: number;
  onClick: (memory: Memory) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const x = Math.sin(angle) * radius;
  const z = -Math.cos(angle) * radius;

  return (
    <mesh
      ref={meshRef}
      position={[x, yPos, z]}
      rotation={[0, -angle, 0]}
      onClick={(event) => {
        event.stopPropagation();
        onClick(memory);
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(event) => {
        event.stopPropagation();
        document.body.style.cursor = "auto";
      }}
    >
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
    </mesh>
  );
}

function PhotoWall({
  memories,
  onImageClick,
}: {
  memories: Memory[];
  onImageClick: (memory: Memory) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const memoryObjects = useMemo(
    () => memories.map((memory) => (typeof memory === "string" ? { url: memory, message: "" } : memory)),
    [memories]
  );
  const textures = useTexture(memoryObjects.map((memory) => memory.url));
  const textureArray = Array.isArray(textures) ? textures : [textures];

  useEffect(() => {
    textureArray.forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
    });
  }, [textureArray]);

  const radius = 12;
  const photosPerRow = 14;
  const verticalGap = 0.5;
  const rowHeight = 3;
  const totalRows = 5;
  const totalSpots = photosPerRow * totalRows;

  const galleryItems = Array.from({ length: totalSpots }).map((_, index) => {
    const memory = memoryObjects[index % memoryObjects.length];
    const texture = textureArray[index % textureArray.length];
    const size = getTextureSize(texture);
    const row = Math.floor(index / photosPerRow);
    const col = index % photosPerRow;
    const angle = (col / photosPerRow) * Math.PI * 2;
    const yPos = (totalRows / 2 - row - 0.5) * (rowHeight + verticalGap);

    return { memory, texture, angle, yPos, width: size.width, height: size.height };
  });

  useFrame((state) => {
    if (groupRef.current) {
      const targetX = state.pointer.x * Math.PI * 0.8;
      const targetY = state.pointer.y * -0.3;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetY, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      {galleryItems.map((item, index) => (
        <GalleryPhoto
          key={index}
          memory={item.memory}
          texture={item.texture}
          radius={radius}
          angle={item.angle}
          yPos={item.yPos}
          width={item.width}
          height={item.height}
          onClick={onImageClick}
        />
      ))}
    </group>
  );
}

export default function Gallery3D({
  memories,
  onNext,
}: {
  memories: Memory[];
  onNext: () => void;
}) {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [mounted, setMounted] = useState(false);
  const [portraitPhone, setPortraitPhone] = useState(false);
  const [orientationHintDismissed, setOrientationHintDismissed] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.body.style.cursor = "auto";
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px) and (orientation: portrait)");
    const updateOrientation = () => setPortraitPhone(media.matches);
    updateOrientation();
    media.addEventListener("change", updateOrientation);
    return () => media.removeEventListener("change", updateOrientation);
  }, []);

  if (!memories || memories.length === 0) return null;

  const content = (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-[#ffdae0]">
      <Canvas camera={{ position: [0, 0, 0], fov: 75 }}>
        <ambientLight intensity={1} />
        <PhotoWall memories={memories} onImageClick={setSelectedMemory} />
      </Canvas>

      {portraitPhone && !orientationHintDismissed ? (
        <div className="absolute inset-0 z-[300] flex items-center justify-center bg-[#ffdae0]/95 px-6 text-center backdrop-blur-sm">
          <div className="flex max-w-sm flex-col items-center">
            <div className="relative h-28 w-28">
              <Smartphone className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rotate-90 text-[#9b7cf3]" />
              <RotateCw className="absolute right-0 top-0 h-9 w-9 text-[#d35c82]" />
            </div>
            <h2 className="mt-4 text-3xl font-black text-[#5c3a21]">Turn your phone sideways</h2>
            <p className="mt-3 text-base font-bold leading-6 text-[#5c3a21]/75">
              The 3D memory wall is easier to explore in landscape mode.
            </p>
            <button
              type="button"
              onClick={() => setOrientationHintDismissed(true)}
              className="mt-7 rounded-full bg-[#a2d2ff] px-7 py-3 font-black text-[#5c3a21] shadow-[0_6px_0_rgba(92,58,33,0.1)]"
            >
              Continue anyway
            </button>
          </div>
        </div>
      ) : null}

      <div className="pointer-events-none absolute left-1/2 top-8 z-10 w-full -translate-x-1/2 px-4 text-center text-[clamp(2rem,8vw,2.5rem)] font-black text-[#c8b6ff] drop-shadow-[2px_2px_0_#fff]">
        Your 3D Memory Wall
        <div className="mt-2 text-sm font-black uppercase tracking-[0.18em] text-[#5c3a21]">
          <span className="hidden sm:inline">Move mouse to explore</span>
          <span className="sm:hidden">Drag to explore</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onNext}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 rounded-full bg-[#a2d2ff] px-10 py-4 text-lg font-black text-[#5c3a21] shadow-[0_8px_0_rgba(92,58,33,0.1)] transition hover:translate-y-0.5"
      >
        Finish Surfing
      </button>

      {selectedMemory && (
        <div
          className="absolute inset-0 z-[200] flex items-center justify-center bg-black/60 p-6 backdrop-blur-md"
          onClick={() => setSelectedMemory(null)}
        >
          <div
            className="flex w-full max-w-lg flex-col items-center rounded-[24px] border-2 border-dashed border-[#ffb7c5] bg-[#fff9f0] p-4 shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selectedMemory.url}
              alt="Memory"
              className="max-h-[60vh] w-full rounded-2xl object-contain"
            />
            <p className="mt-6 whitespace-pre-wrap text-center text-xl font-black text-[#c8b6ff]">
              {selectedMemory.message || "A precious core memory with you!"}
            </p>
            <button
              type="button"
              onClick={() => setSelectedMemory(null)}
              className="mt-6 rounded-full bg-[#ffb7c5] px-10 py-3 text-lg font-black text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return mounted ? createPortal(content, document.body) : null;
}
