import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="bg-slate-200">
      <div className="flex items-center justify-between max-w-6xl px-6 py-4 mx-auto">
        {/* Logo */}

        <Link to="/" className="flex items-center space-x-2">
          <img
            width="48"
            height="48"
            src="https://img.icons8.com/color/48/communication.png"
            alt="communication"
          />
          <h1 className="text-lg font-bold text-blue-600">WSU Connect</h1>
        </Link>

        {/* Navigation */}
        <ul className="flex items-center space-x-4">
          <li>
            <Link
              to="/"
              className="text-gray-600 transition duration-300 hover:text-blue-600"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/announcements"
              className="text-gray-600 transition duration-300 hover:text-blue-600"
            >
              Announcements
            </Link>
          </li>
          <li>
            <Link
              to="/documentsharing"
              className="text-gray-600 transition duration-300 hover:text-blue-600"
            >
              Document-sharing
            </Link>
          </li>
          <li>
            <Link
              to="/taskmanagement"
              className="text-gray-600 transition duration-300 hover:text-blue-600"
            >
              Task Management
            </Link>
          </li>
          <li>
            <Link
              to="/FAQsPage"
              className="text-gray-600 transition duration-300 hover:text-blue-600"
            >
              FAQ
            </Link>
          </li>
          <li>
            <Link
              to="/Calender"
              className="text-gray-600 transition duration-300 hover:text-blue-600"
            >
              Calender
            </Link>
          </li>
          <li>
            <Link to="/profile" className="flex items-center">
              {currentUser ? (
                <img
                  src={currentUser.profilePicture}
                  alt="profile"
                  className="object-cover w-8 h-8 rounded-full"
                />
              ) : (
                <span className="text-gray-600 transition duration-300 hover:text-blue-600">
                  Sign In
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
