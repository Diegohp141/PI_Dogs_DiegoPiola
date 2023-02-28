import React from "react";
import style from "./LandingPage.module.css";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavLink = styled(Link)`
  font-size: 8vh;
  width: 10%;
  border: 2px solid rgb(20, 94, 20);
  border-radius: 10px;
  color: white;
  text-decoration: none;
  padding: 0px 10px 0px 10px;
  margin-bottom: 250px;
  background-color: rgba(20, 94, 20, 0.8);
  &:hover {
    color: rgb(201, 184, 184);
    cursor: pointer;
  }
`;

export default function Landingpage() {
  return (
    <div className={style.divContainer}>
      <h1 className={style.title}>Welcome to my dog ​​api!</h1>
      <h3 className={style.subTitle}>Prepare for cuteness</h3>
      <NavLink to="/home">Enter</NavLink>
    </div>
  );
}
