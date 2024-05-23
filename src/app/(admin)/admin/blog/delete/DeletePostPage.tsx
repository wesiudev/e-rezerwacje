"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/redux/slices/posts";
import { deleteBlogPost, getBlogPosts } from "@/firebase";
import Image from "next/image";

export default function DeletePostPage() {
  const [isDeleted, setIsDeleted] = useState(false);
  const dispatch = useDispatch();
  const [selectedPost, setSelectedPost] = useState<any>();
  const { posts } = useSelector((state: any) => state.posts);
  useEffect(() => {
    if (posts?.length === 0) {
      getBlogPosts().then((data) => dispatch(setPosts(data)));
    }
  }, [posts]);

  return (
    <>
      {posts?.posts && (
        <>
          {selectedPost === undefined && (
            <div className="flex flex-col bg-blue-300 pt-24 px-3 lg:px-6 min-h-screen">
              <h1 className="text-3xl font-bold mb-4 text-white">
                Który post chcesz usunąć?
              </h1>{" "}
              <div className="flex flex-col items-center justify-center">
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-6 ">
                  {posts?.posts.length !== 0 &&
                    posts?.posts.map((post: any, i: number) => (
                      <div
                        onClick={() => setSelectedPost(post)}
                        key={i}
                        className="cursor-pointer group relative aspect-square h-max flex flex-col hover:bg-green-300 hover:p-1 duration-300 ease-in-out rounded-lg shadow-md  shadow-zinc-700"
                      >
                        <div className="w-full overflow-hidden flex items-start">
                          {post.mainImage && (
                            <Image
                              src={post.mainImage}
                              width={1024}
                              height={1024}
                              alt=""
                              className="w-full object-contain rounded-lg shadow-md shadow-zinc-700"
                            />
                          )}
                        </div>
                        <h1 className="group-hover:bg-gray-200 duration-300 group-hover:p-4 absolute bottom-3 left-3 right-3 text-base lg:text-xl  drop-shadow-xl shadow-black mt-3 bg-white text-zinc-700 font-bold  text-left p-3 rounded-lg">
                          {post.title}
                        </h1>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
          {isDeleted && "Usunięto pomyślnie!"}
          {selectedPost !== undefined && (
            <button
              onClick={() => {
                deleteBlogPost(selectedPost.postId),
                  setTimeout(() => {
                    setSelectedPost(undefined);
                  }, 2000);
              }}
              className="bg-red-500 text-white p-3 rounded-md"
            >
              Usuń wpis
            </button>
          )}
        </>
      )}{" "}
      {!posts?.posts && (
        <div className="flex flex-col items-center justify-center space-y-6 w-max  h-max absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
          <h1 className="text-3xl w-max mx-auto text-white drop-shadow shadow-black">
            Brak wpisów
          </h1>
          <Link
            href="/admin/blog/new"
            className="p-3 bg-green-400 test-white mx-auto"
          >
            Dodaj nowy
          </Link>
        </div>
      )}
    </>
  );
}
