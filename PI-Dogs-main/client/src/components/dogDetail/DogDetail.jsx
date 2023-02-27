import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "../navBar/NavBar.jsx";
import { getDogDetail } from "../../redux/actions/actions.js";

export default function DogDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogDetail(id));
  }, [dispatch, id]);

  const dogDetail = useSelector((state) => state.detail);

  return (
    <div>
      <NavBar />
      {dogDetail && <div>hola</div>}
    </div>
  );
}
