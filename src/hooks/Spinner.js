import React from "react";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

export default function Spinner() {
  return (
    <div className="sweet-loading">
      <ClipLoader size={150} color={"#123abc"} />
    </div>
  );
}
