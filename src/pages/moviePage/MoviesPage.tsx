import { useEffect } from "react";
import { useAppSelector } from "../../redux/hooks/useAppSelector.tsx";
import { useAppDispatch } from "../../redux/hooks/useAppDispatch.tsx";
import { movieSliceActions } from "../../redux/movieSlice/movieSlice.ts";
import { Pagination } from "../../components/pagination/Pagination.tsx";
import s from "./MoviesPage.module.css";
import { useSearchParams } from "react-router";
import { MovieList } from "../../components/movieList/MovieList.tsx";

export const MoviesPage = () => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const pageFromUrl = Number(searchParams.get('page')) || 1;
    const searchQuery = searchParams.get('query') || '';
    const genreId = searchParams.get('with_genres') || '';

    const { movies, loadState, currentPage, totalPages } = useAppSelector(({ movieSlice }) => movieSlice);

    useEffect(() => {
        dispatch(movieSliceActions.setCurrentPage(pageFromUrl));

        if (searchQuery) {
            dispatch(movieSliceActions.loadMoviesBySearch({ query: searchQuery, page: pageFromUrl }));
        } else if (genreId) {
            dispatch(movieSliceActions.loadMoviesByGenre({ genreId, page: pageFromUrl }));
        } else {
            dispatch(movieSliceActions.loadMovies(pageFromUrl));
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [dispatch, pageFromUrl, searchQuery, genreId]);

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', newPage.toString());
        setSearchParams(params);
    };

    if (!loadState) return <div className={s.loading}>Loading...</div>;
    if (movies.length === 0) {
        return (
            <div className={s.container}>
                <h3 className={s.sectionTitle}>
                    {searchQuery ? `No results for: "${searchQuery}"` : "No movies found"}
                </h3>
                <div className={s.noResults}>
                    <p>We couldn't find any movies matching your request.</p>
                    <button onClick={() => setSearchParams({})} className={s.pageBtn}>
                        Back to All Movies
                    </button>
                </div>
            </div>
        );
    }

    const showBanner = !searchQuery && !genreId && movies.length > 0;
    const displayMovies = showBanner ? movies.slice(1) : movies;

    return (
        <div className={s.container}>
            {showBanner && (
                <div className={s.banner}>
                    <img
                        className={s.bannerBg}
                        src={`https://image.tmdb.org/t/p/original${movies[0].backdrop_path}`}
                        alt={movies[0].title}
                    />
                    <div className={s.bannerContent}>
                        <h1>{movies[0].title}</h1>
                        <p>{movies[0].overview.substring(0, 160)}...</p>
                        <button className={s.playBtn}>Play Now</button>
                    </div>
                </div>
            )}

            <h3 className={s.sectionTitle}>
                {searchQuery ? `Results for: "${searchQuery}"` :
                    genreId ? "Genre Filter" : "The Best Films"}
            </h3>

            <MovieList movies={displayMovies} />

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};