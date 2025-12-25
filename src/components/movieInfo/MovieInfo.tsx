import { StarsRating } from "../starRating/StarsRating.tsx";
import { GenreBadge } from "../genreBadge/GenreBadge.tsx";
import s from "./MovieInfo.module.css";
import type { IMovie } from "../../models/IMovie.ts";
import { useAppSelector } from "../../redux/hooks/useAppSelector.tsx";
import type {FC} from "react";

interface IProps {
    movie: IMovie;
}

export const MovieInfo: FC<IProps> = ({ movie }) => {
    const { genres } = useAppSelector(state => state.genreSlice);

    const getGenreName = (id: number): string => {
        const genre = genres.find(g => g.id === id);
        return genre ? genre.name : 'Movie';
    };

    return (
        <div className={s.infoWrapper}>
            <h1 className={s.label}>{movie.title}</h1>

            <div className={s.ratingRow}>
                <StarsRating rating={movie.vote_average} />
                <span className={s.date}>{movie.release_date}</span>
            </div>

            <div className={s.badges}>
                {movie.genre_ids?.map(id => (
                    <GenreBadge
                        key={id}
                        id={id}
                        name={getGenreName(id)}
                    />
                ))}
            </div>

            <div className={s.description}>
                <h3>Description:</h3>
                <p>{movie.overview}</p>
            </div>
        </div>
    );
};