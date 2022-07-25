import { gql, useQuery } from "@apollo/client";
import AnimeCard from "./AnimeCard";
import "../index.css";

function AnimeList(props) {
    const removeBtnHandler = props.removeBtnHandler;
    const page = props.page;
    const perpage = props.perPage;
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

    if (loading)
        return (
            <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border text-light" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    const animes = data.Page.media;
    return (
        <div className="anime-container">
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
    );
}

export default AnimeList;
