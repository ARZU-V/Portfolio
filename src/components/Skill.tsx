import React, { useState, useEffect, useRef } from "react";
import { BackgroundBeams } from "./ui/Background";
import "../styles/fonts.css";
import { motion, useInView } from "framer-motion";
// Mock BackgroundBeams component for demonstration

interface CustomStyle extends React.CSSProperties {
  "--quantity"?: number;
  "--position"?: number;
}
const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const [isHovered, setIsHovered] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null);

  // Enhanced skills data with GitHub links
  const skills = [
    {
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/godot/godot-original.svg",
      name: "Godot",
      github: "https://github.com/yourusername/godot-projects",
    },
    {
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      name: "Docker",
      github: "https://github.com/yourusername/docker-projects",
    },
    {
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      name: "Figma",
      github:
        "https://www.figma.com/design/bBiUjGIc2Jf56mlYiaRmo5/DTI?node-id=0-1&t=m8MCfxzBbEiE22mT-1",
    },
    {
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      name: "HTML/CSS/JS",
      github: "https://github.com/yourusername/web-projects",
    },
    {
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
      name: "Firebase",
      github: "https://github.com/yourusername/firebase-projects",
    },
    {
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      name: "MongoDB",
      github: "https://github.com/yourusername/mongodb-projects",
    },
    {
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      name: "Express",
      github: "https://github.com/yourusername/express-projects",
    },
    {
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      name: "React",
      github: "https://github.com/yourusername/react-projects",
    },
    {
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      name: "Node.js",
      github: "https://github.com/yourusername/nodejs-projects",
    },
    {
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      name: "Python",
      github: "https://github.com/yourusername/python-projects",
    },
  ];

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
  const handleSkillClick = (index: number) => {
    setSelectedSkill(index);
    // Add a slight delay for the click animation, then redirect
    setTimeout(() => {
      window.open(skills[index].github, "_blank");
      setSelectedSkill(null);
    }, 200);
  };

  useEffect(() => {
    // Add beam animation keyframes
    const style = document.createElement("style");
    style.textContent = `
      @keyframes beam {
        0% { opacity: 0; transform: translateY(100vh) rotate(var(--rotation, 0deg)); }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { opacity: 0; transform: translateY(-100vh) rotate(var(--rotation, 0deg)); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <style>{`
        .banner {
          width: 100%;
          height: 100vh;
          text-align: center;
          overflow: hidden;
          position: relative;
          
        }
        
        .banner .slider {
          position: absolute;
          width: 200px;
          height: 200px;
          top: 20%;
          left: calc(50% - 100px);
          transform-style: preserve-3d;
          transform: perspective(1000px);
          animation: autoRun 25s linear infinite;
          z-index: 2;
          transition: all 0.3s ease;
        }
        
        .banner .slider.paused {
          animation-play-state: paused;
        }
        
        @keyframes autoRun {
          from {
            transform: perspective(1500px) rotateX(-16deg) rotateY(0deg);
          }
          to {
            transform: perspective(1500px) rotateX(-16deg) rotateY(360deg);
          }
        }
        
        .banner .slider .item {
          position: absolute;
          inset: 0 0 0 0;
          transform: rotateY(
            calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg)
          ) translateZ(550px);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
        }
        
        .banner .slider .item.clicked {
          transform: rotateY(
            calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg)
          ) translateZ(600px) scale(1.1);
        }
        
        .banner .slider .item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 20px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 2px solid rgba(139, 92, 246, 0.3);
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          position: relative;
        }
        
        .banner .slider .item img:hover {
          transform: scale(1.08) rotateZ(2deg);
          box-shadow: 0 25px 80px rgba(139, 92, 246, 0.6);
          border-color: rgba(139, 92, 246, 0.8);
          background: rgba(139, 92, 246, 0.15);
        }
        
        .banner .slider .item img:active {
          transform: scale(0.95);
        }
        
        .banner .slider .item::after {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 22px;
          background: linear-gradient(45deg, #8b5cf6, #ec4899, #06b6d4, #8b5cf6);
          background-size: 300% 300%;
          animation: gradientShift 3s ease infinite;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .banner .slider .item:hover::after {
          opacity: 1;
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .skills-title {
          position: absolute;
          top: 5%;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          color: #fff;
          font-size: 4rem;
          font-weight: bold;
          letter-spacing: 0.3em;
          text-shadow: 0 4px 30px rgba(139, 92, 246, 0.5);
          font-family: 'MyFont';
          animation: titleGlow 2s ease-in-out infinite alternate;
        }
        
        @keyframes titleGlow {
          from {
            text-shadow: 0 4px 30px rgba(139, 92, 246, 0.5);
          }
          to {
            text-shadow: 0 4px 40px rgba(139, 92, 246, 0.8), 0 0 20px rgba(236, 72, 153, 0.3);
          }
        }
        
        .skills-title::after {
          content: '';
          display: block;
          width: 120px;
          height: 4px;
          background: linear-gradient(90deg, #8b5cf6, #ec4899, #06b6d4, #8b5cf6);
          background-size: 300% 100%;
          animation: gradientFlow 2s linear infinite;
          margin: 20px auto 0;
          border-radius: 2px;
          box-shadow: 0 2px 15px rgba(139, 92, 246, 0.5);
        }
        
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
        
        .skill-tooltip {
          position: absolute;
          bottom: -50px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.9);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s ease;
          border: 1px solid rgba(139, 92, 246, 0.5);
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }
        
        .banner .slider .item:hover .skill-tooltip {
          opacity: 1;
          bottom: -40px;
        }
        
        .click-indicator {
          position: absolute;
          top: 75%;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.1rem;
          z-index: 5;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.7; transform: translateX(-50%) scale(1); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.05); }
        }
        
        @media screen and (max-width: 1023px) {
          .banner .slider {
            width: 150px;
            height: 150px;
            left: calc(50% - 75px);
            top: 25%;
          }
          .banner .slider .item {
            transform: rotateY(
              calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg)
            ) translateZ(400px);
          }
          .skills-title {
            font-size: 3rem;
          }
        }
        
        @media screen and (max-width: 767px) {
          .banner .slider {
            width: 120px;
            height: 120px;
            left: calc(50% - 60px);
            top: 30%;
          }
          .banner .slider .item {
            transform: rotateY(
              calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg)
            ) translateZ(280px);
          }
          .skills-title {
            font-size: 2.5rem;
            letter-spacing: 0.2em;
          }
          .click-indicator {
            font-size: 1rem;
          }
        }
      `}</style>

      <div className="banner" id="skills">
        <BackgroundBeams />

        <h1 className="skills-title">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.h2
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Skills
              </span>
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>
        </h1>

        <div className="click-indicator">
          🖱️ Click on any skill to view projects
        </div>

        <div
          className={`slider ${isHovered ? "paused" : ""}`}
          style={{ "--quantity": skills.length } as CustomStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`item ${selectedSkill === index ? "clicked" : ""}`}
              style={{ "--position": index + 1 } as CustomStyle}
              onClick={() => handleSkillClick(index)}
            >
              <img
                className="object-cover"
                src={skill.image}
                alt={skill.name}
                onError={(e) => {
                  // Fallback to a placeholder if image fails to load
                  e.currentTarget.src = `https://via.placeholder.com/200x200/8b5cf6/ffffff?text=${skill.name}`;
                }}
              />
              <div className="skill-tooltip">{skill.name}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Skills;
