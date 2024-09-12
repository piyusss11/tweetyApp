import { FC } from "react";

const Register: FC = () => {
  return (
    <div className="w-full h-screen bg-zinc-800 p-10 text-white  flex flex-col ">
      <h1 className="tracking-tighter text-3xl mb-5 ">Register</h1>
      <form className="flex gap-2" method="post" action="/Register">
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
    </div>
  );
};

export default Register;
