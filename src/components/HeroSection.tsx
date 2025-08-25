import { motion, useScroll } from "framer-motion";
import React, { useEffect, useState, useCallback } from "react";
import { BackgroundBeams } from "./ui/Background";
import HeroModelCanvas from "./ui/HeroModel";
import "../styles/fonts.css";
import "../App.css";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isMobile, setIsMobile] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  // Mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mouse tracking for background effect
  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  // Handle model load completion
  const handleModelLoad = useCallback(() => {
    setIsModelLoaded(true);
    setTimeout(() => {
      setIsContentVisible(true);
    }, 300);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: 30,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const modelVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.3,
      },
    },
  };

  // Framer Motion Loading Animation
const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center space-y-6" id="hero">
    {/* Dot Wave Animation */}
    <div className="flex space-x-1">
      <motion.div
        className="w-3 h-3 bg-blue-400 rounded-full"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="w-3 h-3 bg-purple-400 rounded-full"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0.1, ease: "easeInOut" }}
      />
      <motion.div
        className="w-3 h-3 bg-cyan-400 rounded-full"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2, ease: "easeInOut" }}
      />
    </div>

    {/* Loading Text */}
    <div className="text-center space-y-2">
      <p className="text-gray-300 text-xl font-medium">
        Arjit Verma Portfolio
      </p>
      <p className="text-gray-500 text-sm">Preparing 3D environment...</p>
    </div>
  </div>
);

  return (
    <section
      className="font-myfont relative min-h-screen bg-black overflow-hidden"
      id="hero"
    >
      {/* Background Effects */}
      <BackgroundBeams />
      {/* Dynamic mouse-based gradient */}
      {!isMobile && (
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.1) 25%, transparent 50%)`,
          }}
        />
      )}

      {/* Loading Overlay */}
      <motion.div
        className={`fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center ${
          isContentVisible ? "pointer-events-none" : ""
        }`}
        initial={{ opacity: 1 }}
        animate={{
          opacity: isContentVisible ? 0 : 1,
          visibility: isContentVisible ? "hidden" : "visible",
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <LoadingSpinner />
      </motion.div>

      {/* Main Container */}
      <div className="container mx-auto px-20 sm:px-6 min-h-screen relative">
        <motion.div
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen"
          variants={containerVariants}
          initial="hidden"
          animate={isContentVisible ? "visible" : "hidden"}
        >
          {/* Left Content Section */}
          <div className="lg:pl-20 pt-20 flex items-center justify-center lg:justify-start">
            <div className="space-y-8 text-center lg:text-left max-w-2xl">
              {/* Greeting */}
              <motion.div variants={itemVariants}>
                <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-8xl text-white leading-tight">
                  <motion.span
                    className="inline-block"
                    whileHover={{
                      scale: 1.05,
                      color: "#E5E7EB",
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Hi there,
                  </motion.span>
                  <br />
                  <motion.span
                    className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                    whileHover={{
                      scale: 1.02,
                    }}
                  >
                    I'm Arjit
                  </motion.span>
                </motion.h1>
              </motion.div>

              {/* Title */}
              <motion.div variants={itemVariants}>
                <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-300 font-medium leading-relaxed">
                  <span className="text-blue-400">Web Designer</span>
                  <span className="text-gray-400"> & </span>
                  <span className="text-purple-400">Full Stack Developer</span>
                </h2>
              </motion.div>

              {/* Location */}
              <motion.div variants={itemVariants}>
                <div className="text-lg sm:text-xl text-gray-400 relative inline-block">
                  Based in{" "}
                  <span className="font-semibold text-gray-200 relative">
                    India
                    <motion.span
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isContentVisible ? 1 : 0 }}
                      transition={{ delay: 2, duration: 0.8 }}
                    />
                  </span>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <a href="/#projects">
                  <motion.button
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-shadow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View My Work
                  </motion.button>
                </a>
                <a href="#contact">
                  <motion.button
                    className="px-8 py-3 border-2 border-gray-600 text-gray-300 font-medium rounded-full hover:border-gray-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get In Touch
                  </motion.button>
                </a>
              </motion.div>
            </div>
          </div>

          {/* 3D Model Section */}
          <motion.div
            variants={modelVariants}
            className="flex items-center justify-center relative"
          >
            <div className="w-full aspect-square max-w-[600px] max-h-[600px] relative">
              <div
                className={`absolute inset-0 ${
                  isMobile ? "pointer-events-none z-0" : "z-10"
                }`}
              >
                <HeroModelCanvas
                  path="/planet.glb"
                  scale={isMobile ? 1 : 1.2}
                  position={[0, 0, 0]}
                  onLoad={handleModelLoad}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      {!isMobile && isContentVisible && (
        <motion.div
          className="fixed bottom-8 left-1/2 z-20"
          style={{ transform: "translateX(-50%)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        />
      )}
    </section>
  );
};

export default HeroSection;
