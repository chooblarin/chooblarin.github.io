import React from "react";

import HomeHeader from "../components/home-header";

export default ({ children }) => {
  return (
    <div>
      <HomeHeader />
      <div>{children}</div>
    </div>
  );
};
