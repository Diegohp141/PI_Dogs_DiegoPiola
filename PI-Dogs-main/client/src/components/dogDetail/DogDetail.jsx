import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "../navBar/NavBar.jsx";
import { deleteDog, getAllDogs, getDogDetail } from "../../redux/actions/actions.js";
import style from "./DogDetail.module.css";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

export default function DogDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getDogDetail(id));
  }, [dispatch, id]);

  const dogDetail = useSelector((state) => state.detail);

  const hadlerDelete = (e) => {
    e.preventDefault();
    dispatch(deleteDog(id));
    dispatch(getAllDogs());
    //alert(`${dogDetail.name} was successfully deleted`);
    Swal.fire({
      title: `${dogDetail.name} was successfully deleted`,
      confirmButtonText: "OK",
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) history.push("/home");
    });
    //history.push("/home");
  };

  return (
    <div className={style.detailContainer}>
      <NavBar />
      {dogDetail && (
        <section className={style.sectionD}>
          <div className={style.cardContainer}>
            <img
              src={dogDetail.image ? dogDetail.image : dogDetail.img}
              alt={`here sould load ${dogDetail.name}`}
              className={style.img}
            ></img>
            <h3>name: {dogDetail.name}</h3>
            <p>Life span: {dogDetail.life_span}</p>
            <p>Weight: {dogDetail.weight}</p>
            <p>Weight: {dogDetail.weight}</p>
            <p>Height: {dogDetail.height}</p>
            <p>Temperament:{dogDetail.temperament}</p>
            {dogDetail.img ? (
              <button className={style.btnDelete} onClick={hadlerDelete}>
                Delete Dog
              </button>
            ) : null}
          </div>
        </section>
      )}
    </div>
  );
}
