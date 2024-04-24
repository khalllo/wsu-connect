import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai"; // Importing icons
import { RiLoginCircleLine } from "react-icons/ri"; // Importing icon for Sign In button
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          {loading ? "Loading..." : <><RiLoginCircleLine /> Sign In</>}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont Have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign up</span>
        </Link>
      </div>
      <p className="mt-5 text-red-700">
        {error ? error.message || "Something went wrong!" : ""}
      </p>
    </div>
  );
}
