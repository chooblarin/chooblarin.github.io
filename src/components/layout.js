import React from "react";

import Header from "../components/header";

export default ({ children }) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
};
