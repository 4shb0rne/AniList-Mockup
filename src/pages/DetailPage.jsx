import { gql, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function DetailPage() {
  let { id } = useParams();
  var favoritesStr = localStorage["favorite_anime"] || "";

  var favorite = [];
  if (favoritesStr !== "") {
    favorite = favoritesStr.split(",");
  }

  var temp = false;
  if (favorite.includes(id)) temp = true;

  const [isFavorite, setFavorite] = useState(temp);

  const CITY_QUERY = gql`
    query GetAnimes($id: Int) {
      Media(id: $id, type: ANIME, sort: TRENDING_DESC) {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
        duration
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        bannerImage
        description
        status
      }
    }
  `;
  const { loading, error, data } = useQuery(CITY_QUERY, {
    variables: {
      id: parseInt(id),
    },
  });

  if (loading)
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-light" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  const handleButton = () => {
    if (!isFavorite) {
      setFavorite(true);
      if (favoritesStr !== "") {
        favoritesStr += `,${id}`;
      } else {
        favoritesStr = id;
      }
      favorite.push(id);
      localStorage.setItem("favorite_anime", favoritesStr);
    } else {
      setFavorite(false);
      favorite = favorite.filter((c) => c !== id);
      localStorage.setItem("favorite_anime", favorite.toString());
    }

    // console.log(keyword)
  };
  var btn = "";
  if (!isFavorite)
    btn = (
      <button className="btn btn-outline-success" onClick={handleButton}>
        Add to Favorites
      </button>
    );
  else
    btn = (
      <button className="btn btn-outline-danger" onClick={handleButton}>
        Remove from Favorites
      </button>
    );

  const anime = data.Media;
  return (
    <div className="card text-center">
      <div className="card-header">
        <img src={anime.bannerImage}></img>
      </div>
      <div className="card-body">
        <h5 className="card-title">{anime.title.romaji}</h5>
        <img src={anime.coverImage.large}></img>
        <p className="card-text">{anime.description}</p>
        {btn}
      </div>
      <div className="card-footer">
        <p>
          Start Date : {anime.startDate.day}-{anime.startDate.month}-
          {anime.startDate.year}{" "}
        </p>
        <p>
          End Date : {anime.endDate.day}-{anime.endDate.month}-
          {anime.endDate.year}{" "}
        </p>
        <p>Duration : {anime.duration} minutes/episode</p>
        <p>Status : {anime.status}</p>
      </div>
    </div>
  );
}

export default DetailPage;
