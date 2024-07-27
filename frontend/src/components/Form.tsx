import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { update } from "../features/loginSlice";

interface FormData {
  username: string;
  password: string;
}

const Form: React.FC = () => {
  const initialState: FormData = {
    username: "",
    password: "",
  };

  const [msg, setMsg] = useState<string>("");
  const [data, setData] = useState<FormData>(initialState);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const Auth = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const res = await axios.post<{
        token: string;
        msg: string;
        role: string;
      }>("http://localhost:8080/api/getLogin", {
        username: data.username,
        password: data.password,
      });
      console.log(res.data);
      if (res.data.msg == "success") {
        localStorage.setItem("token", res.data.token);
        if (res.data.role == "Administrator") {
          navigate("/Dashboard");
        } else {
          navigate("/Store");
        }
      } else {
        setMsg(res.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100">
      <h1 className="text-5xl font-semibold">Welcome Back</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        Welcome back! Please enter your details.
      </p>
      <form onSubmit={Auth}>
        <div className="mt-8">
          <div>
            <label className="text-lg font-medium">UserName</label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              type="text"
              name="username"
              value={data.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="text-lg font-medium">Password</label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>
          <p className="font-medium text-base text-red-500">{msg}</p>
          <div className="mt-8 flex flex-col gap-y-4">
            <button
              type="submit"
              className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg forn-bold"
            >
              Sign in
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
