import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQsPage = () => {
  // Sample data for FAQs
  const faqs = [
    {
      question: "How do I reset my password?",
      answer:
        "To reset your password, go to the login page and click on the 'Forgot Password' link. Follow the instructions provided to reset your password.",
    },
    {
      question: "Can I access the system from my mobile device?",
      answer:
        "Yes, the system is accessible from any device with an internet connection. Simply visit the login page and enter your credentials to access the system.",
    },
    {
      question: "How do I update my profile information?",
      answer:
        "To update your profile information, go to the profile settings page. From there, you can edit your personal information, preferences, and settings.",
    },
    // Add more FAQs here
    {
      question:
        "How can I send internal messages to my colleagues or other departments within WSU?",
      answer:
        "The system provides a user-friendly interface for composing and sending messages to individuals or groups within the university. You can easily select recipients, write your message, and send it securely through the platform.",
    },
    {
      question:
        "Is there a feature for sharing documents and files among team members or departments?",
      answer:
        "Yes, the system offers robust document sharing capabilities. You can upload documents, presentations, spreadsheets, and other files to share with specific individuals, departments, or university-wide. It promotes collaboration and ensures everyone has access to the latest information.",
    },
    {
      question:
        "Can I assign tasks or projects to my team members using this system?",
      answer:
        "Absolutely! Task assignment is a core feature of the system. You can create tasks, set deadlines, assign them to specific individuals or teams, and track progress in real-time. It streamlines workflow management and ensures accountability within the organization.",
    },
    {
      question:
        "Does the system integrate with calendars for scheduling and organizing events?",
      answer:
        "Yes, calendar integration is one of the key functionalities. You can sync your calendar with the system to schedule meetings, events, deadlines, and appointments. It helps in managing time effectively and avoids scheduling conflicts among team members.",
    },
    {
      question:
        "How are announcements and important updates disseminated through the system?",
      answer:
        "The system provides a dedicated space for announcements and updates. Administrators or designated personnel can post important messages, news, or announcements that are visible to all users. It ensures everyone stays informed about relevant information and events within WSU.",
    },
  ];

  // State to manage accordion functionality
  const [openIndex, setOpenIndex] = useState(null);

  // Function to toggle accordion
  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="min-h-screen px-6 py-12 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-center text-gray-800">
          Frequently Asked Questions
        </h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="overflow-hidden bg-white rounded-lg shadow-md"
              layout
              whileHover={{ scale: 1.02 }}
            >
              <button
                className="flex items-center justify-between w-full p-6 focus:outline-none hover:bg-gray-50"
                onClick={() => toggleAccordion(index)}
              >
                <h2 className="text-lg font-semibold text-gray-800">
                  {faq.question}
                </h2>
                <motion.svg
                  className="w-6 h-6 text-gray-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 15l7-7 7 7"
                    initial={false}
                  />
                </motion.svg>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    className="p-6 text-gray-700"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: "hidden" }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQsPage;
