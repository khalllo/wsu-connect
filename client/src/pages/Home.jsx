
import { motion } from "framer-motion";
import {
  FiMessageCircle,
  FiFileText,
  FiCalendar,
  FiBell,
} from "react-icons/fi";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
    >
      <div className="max-w-4xl px-8 py-12 bg-white rounded-lg shadow-lg">
        <h1 className="mb-8 text-4xl font-bold text-center text-gray-800">
          Welcome to the WSU Inter-Office Communication System
        </h1>
        <p className="mb-12 text-lg text-center text-gray-700">
          Facilitating seamless communication and information exchange among
          different departments and offices within Wolaita Sodo University
          (WSU).
        </p>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center justify-between p-8 text-white transition duration-300 ease-in-out bg-blue-500 rounded-lg"
          >
            <FiMessageCircle className="mb-4 text-6xl text-white" />
            <div className="text-center">
              <h2 className="mb-4 text-2xl font-semibold text-white">
                Start Messaging
              </h2>
              <p className="text-lg text-white">
                Connect instantly with colleagues, share updates, and
                collaborate on projects in real-time.
              </p>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center justify-between p-8 text-white transition duration-300 ease-in-out bg-green-500 rounded-lg"
          >
            <FiFileText className="mb-4 text-6xl text-white" />
            <div className="text-center">
              <h2 className="mb-4 text-2xl font-semibold text-white">
                Share Documents
              </h2>
              <p className="text-lg text-white">
                Upload, access, and collaborate on documents securely within
                your department or across the university.
              </p>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center justify-between p-8 text-white transition duration-300 ease-in-out bg-purple-500 rounded-lg"
          >
            <FiCalendar className="mb-4 text-6xl text-white" />
            <div className="text-center">
              <h2 className="mb-4 text-2xl font-semibold text-white">
                Schedule Events
              </h2>
              <p className="text-lg text-white">
                Effortlessly manage your calendar, schedule meetings, and set
                reminders for important events.
              </p>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center justify-between p-8 text-white transition duration-300 ease-in-out bg-yellow-500 rounded-lg"
          >
            <FiBell className="mb-4 text-6xl text-white" />
            <div className="text-center">
              <h2 className="mb-4 text-2xl font-semibold text-white">
                Stay Informed
              </h2>
              <p className="text-lg text-white">
                Receive announcements, updates, and notifications to stay
                informed about university-wide news and events.
              </p>
            </div>
          </motion.div>
        </div>
        <div className="mt-12 text-center">
          <a
            href="/sign-in"
            className="inline-block px-6 py-3 text-lg font-semibold text-blue-600 transition duration-300 ease-in-out border border-blue-600 rounded-md hover:text-blue-700 hover:bg-blue-100"
          >
            let's start
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
