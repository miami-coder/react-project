import {useEffect} from "react";
import {useAppSelector} from "../redux/hooks/useAppSelector";
import {useAppDispatch} from "../redux/hooks/useAppDispatch";
import s from "./MoviesPage.module.css";
import {movieSliceActions} from "../redux/movieSlice/movieSlice.ts";
import {useSearchParams} from "react-router";
import {MovieListCard} from "../components/movieListCard/MovieListCard.tsx";

export const MoviesPage = () => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const pageFromUrl = Number(searchParams.get('page')) || 1;
    const { movies, loadState, currentPage, totalPages } = useAppSelector(({ movieSlice }) => movieSlice);

    useEffect(() => {
        dispatch(movieSliceActions.setCurrentPage(pageFromUrl));
        dispatch(movieSliceActions.loadMovies(pageFromUrl));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [dispatch, pageFromUrl]);

    const handleNext = () => {
        if (pageFromUrl < totalPages) {
            setSearchParams({ page: (pageFromUrl + 1).toString() });
        }
    };

    const handlePrev = () => {
        if (pageFromUrl > 1) {
            setSearchParams({ page: (pageFromUrl - 1).toString() });
        }
    };

    if (!loadState) return <div className={s.loading}>Loading...</div>;

    const topMovie = movies[0];
    const otherMovies = movies.slice(1);

    return (
        <div className={s.container}>
            {topMovie && (
                <div className={s.banner}>
                    <img
                        className={s.bannerBg}
                        src={`https://image.tmdb.org/t/p/original${topMovie.backdrop_path}`}
                        alt={topMovie.title}
                    />
                    <div className={s.bannerContent}>
                        <h1>{topMovie.title}</h1>
                        <p>{topMovie.overview.substring(0, 160)}...</p>
                        <button className={s.playBtn}>Play Now</button>
                    </div>
                </div>
            )}

            <h3 className={s.sectionTitle}>The Best Films</h3>

            <div className={s.moviesGrid}>
                {otherMovies.map(movie => (
                    <MovieListCard key={movie.id} movie={movie} />
                ))}
            </div>

            <div className={s.pagination}>
                <button
                    className={s.pageBtn}
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                >
                    &lt; Prev
                </button>

                <div className={s.pageInfo}>
                    Page <span>{currentPage}</span> of {totalPages}
                </div>

                <button
                    className={s.pageBtn}
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                >
                    Next &gt;
                </button>
            </div>
        </div>
    );
};