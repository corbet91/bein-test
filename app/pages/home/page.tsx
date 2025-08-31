"use client";

import { CardPost } from "@/components/card-post";
import { getAllPost } from "@/services/post.service";
import { IPost } from "@/types";
import { useSearch } from "@/zustand";
import { useInfiniteQuery } from "@tanstack/react-query";

const Home = () => {
 const { search, setSearch } = useSearch()

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["post",search],
    queryFn: () => getAllPost({search : search as string}),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.skip + lastPage.limit;
      return nextPage < lastPage.total ? nextPage : undefined;
    },
  });

  const dataPost = (data?.pages?.[0]?.posts || []) as IPost[];

  return (
    <div className="flex flex-col items-center bg-[#EAEDF2] gap-4 pt-19 pb-4">
      {dataPost.map((item, index) => {
        return <CardPost body={item.body} title={item.title} key={index} userId={item.userId} tags={item?.tags} />;
      })}
    </div>
  );
};

export default Home;
