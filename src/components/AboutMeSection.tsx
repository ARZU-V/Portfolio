import { motion, useInView } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import { BackgroundBeams } from "./ui/Background";
import "../styles/fonts.css";
import "../App.css";

const AboutSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isMobile, setIsMobile] = useState(false);
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
        delayChildren: 0.15,
        staggerChildren: 0.15,
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

  const experiences = [
    {
      title: "B.Tech Student",
      place: "IIIT Dharwad",
      description:
        "Currently pursuing Computer Science, diving deep into algorithms, data structures, and software engineering principles.",
      icon: "🎓",
    },
    {
      title: "Hackathon Tech Member",
      place: "College Event",
      description:
        "Helped in technical issues that the teams were facing",
      icon: "⚡",
    },
    {
      title: "Tech Club Member",
      place: "College Communities",
      description:
        "Contributing to tech clubs, organizing events, and collaborating on projects with fellow developers.",
      icon: "🚀",
    },
    {
      title: "Project Collaborator",
      place: "Team Projects",
      description:
        "Working on full-stack applications, from ideation to deployment, always learning something new.",
      icon: "💡",
    },
  ];

  return (
    <section
      ref={ref}
      className="font-myfont relative min-h-screen bg-black overflow-hidden"
      id="about"
    >
      {/* Background Effects */}
      <BackgroundBeams />

      {/* Dynamic mouse-based gradient */}
      {!isMobile && (
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.05) 25%, transparent 50%)`,
          }}
        />
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.h2
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                About Me
              </span>
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Left Column - Personal Story */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-colors">
                <motion.h3
                  className="text-3xl font-bold text-white mb-6"
                  whileHover={{ color: "#60A5FA" }}
                >
                  Hey, I'm <span className="text-blue-400">Arjit</span> 👋
                </motion.h3>

                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    A curious full stack developer and current B.Tech student at{" "}
                    <span className="text-purple-400 font-semibold">
                      IIIT Dharwad
                    </span>
                    . I love turning coffee and late-night ideas into cool
                    websites and apps.
                  </p>

                  <p>
                    Whether it's backend stuff like APIs, databases, or spinning
                    up a Supabase project, or frontend magic with React and
                    animations — I enjoy building things that work{" "}
                    <span className="text-cyan-400 font-semibold">and</span>{" "}
                    look good.
                  </p>

                  <p>
                    I've been part of{" "}
                    <span className="text-blue-400">hackathons</span>,{" "}
                    <span className="text-purple-400">tech clubs</span>, and{" "}
                    <span className="text-cyan-400">team projects</span>, always
                    learning something new (or breaking something new). I
                    live for that{" "}
                    <span className="text-green-400 font-semibold">
                      "it finally works!"
                    </span>{" "}
                    moment.{" "}
                    
                  </p>
                  <p>
                    <span>I use arch btw.
                  </span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Current Focus */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-colors">
                <motion.h3
                  className="text-3xl font-bold text-white mb-6"
                  whileHover={{ color: "#A855F7" }}
                >
                  What I'm Up To 🚀
                </motion.h3>

                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    Right now, I'm diving deep into{" "}
                    <span className="text-blue-400 font-semibold">
                      backend development
                    </span>{" "}
                    and exploring full stack projects that solve real problems.
                  </p>

                  <p>
                    Always down for{" "}
                    <span className="text-purple-400">collabs</span>,{" "}
                    <span className="text-cyan-400">code jams</span>, or just
                    nerding out over tech!
                  </p>

                  <motion.div
                    className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20"
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-blue-300 font-medium">
                      💡 Currently exploring: Microservices, Cloud Architecture,
                      and Advanced React Patterns
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Skills Section */}

          {/* Experience Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-4xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                My Journey
              </span>
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{
                    scale: 1.02,
                    y: -5,
                  }}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{exp.icon}</div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white mb-1">
                        {exp.title}
                      </h4>
                      <p className="text-blue-400 font-medium mb-3">
                        {exp.place}
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
