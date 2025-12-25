import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch } from "../../redux/hooks/useAppDispatch.tsx";
import { useAppSelector } from "../../redux/hooks/useAppSelector.tsx";
import { movieSliceActions } from "../../redux/movieSlice/movieSlice.ts";
import { PosterPreview } from "../../components/posterPreview/PosterPreview.tsx";
import { MovieInfo } from "../../components/movieInfo/MovieInfo.tsx";
import s from "./MovieDetailsPage.module.css";

export const MovieDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();

    const { currentMovie, loadState } = useAppSelector(state => state.movieSlice);

    useEffect(() => {
        if (id) {
            dispatch(movieSliceActions.loadMovieById(Number(id)));
        }

        return () => {
            dispatch(movieSliceActions.clearCurrentMovie());
        };
    }, [id, dispatch]);

    if (!loadState) {
        return <div className={s.loader}>Loading...</div>;
    }

    if (!currentMovie) {
        return <div className={s.error}>Movie not found</div>;
    }

    return (
        <main className={s.detailsPage}>
            <PosterPreview
                path={currentMovie.backdrop_path || currentMovie.poster_path}
                title={currentMovie.title}
            />
            <MovieInfo movie={currentMovie} />
        </main>
    );
};