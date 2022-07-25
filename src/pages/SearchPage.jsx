import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import AnimeCard from "../components/AnimeCard";
import "../index.css";
function SearchPage() {
    const [keyword, setKeyword] = useState("");

    const handleSearch = () => {
        setKeyword(document.getElementById("keyword").value);
        console.log(keyword);
    };

    const SEARCH_QUERY = gql`
        query SearchByName($name: String) {
            Media(search: $name, type: ANIME) {
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
    const { loading, e, data } = useQuery(SEARCH_QUERY, {
        variables: {
            name: keyword,
        },
    });

    console.log(data);
    var search_result = "";
    if (loading || keyword === "") search_result = "";
    else {
        if (!data || !data.Media)
            search_result = (
                <i className="text-warning mt-5">"{keyword}" not found</i>
            );
        else {
            const anime = data.Media;
            console.log(anime);
            search_result = <AnimeCard anime={anime} key={anime.id} />;
        }
    }

    return (
        <div>
            <h1 className="d-flex justify-content-center m-3">Search</h1>

            <div className="search-page-container">
                <div className="search-container mt-3">
                    <div className="form-inline">
                        <input
                            id="keyword"
                            className="form-control mr-sm-2"
                            type="search"
                            placeholder="Search Anime Title"
                            aria-label="Search"
                        />
                        <button
                            className="btn btn-dark "
                            type="submit"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                </div>
                <div className="search-result">{search_result}</div>
            </div>
        </div>
    );
}

export default SearchPage;
