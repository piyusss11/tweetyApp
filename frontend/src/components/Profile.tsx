import { FC } from "react";

const Profile: FC = () => {
  return (
    <div className="w-full h-screen bg-zinc-800 p-10 text-white">
      <div className="flex justify-between items-center">
        <h1 className="tracking-tighter text-3xl mb-5 ">Profile</h1>
        <form action="">
          <input
            type="submit"
            formMethod="post"
            formAction="/api/users/logout"
            value={"logout"}
            className="px-3 py-1 rounded-lg bg-red-700 text-white cursor-pointer "
          />
        </form>
      </div>
      <h1>
        Hello, <span>Piyush</span>
      </h1>

      <textarea
        placeholder="whats on your mind"
        className="w-1/3 resize-none rounded-lg outline-none bg-transparent border-[1px] mt-4"
        rows={4}
        name=""
        id=""
      ></textarea>
      <br />
      <button className="px-3 py-1 rounded-lg bg-blue-700 text-white">
        Create Post
      </button>
    </div>
  );
};

export default Profile;
