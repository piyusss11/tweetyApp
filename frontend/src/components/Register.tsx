import { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const Register: FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated()) navigate("/profile");
  }, [navigate]);
  return (
    <div className="w-full h-screen bg-zinc-800 p-10 text-white  flex flex-col ">
      <h1 className="tracking-tighter text-3xl mb-5 ">Register</h1>
      <form className="flex gap-2" method="post" action="/api/users/register">
        <input
          className="py-2 px-4 bg-transparent border-2 outline-none border-zinc-400 rounded-lg"
          type="text"
          name="name"
          placeholder="name"
        ></input>
        <input
          className="py-2 px-4 bg-transparent border-2 outline-none border-zinc-400 rounded-lg"
          type="text"
          name="username"
          placeholder="username"
        />
        <input
          className="py-2 px-4 bg-transparent border-2 outline-none border-zinc-400 rounded-lg"
          type="password"
          name="password"
          placeholder="password"
        />
        <input
          className="py-2 px-4 bg-transparent border-2 outline-none border-zinc-400 rounded-lg"
          type="text"
          name="email"
          placeholder="email"
        />
        <input
          className="py-2 px-4 bg-blue-600 border-2 outline-none rounded-lg"
          type="submit"
          value={"Register"}
        />
      </form>
      <div className="mt-5">
        Already a user?
        <Link to={"/login"}>
          <span className="ml-2 underline cursor-pointer text-blue-500">
            Login
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Register;
