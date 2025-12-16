import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { MenuToggle } from "./MenuToggle";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [smallerHeader, setSmallerHeader] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1025);
  const isHome = location.pathname === "/";
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const navlinks = [
    { name: "Lediga ateljéer", path: "/lediga-ateljeer" },
    { name: "Aktiviteter", path: "/aktiviteter" },
    { name: "Om oss", path: "/om-oss" },
    { name: "Kontakt", path: "/kontakt" },
  ];

  const logoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // ändra tröskel om du vill
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSmallerHeader(true);
      } else {
        setSmallerHeader(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1025);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target) &&
        !(buttonRef.current && buttonRef.current.contains(event.target))
      ) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "";
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-screen font-main flex justify-between p-4 pr-6 tablet:p-6 laptop:px-8 items-center z-70
       text-darkRed  ${scrolled ? "bg-lightRed" : "bg-none"} animate-fadeIn`}
    >
      <div
        className="flex gap-6 items-center cursor-pointer"
        onClick={() => logoClick()}
      >
        {" "}
        <img
          src={
            isMobile && smallerHeader
              ? "https://res.cloudinary.com/dsh7dqhgv/image/upload/v1764855897/HC-Logotyp-monogram-dark-red-Hags%C3%A4tra-collective_f9niat.svg"
              : isMobile
              ? "https://res.cloudinary.com/dsh7dqhgv/image/upload/v1764855986/HC-Logotyp-dark_o3ka8u.svg"
              : "https://res.cloudinary.com/dsh7dqhgv/image/upload/v1764855897/HC-Logotyp-monogram-dark-red-Hags%C3%A4tra-collective_f9niat.svg"
          }
          className={` ${
            smallerHeader
              ? "w-[60px] transform transition-transform duration-200"
              : "w-[100px] transform transition-transform duration-200"
          }  ${
            !isHome &&
            "hover:scale-105 transform transition-transform duration-100"
          }`}
          alt="HC logga"
        />
        {!isMobile && (
          <img
            src="https://res.cloudinary.com/dsh7dqhgv/image/upload/v1764856133/text-hagsatra-collective_qxzcnn.svg"
            className={`w-[150px] ${
              !isHome &&
              "hover:scale-105 transform transition-transform duration-100"
            }`}
            alt="hagsätra collective"
          />
        )}
      </div>
      {isMobile ? (
        <>
          <MenuToggle isOpen={isOpen} toggleMenu={toggleMenu} ref={buttonRef} />
          <AnimatePresence>
            {isOpen && isMobile && (
              <motion.div
                initial={{ clipPath: "circle(5% at 100% 0%)" }}
                animate={{ clipPath: "circle(150% at 50% 50%)" }}
                exit={{ clipPath: "circle(5% at 100% 0%)" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className={`fixed top-0 right-0 h-screen w-screen overflow-hidden bg-darkRed text-xl backdrop-blur-xl flex justify-end px-10 `}
                ref={dropdownRef}
              >
                <ul className="flex flex-col laptop:flex-row items-end gap-5 text-lightRed absolute bottom-28 tablet:bottom-40 animate-fadeIn">
                  {navlinks.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      onClick={closeMenu}
                      className="hover:scale-105 transform transition-transform duration-100"
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <>
          <ul
            className={`flex gap-10 pr-6 text-lg
            `}
          >
            {navlinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className="hover:scale-105 hover:text-white transform transition-transform duration-100"
              >
                {link.name}
              </NavLink>
            ))}
          </ul>
        </>
      )}
    </header>
  );
};
