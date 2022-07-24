import { Link } from "react-router-dom";
import "../App.css";
function AnimeCard(props) {
  const anime = props.anime;
  const removeBtnHandler = props.removeBtnHandler;

  var removeBtn = "";
  if (removeBtnHandler !== null && removeBtnHandler !== undefined) {
    removeBtn = (
      <button
        className="btn btn-outline-danger mt-2"
        onClick={() => removeBtnHandler(anime.id)}
      >
        Remove from Favorites
      </button>
    );
  }

  return (
    <Link to={`/detail/${anime.id}`}>
      <div
        className="card text-white bg-dark mb-3 anime-card m-3"
        key={anime.id}
      >
        <h3 className="card-header">{anime.title.romaji}</h3>
        <div className="card-body anime-content">
          <div className="anime-card-body">
            <img
              className="card-img-top"
              alt=""
              src={anime.coverImage.large}
              style={{ width: "150px", height: "auto" }}
            />
            <div>
              <p className="card-text"></p>
              <p className="card-subtitle"></p>
            </div>
          </div>
          {removeBtn}
        </div>
      </div>
    </Link>
  );
}
export default AnimeCard;
