import type { FC } from "react";
import type { IMovie } from "../models/IMovie.ts";
import s from "./MovieList.module.css";
import {MovieListCard} from "./movieListCard/MovieListCard.tsx";

interface IProps {
    movies: IMovie[];
}

export const MovieList: FC<IProps> = ({ movies }) => {
    return (
        <div className={s.listGrid}>
            {movies.map(movie => (
                <MovieListCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};