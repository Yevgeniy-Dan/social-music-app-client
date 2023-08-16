import React, { useState } from "react";

import OurInput from "@/ui/OurInput";

const Search = () => {
  const [value, setValue] = useState("");

  const searchFriend: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
  };

  return (
    <form onSubmit={(e) => searchFriend(e)}>
      <OurInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search..."
        submitIcon="../Search.svg"
      />
    </form>
  );
};

export default Search;
