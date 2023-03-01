import React from "react";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import styled from "styled-components";
console.log("a");

export const NavLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.color};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  border: ${(props) => props.border};
  padding: ${(props) => props.padding};
  font-size: ${(props) => props.fontSize};
  &:hover {
    color: ${(props) => props.chover};
    font-size: ${(props) => props.fshover};
    cursor: ${(props) => props.cursor};
  }
`;

export default function NavBar() {
  return (
    <header className={style.container}>
      <div className={style.divLink}>
        <NavLink
          to="/home"
          color="white"
          fontSize="4vh"
          cursor="pointer"
          chover="rgb(6, 59, 6)"
          fshover="5vh"
        >
          Home
        </NavLink>
      </div>

      <div className={style.divLink}>
        <NavLink
          to="/dog"
          color="white"
          fontSize="4vh"
          cursor="pointer"
          padding="1vh 1vw"
          chover="rgb(6, 59, 6)"
          fshover="5vh"
        >
          Create Dog
        </NavLink>
      </div>
    </header>
  );
}
