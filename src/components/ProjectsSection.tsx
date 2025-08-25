import { motion, useInView, AnimatePresence } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import { BackgroundBeams } from "./ui/Background";

// Define the Project type
interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  github: string;
  live: string;
  category: string;
}

const ProjectsSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isMobile, setIsMobile] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [visibleProjects, setVisibleProjects] = useState(6); // Initial number of projects to show
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Mobile detection with more breakpoints
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

  // Reset visible projects when category changes
  useEffect(() => {
    setVisibleProjects(6);
  }, [activeCategory]);

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

  const cardVariants = {
    hidden: {
      y: 30,
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const allProjects: Project[] = [
    // Web Apps
    {
      id: 1,
      title: "Video Streaming Project",
      description:
        "Full-stack MERN application with live streaming, video upload,streaming and authentication",
      tech: ["React", "Node.js", "MongoDB", "Cloud","Express"],
      image:
        "https://images.unsplash.com/photo-1663847709955-a2f171c7b54b?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      github: "https://streamitbroski.vercel.app/",
      live: "https://demo.com",
      category: "web",
    },
    {
      id: 2,
      title: "Student ERP System",
      description:
        "A project to bridge the gap between the students and employers",
      tech: ["React", "TypeScript", "Prisma", "Chart.js","Python","Node","Express"],
      image:
        "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      github: "https://github.com/ARZU-V/Naukri-Wala-Sem-Project.git",
      live: "https://demo.com",
      category: "web",
    },
    {
      id: 3,
      title: "Multiplayer Reflex Platform",
      description:
        "Multiplayer platform that let you play against friends and randoms to test your reflexs with chat and leaderboard",
      tech: ["React", "Supabase", "Material-UI", "Socket.io"],
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      github: "https://github.com/ARZU-V/Reflyx.git",
      live: "https://demo.com",
      category: "web",
    },
    // Mobile Apps
    {
      id: 4,
      title: "Vehicle Database Managment System",
      description:
        "A simple CRUD based application for Vehicle Management",
      tech: ["Html Css", "MySQL", "JavaScript"],
      image:
        "https://images.unsplash.com/photo-1674110958136-40fd83adc9e3?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      github: "https://github.com/ARZU-V/Vehicle_Insurance_Project.git",
      live: "https://play.google.com",
      category: "web",
    },
    {
      id: 5,
      title: "Lissa jous Curves",
      description:
        "Beautiful Lissa jous Curves using three js and pure math for rendering.",
      tech: ["React", "Node", "Three js", "Express"],
      image:
        "https://images.unsplash.com/photo-1622028451719-f4a26bf37438?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      github: "https://lissajouscurves.onrender.com/",
      live: "https://play.google.com",
      category: "web",
    },
    {
      id: 6,
      title: "TicTacToe",
      description:
        "IA simple tic tac toe app",
      tech: ["Android Studio", "Kotlin","SQLite"],
      image:
        "https://images.unsplash.com/photo-1667745116154-58101de62e17?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      github: "https://github.com/ARZU-V/TicTacToe.git",
      live: "https://app.store.com",
      category: "app",
    },
    // Fun/Miscellaneous Projects
    {
      id: 7,
      title: "Chat Bot",
      description:
        "This is a basic chatbot using Meta's Llama 3.2 version with 1 billion parameter ,the model is running locally on system.",
      tech: ["React", "Node", "Ollama"],
      image:
        "https://images.unsplash.com/photo-1684369175833-4b445ad6bfb5?q=80&w=1096&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      github: "https://github.com/ARZU-V/Chat-Bot.git",
      live: "https://demo.com",
      category: "web",
    },
    {
      id: 8,
      title: "Chat Application",
      description:
        "A timer that judges you for procrastinating. Ironically took 3 months to build.",
      tech: ["Nextjs", "Redis", "TypeScript", "Supabase"],
      image:
        "https://plus.unsplash.com/premium_photo-1720032304972-1f1142e73253?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      github: "https://github.com/ARZU-V/accord.git",
      live: "https://demo.com",
      category: "web",
    },
    {
      id: 9,
      title: "Portfolio",
      description:
        "Beautiful looking portfolio porject using three js and other libraries",
      tech: ["Reactjs", "threejs", "Shadcn"],
      image:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1120&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      github: "https://github.com/ARZU-V/Portfolio.git",
      live: "https://demo.com",
      category: "web",
    },
    // Additional projects for "See More" functionality
    {
      id: 10,
      title: "Multiplayer Game",
      description:
        "A simple Multipalayer shooting setup in godot ",
      tech: ["Godot", "GDscript"],
      image:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      github: "https://github.com",
      live: "https://demo.com",
      category: "misc",
    },
    {
      id: 11,
      title: "Reinforcement Learning Bots",
      description:
        "Made the bots to play on their own using stable baseline for RL",
      tech: ["Godot", "GDScript", "Stable Baseline", "Python"],
      image:
        "https://plus.unsplash.com/premium_photo-1682023587521-19219d9f8741?q=80&w=784&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      github: "https://streamitbroski.vercel.app/watch/687955bc43cb644a4b68e941",
      live: "https://demo.com",
      category: "misc",
    },
    {
      id: 12,
      title: "Whatsapp Chat Analysis",
      description:
        "Chat Analysis get to know who speaks the most and who does'nt",
      tech: ["Python", "LLM"],
      image:
        "https://plus.unsplash.com/premium_photo-1681487810054-4bced4f73e24?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      github: "https://www.kaggle.com/code/arjitverma69/analysischat",
      live: "https://app.store.com",
      category: "misc",
    },
    {
      id: 13,
      title: "Book It",
      description:
        "A hotel booking Application",
      tech: ["Flutter", "Dart","Web Scrapping","Api"],
      image:
        "https://images.unsplash.com/photo-1669023414162-5bb06bbff0ec?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      github: "https://github.com/ARZU-V/BookingApp.git",
      live: "https://app.store.com",
      category: "app",
    },
  ];

  const categories = [
    { id: "all", name: "All Projects", icon: "🚀" },
    { id: "web", name: "Web Apps", icon: "🌐" },
    { id: "app", name: "Mobile Apps", icon: "📱" },
    { id: "misc", name: "Other", icon: "🎭" },
  ];

  const getFilteredProjects = () => {
    if (activeCategory === "all") {
      return allProjects;
    }
    return allProjects.filter((project) => project.category === activeCategory);
  };

  const filteredProjects = getFilteredProjects();
  const displayedProjects = filteredProjects.slice(0, visibleProjects);
  const hasMoreProjects = visibleProjects < filteredProjects.length;

  const handleSeeMore = () => {
    setLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setVisibleProjects(prev => Math.min(prev + 6, filteredProjects.length));
      setLoading(false);
    }, 500);
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-black overflow-hidden py-12 md:py-20"
      id="projects"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0  z-10">
    <BackgroundBeams />
  </div>

      {/* Dynamic mouse-based gradient (desktop only) */}
      {!isMobile && (
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.1) 30%, transparent 60%)`,
          }}
        />
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
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
                My Projects
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
              From serious web apps to apps that might actually be useful, and
              some that are just plain silly
            </motion.p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12 px-2"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3 md:px-6 py-2 md:py-3 rounded-full font-medium transition-all duration-300 text-sm md:text-base ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-purple-500/25"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-1 md:mr-2">{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
            layout
          >
            <AnimatePresence mode="wait">
              {displayedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  layout
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                  onMouseEnter={() => !isMobile && setHoveredProject(project)}
                  onMouseLeave={() => !isMobile && setHoveredProject(null)}
                >
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-gray-600 transition-all duration-300 h-full">
                    {/* Project Image */}
                    <div className="relative h-40 md:h-48 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />

                      {/* Hover overlay - Enhanced for mobile */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-purple-900/80 to-blue-900/80 ${
                        isMobile ? 'opacity-0 group-active:opacity-100' : 'opacity-0 group-hover:opacity-100'
                      } transition-opacity duration-300 flex items-center justify-center`}>
                        <div className="flex gap-2 md:gap-4">
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2 md:px-4 py-1 md:py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white text-xs md:text-sm font-medium hover:bg-white/30 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            View
                          </motion.a>
                          {/* <motion.a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2 md:px-4 py-1 md:py-2 bg-blue-500/80 backdrop-blur-sm rounded-lg text-white text-xs md:text-sm font-medium hover:bg-blue-600/80 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Live Demo
                          </motion.a> */}
                        </div>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-4 md:p-6">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 md:px-3 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-full border border-gray-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* See More Button */}
          {hasMoreProjects && (
            <motion.div 
              className="text-center mt-8 md:mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={handleSeeMore}
                disabled={loading}
                className="px-6 md:px-8 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-white font-medium rounded-full hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Loading...
                  </div>
                ) : (
                  `See More Projects (${filteredProjects.length - visibleProjects} remaining)`
                )}
              </motion.button>
            </motion.div>
          )}

          {/* Floating Project Preview (Desktop only) */}
          <AnimatePresence>
            {hoveredProject && !isMobile && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="fixed pointer-events-none z-50"
                style={{
                  left: mousePos.x + 20,
                  top: mousePos.y - 100,
                }}
              >
                <div className="bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-lg p-4 max-w-sm shadow-2xl">
                  <img
                    src={hoveredProject.image}
                    alt={hoveredProject.title}
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                  <h4 className="text-white font-semibold text-sm mb-1">
                    {hoveredProject.title}
                  </h4>
                  <p className="text-gray-400 text-xs">
                    {hoveredProject.description.substring(0, 80)}...
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center mt-12 md:mt-20">
            <motion.div
              className="inline-block bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-6 md:p-8 border border-blue-500/20 mx-4 md:mx-0"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
                Like what you see? 🚀
              </h3>
              <p className="text-gray-400 text-sm md:text-base mb-4 md:mb-6 max-w-md mx-auto">
                I'm always working on something new. Check out my GitHub for
                more projects and feel free to collaborate!
              </p>
              <a href="https://github.com/ARZU-V">
              <motion.button
                className="px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 text-sm md:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All on GitHub
              </motion.button>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;