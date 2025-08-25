import { motion, useInView, AnimatePresence } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import { BackgroundBeams } from "./ui/Background";

// Social media link interface
interface SocialLink {
  id: string;
  name: string;
  url: string;
  iconUrl: string;
  color: string;
  hoverColor: string;
  description: string;
}

// 3D Floating Elements Component
const FloatingElements = () => {
  const [elements, setElements] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    rotation: number;
    color: string;
  }>>([]);

  useEffect(() => {
    const newElements = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      speed: Math.random() * 2 + 1,
      rotation: Math.random() * 360,
      color: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981'][Math.floor(Math.random() * 4)]
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full opacity-20"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            backgroundColor: element.color,
          }}
          animate={{
            y: [0, -100, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: element.speed * 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Interactive 3D Card Component
const Interactive3DCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = (y - centerY) / 10;
    const rotateYValue = (centerX - x) / 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      className={`relative transform-gpu ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      whileHover={{ scale: 1.05 }}
    >
      {children}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl -z-10" />
      )}
    </motion.div>
  );
};

// Animated Connect Button Component
const AnimatedConnectButton = ({ href, children, className }: { 
  href: string; 
  children: React.ReactNode; 
  className?: string;
}) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative overflow-hidden ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative z-10">
        {children}
      </div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100"
        initial={{ x: "-100%" }}
        whileHover={{ x: "0%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
};

const ContactSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<SocialLink | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mouse tracking for background effect (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

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
      y: 50,
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

  const socialVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
      rotate: -180,
    },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  // Social media links
  const socialLinks: SocialLink[] = [
    {
      id: "email",
      name: "Email",
      url: "mailto:arjitverma73@gmail.com",
      iconUrl: "https://img.icons8.com/?size=100&id=85559&format=png&color=000000",
      color: "from-red-500 to-orange-500",
      hoverColor: "hover:shadow-red-500/25",
      description: "Drop me a line anytime",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/arjit-v/",
      iconUrl: "https://img.icons8.com/?size=100&id=8808&format=png&color=000000",
      color: "from-blue-600 to-blue-700",
      hoverColor: "hover:shadow-blue-500/25",
      description: "Let's connect professionally",
    },
    {
      id: "github",
      name: "Github",
      url: "https://github.com/ARZU-V",
      iconUrl: "https://img.icons8.com/?size=100&id=12599&format=png&color=000000",
      color: "from-sky-400 to-blue-500",
      hoverColor: "hover:shadow-sky-500/25",
      description: "Follow my dev journey",
    },
    {
      id: "instagram",
      name: "Instagram",
      url: "https://www.instagram.com/na_real.arjit/",
      iconUrl: "https://img.icons8.com/?size=100&id=32292&format=png&color=000000",
      color: "from-pink-500 to-purple-600",
      hoverColor: "hover:shadow-pink-500/25",
      description: "Behind the scenes content",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-black overflow-hidden py-12 md:py-20"
      id="contact"
    >
      <BackgroundBeams />
      <FloatingElements />

      {/* Dynamic mouse-based gradient (desktop only) */}
      {!isMobile && (
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.1) 30%, transparent 60%)`,
          }}
        />
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 px-2"
              whileHover={{ scale: 1.02 }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Let's Connect
              </span>
            </motion.h2>
            <motion.div
              className="w-24 md:w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
            <motion.p
              variants={itemVariants}
              className="text-gray-400 text-base md:text-lg mt-4 md:mt-6 max-w-2xl mx-auto px-4"
            >
              Ready to bring your ideas to life? Let's discuss your next project
              or just have a friendly chat about tech and development!
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Social Media Links */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center justify-center lg:justify-start gap-3">
                  Find Me Online
                  <motion.svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="text-blue-400"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
                  </motion.svg>
                </h3>
                <p className="text-gray-400 text-sm md:text-base">
                  Connect with me on your preferred platform
                </p>
              </div>

              {/* Social Icons Grid */}
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {socialLinks.map((social, index) => (
                  <Interactive3DCard key={social.id}>
                    <motion.a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={socialVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      transition={{ delay: index * 0.1 }}
                      className={`group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 md:p-6 hover:border-gray-600 transition-all duration-300 ${social.hoverColor} block`}
                      onMouseEnter={() => !isMobile && setHoveredSocial(social)}
                      onMouseLeave={() => !isMobile && setHoveredSocial(null)}
                    >
                      <div className="text-center">
                        <motion.div 
                          className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 flex items-center justify-center"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <img 
                            src={social.iconUrl} 
                            alt={`${social.name} icon`}
                            className="w-8 h-8 md:w-10 md:h-10 filter brightness-0 invert group-hover:invert-0 transition-all duration-300"
                            style={{
                              filter: social.id === 'email' ? 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)' :
                                     social.id === 'linkedin' ? 'brightness(0) saturate(100%) invert(28%) sepia(93%) saturate(1592%) hue-rotate(204deg) brightness(100%) contrast(101%)' :
                                     social.id === 'github' ? 'brightness(0) saturate(100%) invert(58%) sepia(96%) saturate(1352%) hue-rotate(169deg) brightness(101%) contrast(101%)' :
                                     'brightness(0) saturate(100%) invert(35%) sepia(91%) saturate(1236%) hue-rotate(294deg) brightness(103%) contrast(107%)'
                            }}
                          />
                        </motion.div>
                        <h4 className="text-white font-semibold text-sm md:text-base mb-2">
                          {social.name}
                        </h4>
                        <p className="text-gray-400 text-xs md:text-sm">
                          {social.description}
                        </p>
                      </div>

                      {/* Hover gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`} />
                    </motion.a>
                  </Interactive3DCard>
                ))}
              </div>

              {/* Quick Contact Info */}
              <Interactive3DCard>
                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-500/20"
                >
                  <h4 className="text-white font-semibold text-lg mb-3 flex items-center gap-2">
                    Quick Response Promise
                    <motion.img 
                      src="https://img.icons8.com/?size=20&id=phOKFKYpe00C&format=png&color=4ade80" 
                      alt="check circle"
                      className="w-5 h-5"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </h4>
                  <div className="space-y-2 text-sm text-gray-400">
                    <p className="flex items-center gap-2">
                      <img 
                        src="https://img.icons8.com/?size=16&id=12623&format=png&color=f87171" 
                        alt="email"
                        className="w-4 h-4"
                      />
                      Email responses within 24 hours
                    </p>
                    <p className="flex items-center gap-2">
                      <img 
                        src="https://img.icons8.com/?size=16&id=13930&format=png&color=60a5fa" 
                        alt="linkedin"
                        className="w-4 h-4"
                      />
                      LinkedIn connections welcome
                    </p>
                    <p className="flex items-center gap-2">
                      <img 
                        src="https://img.icons8.com/?size=100&id=12599&format=png&color=000000" 
                        alt="Github"
                        className="w-4 h-4"
                      />
                      Check out my projects
                    </p>
                    <p className="flex items-center gap-2">
                      <img 
                        src="https://img.icons8.com/?size=16&id=32309&format=png&color=ec4899" 
                        alt="instagram"
                        className="w-4 h-4"
                      />
                      Instagram for casual conversations
                    </p>
                  </div>
                </motion.div>
              </Interactive3DCard>
            </motion.div>

            {/* 3D Interactive Visualization */}
            <motion.div variants={itemVariants} className="flex items-center justify-center">
              <Interactive3DCard className="w-full max-w-md">
                <div className="relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 overflow-hidden">
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-32 h-32 border border-blue-500/10 rounded-full"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${20 + i * 10}%`,
                        }}
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 360],
                          opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                          duration: 4 + i,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                      />
                    ))}
                  </div>

                  {/* Central Content */}
                  <div className="relative z-10 text-center space-y-6">
                    <motion.div
                      className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity },
                      }}
                    >
                      <motion.svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-white"
                        animate={{ rotate: [0, -360] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      >
                        <path
                          d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                          fill="currentColor"
                        />
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1" fill="none" />
                      </motion.svg>
                    </motion.div>

                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-white">Ready to Collaborate?</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Whether you have a groundbreaking idea, need technical expertise, 
                        or want to discuss the future of web development, I'm here to help 
                        bring your vision to life.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <AnimatedConnectButton
                        href="mailto:arjitverma73@gmail.com"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300"
                      >
                        Start a Conversation
                      </AnimatedConnectButton>
                      
                      <AnimatedConnectButton
                        href="https://www.linkedin.com/in/arjit-v/"
                        className="w-full border border-gray-600 text-gray-300 py-3 px-6 rounded-lg font-medium hover:border-gray-400 hover:text-white transition-all duration-300"
                      >
                        Connect on LinkedIn
                      </AnimatedConnectButton>
                    </div>

                    {/* Status Indicator */}
                    <div className="flex items-center justify-center gap-2 pt-4">
                      <motion.div
                        className="w-2 h-2 bg-green-500 rounded-full"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-green-400 text-sm">Available for new projects</span>
                    </div>
                  </div>
                </div>
              </Interactive3DCard>
            </motion.div>
          </div>

          {/* Floating Social Preview (Desktop only) */}
          <AnimatePresence>
            {hoveredSocial && !isMobile && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="fixed pointer-events-none z-50"
                style={{
                  left: mousePos.x + 20,
                  top: mousePos.y - 50,
                }}
              >
                <div className="bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-lg p-3 shadow-2xl">
                  <div className="flex items-center gap-2">
                    <img 
                      src={hoveredSocial.iconUrl} 
                      alt={`${hoveredSocial.name} icon`}
                      className="w-5 h-5 filter brightness-0 invert"
                    />
                    <div>
                      <h4 className="text-white font-semibold text-sm">
                        {hoveredSocial.name}
                      </h4>
                      <p className="text-gray-400 text-xs">
                        {hoveredSocial.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer CTA */}
          <motion.div variants={itemVariants} className="text-center mt-12 md:mt-20">
            <Interactive3DCard>
              <motion.div
                className="inline-block bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl p-6 md:p-8 border border-green-500/20 mx-4 md:mx-0"
              >
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 flex items-center justify-center gap-2">
                  Let's Build Something Amazing!
                  <motion.svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="text-yellow-400"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <polygon points="12,2 15.09,8.26 22,9 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9 8.91,8.26 12,2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor"/>
                  </motion.svg>
                </h3>
                <p className="text-gray-400 text-sm md:text-base mb-4 md:mb-6 max-w-md mx-auto">
                  Whether you have a project in mind, need technical advice, or
                  just want to chat about the latest in tech - I'm all ears!
                </p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
                  <span className="text-gray-500 text-xs md:text-sm flex items-center justify-center gap-1">
                    <motion.svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="text-yellow-400"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor"/>
                    </motion.svg>
                    Powered by creativity & innovation ✨
                  </span>
                </div>
              </motion.div>
            </Interactive3DCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;