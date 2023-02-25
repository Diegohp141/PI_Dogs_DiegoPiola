import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar.jsx";

export default function DogDetail() {
  let { id } = useParams();
  console.log(id);
  return (
    <div>
      <NavBar />
      <h3>DogDetail</h3>
    </div>
  );
}
