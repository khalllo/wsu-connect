import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai"; // Importing icons
import { RiUserAddLine } from "react-icons/ri"; // Importing icon for Sign Up button
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-100">
          <AiOutlineUser />
          <input
            type="text"
            placeholder="Username"
            id="username"
            className="flex-1 bg-transparent focus:outline-none"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-100">
          <AiOutlineMail />
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="flex-1 bg-transparent focus:outline-none"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-100">
          <AiOutlineLock />
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="flex-1 bg-transparent focus:outline-none"
            onChange={handleChange}
          />
        </div>
        <button
          disabled={loading}
          className="flex items-center justify-center p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95 disabled:opacity-80"
        >
          {loading ? (
            "Loading..."
          ) : (
            <>
              <RiUserAddLine /> Sign Up
            </>
          )}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
      <p className="mt-5 text-red-700">{error && "Something went wrong!"}</p>
    </div>
  );
}
