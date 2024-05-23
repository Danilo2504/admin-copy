"use client";
import { useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeftIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getUserById } from "@/src/services/users";

const profileImageUrl =
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E";

interface UserProps {
  id: string;
  email: string;
  fullName: string;
  countryCode: string;
  cellPhone: string;
  country: string;
}

const UserProfile = ({ params }: any) => {
  const { data, isPending, refetch, isRefetching }: UseQueryResult<UserProps> =
    useQuery({
      queryKey: ["user_profile"],
      queryFn: () => getUserById(params.id),
    });

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(params.id);
      alert("¡Copy to clipboard!");
    } catch (error) {
      console.error("Error while copying to clipboard:", error);
    }
  };

  useEffect(() => {
    refetch();
  }, [params.id]);

  return (
    <div className="flex flex-col py-4 pl-2 pr-6 gap-6">
      <Link href="/users">
        <span className="text-[#344767] font-semibold inline-flex items-center gap-2">
          <ChevronLeftIcon height="20px" />
          Go back
        </span>
      </Link>

      <div className="card-base flex flex-1 flex-col p-10">
        <section className="flex gap-6">
          <div>
            <img
              className="rounded-[50px]"
              src={profileImageUrl}
              width="80px"
              height="80px"
            />
          </div>
          <div>
            <p className="text-[#344767] font-semibold">
              {isPending || isRefetching ? "Loading..." : data?.fullName}
            </p>
            <p className="my-1">{data?.email}</p>
            <button
              onClick={copyToClipboard}
              className="hover:text-[#3175DC] text-gray-500 inline-flex gap-2"
            >
              <ClipboardDocumentListIcon width={24} />
              {data?.id}
            </button>
          </div>
        </section>

        <div className="my-4 h-1 bg-[#fafafa]" />

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold mr-auto text-[#344767]">
            Personal Data
            <hr className="h-[3px] bg-[#344767] mt-1 mr-2 mb-4" />
          </h2>
          <div className="flex flex-1 gap-[6rem] mb-4">
            <div className="flex flex-col">
              <label className="mb-2 text-xs font-semibold">Name</label>
              <input
                className="px-4 py-3 border-2 w-[375px] text-gray-500 border-solid rounded-xl border-gray-100"
                name="name"
                value={
                  isPending || isRefetching
                    ? "..."
                    : data?.fullName.split(" ")[0]
                }
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-xs font-semibold">Surname</label>
              <input
                className="px-4 py-3 border-2 w-[375px] text-gray-500 border-solid rounded-xl border-gray-100"
                name="surname"
                value={
                  isPending || isRefetching
                    ? "..."
                    : data?.fullName.split(" ")[1]
                }
                readOnly
              />
            </div>
          </div>

          <div className="flex flex-1 gap-[6rem]">
            <div className="flex flex-col">
              <label className="mb-2 text-xs font-semibold">Phone</label>
              <input
                className="px-4 py-3 border-2 w-[375px] text-gray-500 border-solid rounded-xl border-gray-100"
                name="phone"
                value={isPending || isRefetching ? "..." : data?.cellPhone}
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-xs font-semibold">Email</label>
              <input
                className="px-4 py-3 border-2 w-[375px] text-gray-500 border-solid rounded-xl border-gray-100"
                name="email"
                value={isPending || isRefetching ? "..." : data?.email}
                readOnly
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
