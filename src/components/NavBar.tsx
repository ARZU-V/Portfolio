import { motion, AnimatePresence } from "framer-motion";
import React, {
  Dispatch,
  SetStateAction,
  useRef,
  useState,
  useEffect,
} from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import menu from "../assets/menu.svg";
import close from "../assets/close.svg";
import { navLinks } from "../constants/constants";

type Position = {
  left: number;
  width: number;
  opacity: number;
};

export const SlideTabsExample = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full bg-transparent backdrop-blur-md border-b border-white/10 shadow-sm">
      <SlideTabs />
    </div>
  );
};

export const SlideTabs = () => {
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const location = useLocation();

  // Get all valid section IDs from navLinks
  const validSectionIds = navLinks.map((nav) => nav.id);

  // Check if current hash matches any navLink id
  const isKnownSection = (hash: string) => {
    return validSectionIds.includes(hash);
  };

  // Handle scroll and hash changes
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Adjust for header height

      // Find which section is currently in view
      let currentSection: string | null = null;
      validSectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            currentSection = id;
          }
        }
      });

      // Only update if we're on a known section
      setActiveTab(currentSection);
    };

    // Initial check
    handleScroll();

    // Set up event listeners
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("hashchange", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleScroll);
    };
  }, [validSectionIds]);

  // Scroll to section with offset for fixed header
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Adjust this value based on your header height
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    window.history.pushState(null, "", `#${id}`);
    scrollToSection(id);
  };

  return (
    <nav className="relative text-white">
      {/* Main Navigation Container */}
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-2">
        {/* Logo and Brand */}
        <motion.div
          className="flex items-center space-x-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link
            to="/"
            className="flex items-center space-x-3"
            onClick={() => {
              setActiveTab("hero");
              scrollToSection("hero");
              window.history.pushState(null, "", "#hero");
            }}
          >
            <img src={logo} alt="Logo" className="h-8 w-8 sm:h-10 sm:w-10" />
            <div className="flex flex-col sm:flex-col sm:items-start">
              <h1 className="text-white text-lg sm:text-xl font-bold tracking-tight">
                ARZU
              </h1>
              <span className="text-gray-300 text-sm font-medium mt-1">
                | Build-it-All Coder
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation - Centered */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          <div className="relative flex items-center rounded-full border-2 border-white bg-black p-1 shadow-lg">
            <ul
              onMouseLeave={() => {
                setPosition((pv) => ({
                  ...pv,
                  opacity: 0,
                }));
              }}
              className="relative flex"
            >
              {navLinks.map((nav) => (
                <Tab
                  key={nav.id}
                  setPosition={setPosition}
                  isActive={activeTab === nav.id}
                  onClick={() => handleLinkClick(nav.id)}
                >
                  {nav.title}
                </Tab>
              ))}
              <Cursor position={position} />
            </ul>
          </div>
        </div>

        {/* Resume Button - Right Corner */}
        <div className="hidden lg:block">
          <motion.a
            href="/resume.pdf"
            download
            className="relative overflow-hidden bg-white text-black px-6 py-3 rounded-lg font-semibold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.span
              className="relative z-10"
              initial={{ y: 0 }}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Resume
            </motion.span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100/10 transition-colors duration-200"
          onClick={toggleMobileMenu}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <img
            src={isMobileMenuOpen ? close : menu}
            alt={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="h-6 w-6"
            style={{ filter: "invert(1)" }}
          />
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed top-0 left-0 right-0 z-50 w-full bg-black/90 backdrop-blur-md border-b border-gray-800 shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
              transition={{ duration: 0.3 }}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              className="fixed top-20 left-0 right-0 bg-gray-900 border-t border-gray-800 shadow-xl lg:hidden z-50"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="px-4 py-6 space-y-4">
                {/* Mobile Navigation Links */}
                <div className="space-y-2">
                  {navLinks.map((nav, index) => (
                    <motion.div
                      key={nav.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                    >
                      <a
                        href={`#${nav.id}`}
                        className={`block px-4 py-3 ${
                          activeTab === nav.id
                            ? "text-white bg-gray-800"
                            : "text-gray-300"
                        } font-medium hover:bg-gray-800 rounded-lg transition-colors duration-200`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(nav.id);
                        }}
                      >
                        {nav.title}
                      </a>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Resume Button */}
                <motion.div
                  className="pt-4 border-t border-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                >
                  <motion.a
                    href="/resume.pdf"
                    download
                    className="w-full bg-white text-black px-6 py-4 rounded-lg font-semibold text-sm tracking-wide shadow-lg block text-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.span
                      initial={{ y: 0 }}
                      whileHover={{ y: -1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      Download Resume
                    </motion.span>
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Tab = ({
  children,
  setPosition,
  isActive,
  onClick,
}: {
  children: React.ReactNode;
  setPosition: Dispatch<SetStateAction<Position>>;
  isActive: boolean;
  onClick: () => void;
}) => {
  const ref = useRef<null | HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className={`relative z-10 block cursor-pointer px-4 py-2 ${
        isActive
          ? "text-black bg-white"
          : "text-white hover:text-black hover:bg-white/50"
      } text-sm font-medium transition-all duration-200 hover:scale-105 md:px-5 md:py-3 md:text-base rounded-full`}
      onClick={onClick}
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }: { position: Position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.3,
      }}
      className="absolute z-0 h-8 rounded-full bg-white md:h-12"
    />
  );
};
