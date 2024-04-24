import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CalenderPage from "./pages/CalenderPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Announcements from "./pages/Announcements";
import Documentsharing from "./pages/DocumentSharing";
import TaskManagement from "./pages/TaskManagement";
import FAQsPage from "./pages/FAQsPage";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      {/* header */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calender" element={<CalenderPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/documentsharing" element={<Documentsharing />} />
        <Route path="/taskmanagement" element={<TaskManagement />} />
        <Route path="/FAQsPage" element={<FAQsPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
