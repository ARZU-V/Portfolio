import { useEffect, useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

interface HeroModelProps {
  path: string;
  scale?: number;
  position?: [number, number, number];
  onLoad?: () => void;
}

const Model = ({
  path,
  scale = 1,
  position = [0, 0, 0],
  onLoad,
}: HeroModelProps) => {
  const gltf = useGLTF(path, true);
  const modelRef = useRef<THREE.Group>(null);
  const scene = useMemo(() => gltf.scene.clone(), [gltf.scene]);
  const hasLogged = useRef(false);
  const hasCalledOnLoad = useRef(false);

  // FIXED: Stable rotation without position changes
  useFrame((state) => {
    if (modelRef.current) {
      // Consistent rotation speed
      modelRef.current.rotation.y += 0.003;
      // FIXED: Keep model at fixed position - no floating animation
      modelRef.current.position.set(position[0], position[1], position[2]);
    }
  });

  useEffect(() => {
    if (!hasLogged.current) {
      console.log("🔍 Loading model from:", path);
      hasLogged.current = true;
    }
    // Optimize materials and disable unnecessary features
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = false; // Disable shadows for performance
        child.receiveShadow = false;
        if (child.material) {
          child.material.transparent = false;
          child.material.alphaTest = 0.1;
          child.material.needsUpdate = true; // Ensure material updates are applied
        }
      }
    });

    if (gltf.scene && onLoad && !hasCalledOnLoad.current) {
      const timer = setTimeout(() => {
        onLoad();
        hasCalledOnLoad.current = true;
        console.log("✅ 3D model loaded and positioned");
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [path, gltf, onLoad, scene]);

  return (
    <group ref={modelRef}>
      <primitive object={scene} scale={scale} position={position} />
    </group>
  );
};

// FIXED: Completely stable camera - no responsive changes
const StableCamera = () => {
  const { camera, size } = useThree();
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      const cam = camera as THREE.PerspectiveCamera;
      // Set camera once and never change it
      cam.fov = 25;
      cam.position.set(2, 1.5, 8);
      cam.aspect = size.width / size.height;
      cam.updateProjectionMatrix();
      isInitialized.current = true;
    }
  }, []); // Empty dependency array - only run once

  return null;
};

const Lights = () => {
  return (
    <>
      {/* Optimized lights for performance */}
      <ambientLight intensity={0.4} color="#ffffff" />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.8} // Reduced intensity
        color="#ffffff"
        castShadow={false} // Disable shadows for performance
      />
      <directionalLight
        position={[-3, 2, -5]}
        intensity={0.3} // Reduced intensity
        color="#4F46E5"
      />
      {/* Removed point light for performance */}
    </>
  );
};

const FallbackComponent = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3; // Slower rotation
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#4F46E5"
        wireframe
        transparent={false} // Disable transparency for performance
        opacity={1}
      />
    </mesh>
  );
};

const HeroModelCanvas = (props: HeroModelProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hasLoggedMount = useRef(false);

  useEffect(() => {
    useGLTF.preload(props.path);
    if (!hasLoggedMount.current) {
      console.log("🟢 HeroModelCanvas mounted with stable positioning");
      hasLoggedMount.current = true;
    }
    return () => {
      if (hasLoggedMount.current) {
        console.log("🔴 HeroModelCanvas unmounted");
      }
    };
  }, [props.path]);

  return (
    <Canvas
      ref={canvasRef}
      className="w-full h-full"
      camera={{
        position: [2, 1.5, 8],
        fov: 25,
        near: 0.1,
        far: 1000,
      }}
      gl={{
        preserveDrawingBuffer: false, // Disable for performance
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      shadows={false} // Disable shadows for performance
      dpr={[1, 1.5]} // Limit device pixel ratio
      // FIXED: Use always render mode for stable positioning
      frameloop="always"
    >
      <Lights />
      <Environment preset="night" environmentIntensity={0.2} /> {/* Reduced intensity */}

      <Suspense fallback={<FallbackComponent />}>
        {/* FIXED: Removed Float component entirely to prevent position changes */}
        <Model {...props} />
      </Suspense>

      {/* FIXED: Simplified OrbitControls with minimal interaction */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate={false}
        dampingFactor={0.05}
        enableDamping={true}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 4}
        rotateSpeed={0.3}
        // FIXED: Prevent scroll interference
        touches={{
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_PAN,
        }}
      />

      <StableCamera />
    </Canvas>
  );
};

export default HeroModelCanvas;
