import { FC, useEffect, useState } from "react";
import { isAuthenticated } from "../utils/auth";
import { useNavigate } from "react-router-dom";
interface Post {
  _id: string;
  content: string;
}

const Profile: FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }

    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/user/posts", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [navigate]);
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
      <form method="post" action="/api/posts">
        <textarea
          placeholder="whats on your mind"
          className=" px-3 py-1 w-1/3 resize-none rounded-lg outline-none bg-transparent border-[1px] mt-4"
          rows={4}
          name="content"
          id=""
        ></textarea>
        <br />
        <input
          type="submit"
          value={"Create Post"}
          className="px-3 py-1 rounded-lg bg-blue-700 text-white"
        />
      </form>

      <h1 className="tracking-tighter text-3xl my-5 ">Your Posts</h1>
      <div className="flex gap-5 flex-wrap">
        {posts.length > 0 ? (
          posts.map((post) => {
            return (
              <div
                key={post._id}
                className="relative w-1/3 px-3 py-1 rounded-lg outline-none bg-transparent border-[1px] h-[100px] overflow-hidden overflow-y-auto scrollbar-thin"
              >
                <div className="flex justify-between items-center">
                  <h1 className=" text-blue-600">@{post?.user?.username}</h1>
                  <form action="/api/posts/delete" method="post">
                    <input
                      value={"delete"}
                      type="submit"
                      className="text-red-600 cursor-pointer"
                    />
                  </form>
                </div>
                <p>{post.content}</p>
              </div>
            );
          })
        ) : (
          <h1>No Posts</h1>
        )}
      </div>
    </div>
  );
};

export default Profile;
