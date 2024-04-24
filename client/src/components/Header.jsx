import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import {
  FaHome,
  FaBell,
  FaFileAlt,
  FaTasks,
  FaQuestion,
  FaCalendarAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const { currentUser } = useSelector((state) => state.user)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="shadow-md bg-slate-200">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              className="w-auto h-8"
              src="https://img.icons8.com/color/48/communication.png"
              alt="communication"
            />
            <h1 className="ml-2 text-lg font-bold text-blue-600">
              WSU Connect
            </h1>
          </Link>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button onClick={toggleMenu} className="p-2 focus:outline-none">
              {isMenuOpen ? (
                <FaTimes className="w-6 h-6 text-gray-600 hover:text-blue-600" />
              ) : (
                <FaBars className="w-6 h-6 text-gray-600 hover:text-blue-600" />
              )}
            </button>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden space-x-4 md:flex">
            <NavItem to="/" icon={<FaHome />} text="Home" />
            <NavItem
              to="/announcements"
              icon={<FaBell />}
              text="Announcements"
            />
            <NavItem
              to="/documentsharing"
              icon={<FaFileAlt />}
              text="Document Sharing"
            />
            <NavItem
              to="/taskmanagement"
              icon={<FaTasks />}
              text="Task Management"
            />
            <NavItem to="/FAQsPage" icon={<FaQuestion />} text="FAQ" />
            <NavItem to="/Calender" icon={<FaCalendarAlt />} text="Calendar" />
          </nav>

          {/* Profile */}
          <div className="items-center hidden md:flex">
            <Link to="/profile" className="flex items-center">
              {currentUser ? (
                <img
                  src={currentUser.profilePicture}
                  alt="profile"
                  className="object-cover w-8 h-8 rounded-full"
                />
              ) : (
                <span className="text-gray-600 hover:text-blue-600">
                  Sign In
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden md:hidden"
          >
            <nav className="flex flex-col mt-2">
              <NavItem
                to="/"
                icon={<FaHome />}
                text="Home"
                onClick={toggleMenu}
              />
              <NavItem
                to="/announcements"
                icon={<FaBell />}
                text="Announcements"
                onClick={toggleMenu}
              />
              <NavItem
                to="/documentsharing"
                icon={<FaFileAlt />}
                text="Document Sharing"
                onClick={toggleMenu}
              />
              <NavItem
                to="/taskmanagement"
                icon={<FaTasks />}
                text="Task Management"
                onClick={toggleMenu}
              />
              <NavItem
                to="/FAQsPage"
                icon={<FaQuestion />}
                text="FAQ"
                onClick={toggleMenu}
              />
              <NavItem
                to="/Calender"
                icon={<FaCalendarAlt />}
                text="Calendar"
                onClick={toggleMenu}
              />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

const NavItem = ({ to, icon, text, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-600"
  >
    {icon}
    <span className="ml-2">{text}</span>
  </Link>
)
