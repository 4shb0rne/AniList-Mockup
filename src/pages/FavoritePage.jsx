import { useState } from "react";
import AnimeCard from "../components/AnimeCard";
import { gql, useQuery } from "@apollo/client";
function FavoritePage() {
    var favoritesStr = localStorage["favorite_anime"] || "";
    var temp = [];
    const page = 1;
    const perpage = 10;
    var animes = [];
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
        query GetAnimes($page: Int, $perPage: Int) {
            Page(page: $page, perPage: $perPage) {
                media(type: ANIME, sort: TRENDING_DESC) {
                    id
                    title {
                        romaji
                    }
                    coverImage {
                        large
                    }
                }
            }
        }
    `;
    const { loading, error, data } = useQuery(QUERY, {
        variables: {
            page: page,
            perPage: perpage,
        },
    });

    if (loading) {
        return <>Loading</>;
    }

    if (!error && data) {
        animes = data.Page.media.filter((m) => favoriteArr.includes(`${m.id}`));
        console.log(animes);
    }
    return (
        <div>
            <h2 className="d-flex justify-content-center text-info m-3 text-center">
                Your Favourite Anime
            </h2>

            <div className="container d-flex flex-wrap">
                {animes?.map((a) => {
                    return (
                        <AnimeCard
                            anime={a}
                            key={a.id}
                            removeBtnHandler={removeBtnHandler}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default FavoritePage;
