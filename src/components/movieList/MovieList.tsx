import { MovieListCard } from "../movieListCard/MovieListCard.tsx";
import s from "./MovieList.module.css";
import type {IMovie} from "../../models/IMovie.ts";
import type {FC} from "react";

interface IProps {
    movies: IMovie[];
}

export const MovieList: FC<IProps> = ({ movies }) => (
    <div className={s.listGrid}>
        {movies.map(movie => (
            <MovieListCard key={movie.id} movie={movie} />
        ))}
    </div>
);