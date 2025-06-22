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

  // Mouse tracking for background effect
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
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
      title: "E-Commerce Platform",
      description:
        "Full-stack MERN application with payment integration, user authentication, and admin dashboard.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      github: "https://github.com",
      live: "https://demo.com",
      category: "web",
    },
    {
      id: 2,
      title: "Social Media Dashboard",
      description:
        "Real-time analytics dashboard with interactive charts and user engagement metrics.",
      tech: ["Next.js", "TypeScript", "Prisma", "Chart.js"],
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      github: "https://github.com",
      live: "https://demo.com",
      category: "web",
    },
    {
      id: 3,
      title: "Task Management App",
      description:
        "Collaborative project management tool with real-time updates and team features.",
      tech: ["React", "Firebase", "Material-UI", "Socket.io"],
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      github: "https://github.com",
      live: "https://demo.com",
      category: "web",
    },
    // Mobile Apps
    {
      id: 4,
      title: "Fitness Tracker",
      description:
        "React Native app for tracking workouts, nutrition, and health metrics with offline support.",
      tech: ["React Native", "SQLite", "Redux", "AsyncStorage"],
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      github: "https://github.com",
      live: "https://play.google.com",
      category: "app",
    },
    {
      id: 5,
      title: "Weather App",
      description:
        "Beautiful weather application with location-based forecasts and interactive maps.",
      tech: ["Flutter", "Dart", "OpenWeather API", "Maps SDK"],
      image:
        "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
      github: "https://github.com",
      live: "https://play.google.com",
      category: "app",
    },
    {
      id: 6,
      title: "Language Learning",
      description:
        "Interactive language learning app with gamification and progress tracking.",
      tech: ["React Native", "Node.js", "PostgreSQL", "TensorFlow"],
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop",
      github: "https://github.com",
      live: "https://app.store.com",
      category: "app",
    },
    // Fun/Miscellaneous Projects
    {
      id: 7,
      title: "Dad Joke Generator",
      description:
        "Because the world needed more dad jokes! API-powered generator with rating system.",
      tech: ["HTML", "CSS", "JavaScript", "Dad Jokes API"],
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
      github: "https://github.com",
      live: "https://demo.com",
      category: "misc",
    },
    {
      id: 8,
      title: "Procrastination Timer",
      description:
        "A timer that judges you for procrastinating. Ironically took 3 months to build.",
      tech: ["React", "Local Storage", "Guilt", "Self-Reflection"],
      image:
        "https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=600&h=400&fit=crop",
      github: "https://github.com",
      live: "https://demo.com",
      category: "misc",
    },
    {
      id: 9,
      title: "Excuse Generator",
      description:
        "Never run out of creative excuses again! ML-powered excuse generation for any situation.",
      tech: ["Python", "Flask", "OpenAI API", "Creativity"],
      image:
        "https://images.unsplash.com/photo-1516382799247-87df95d790b7?w=600&h=400&fit=crop",
      github: "https://github.com",
      live: "https://demo.com",
      category: "misc",
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

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-black overflow-hidden py-20"
      id="projects"
    >
      {/* Animated background grid */}
      <BackgroundBeams></BackgroundBeams>

      {/* Dynamic mouse-based gradient */}
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
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.h2
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                My Projects
              </span>
            </motion.h2>
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
            <motion.p
              variants={itemVariants}
              className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto"
            >
              From serious web apps to apps that might actually be useful, and
              some that are just plain silly
            </motion.p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-purple-500/25"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  layout
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                  onMouseEnter={() => setHoveredProject(project)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-gray-600 transition-all duration-300 h-full">
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-blue-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex gap-4">
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white font-medium hover:bg-white/30 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            GitHub
                          </motion.a>
                          <motion.a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-blue-500/80 backdrop-blur-sm rounded-lg text-white font-medium hover:bg-blue-600/80 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Live Demo
                          </motion.a>
                        </div>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-full border border-gray-700"
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

          {/* Floating Project Preview */}
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
          <motion.div variants={itemVariants} className="text-center mt-20">
            <motion.div
              className="inline-block bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-500/20"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                Like what you see? 🚀
              </h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                I'm always working on something new. Check out my GitHub for
                more projects and feel free to collaborate!
              </p>
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All on GitHub
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
