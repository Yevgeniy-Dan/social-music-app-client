"use client";

import { useQuery } from "@apollo/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEventHandler, useEffect, useState } from "react";

import { AnimatePresence, motion as m } from "framer-motion";

import UserBage from "@/ui/UserBage";
import OurInput from "@/ui/OurInput";
import { GET_USER_BY_NAME } from "@/graphql/query/searchByName";
import { SearchNameQueryVariables, SearchResponse } from "@/@types/graphql";

const SearchPage = () => {
  const [value, setValue] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setValue(searchParams.get("value"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onSelect(value);
    refetch({ username: value });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const onSelect = (event: string) => {
    // now you got a read/write object
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

    // update as necessary
    const value = event?.trim();

    if (!value) {
      current.set("value", "");
    } else {
      current.set("value", value);
    }

    // cast to string
    const search = current.toString();
    // or const query = `${'?'.repeat(search.length && 1)}${search}`;
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  const { data, refetch, loading } = useQuery<
    { searchByName: SearchResponse[] },
    SearchNameQueryVariables
  >(GET_USER_BY_NAME, {
    variables: {
      username: searchParams.get("value"),
    },
  });

  if (loading) return;

  const searchFriend: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!value) return;
  };

  return (
    <div>
      <div className="flex items-center justify-between pt-9 mb-7">
        <h3 className="text-2xl font-semibold text-mainText">Search Result</h3>
        <button className="bg-grad text-white py-2 px-3 flex items-center gap-2 rounded-[10px] cursor-pointer">
          <img src="./Arrow.svg" alt="" /> Back
        </button>
      </div>
      <form onChange={(e) => searchFriend(e)}>
        <OurInput
          value={value}
          onChange={(e) => {
            onSelect(e.target.value);
            setValue(e.target.value);
          }}
          placeholder="Search..."
        />
      </form>
      <AnimatePresence mode="popLayout">
        {data &&
          value &&
          !loading &&
          data.searchByName.map((item, key) => {
            return (
              <m.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                exit={{ opacity: 0, y: 20 }}
                layout
                className="mt-4 p-4 bg-white rounded-[15px]"
              >
                <UserBage {...item.user} />
              </m.div>
            );
          })}
      </AnimatePresence>
    </div>
  );
};

export default SearchPage;
