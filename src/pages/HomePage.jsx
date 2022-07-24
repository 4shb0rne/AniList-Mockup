import AnimeList from "../components/AnimeList";

function HomePage() {
  // ID dari 20 kota di Indonesia
  const page = 1;
  const perPage = 10;
  // console.log(id)
  return (
    <div>
      <h1 className="d-flex justify-content-center m-3">AniList</h1>
      <AnimeList page={page} perPage={perPage} />
    </div>
  );
}

export default HomePage;
