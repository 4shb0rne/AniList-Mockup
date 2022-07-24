import { useState } from "react";
import AnimeList from "../components/AnimeList";
import { gql, useQuery } from "@apollo/client";
function FavoritePage() {
  var favoritesStr = localStorage["favorite_anime"] || "";
  var temp = [];
  if (favoritesStr !== "") {
    temp = favoritesStr.split(",");
  }

  const [favoriteArr, setFavoriteArr] = useState(temp);

  const removeBtnHandler = (id) => {
    temp = temp.filter((c) => c !== id);
    localStorage.setItem("favorite_anime", temp.toString());
    setFavoriteArr(temp);
  };

  const QUERY = gql`
    query GetAnimes($id: [Int]) {
      Media(id_in: id, type: ANIME, sort: TRENDING_DESC) {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
      }
    }
  `;

  return (
    <div>
      <h2 className="d-flex justify-content-center text-info m-3 text-center">
        Your Favourite Anime
      </h2>

      <AnimeList id={favoriteArr} removeBtnHandler={removeBtnHandler} />
    </div>
  );
}

export default FavoritePage;
