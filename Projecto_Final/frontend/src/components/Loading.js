import React from "react";
import { Spinner } from "react-bootstrap";

function Loading({ size = 70 }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Spinner
        style={{
          color: "orange",
          width: size,
          height: size,
        }}
        animation="border"
      />
    </div>
  );
}

export default Loading;