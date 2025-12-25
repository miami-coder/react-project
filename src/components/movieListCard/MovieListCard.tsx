import s from './MovieListCard.module.css';
import type { IMovie } from "../../models/IMovie.ts";
import { StarsRating } from "../starRating/StarsRating.tsx";
import { GenreBadge } from "../genreBadge/GenreBadge.tsx";
import { useAppSelector } from "../../redux/hooks/useAppSelector.tsx";
import type {FC} from "react";
import {Link} from "react-router";

interface IProps {
    movie: IMovie;
}

export const MovieListCard: FC<IProps> = ({ movie }) => {
    const { genres } = useAppSelector(state => state.genreSlice);

    if (!movie) return null;

    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const getGenreName = (id: number): string => {
        const genre = genres.find(g => g.id === id);
        return genre ? genre.name : 'Movie';
    };

    return (
        <div className={s.card}>
            <Link to={`/movies/${movie.id}`} className={s.posterWrapper}>
                <img src={posterUrl} alt={movie.title} />

                <div className={s.rating}>
                    ⭐ {movie.vote_average.toFixed(1)}
                </div>

                <div className={s.playOverlay}>
                    <span>▶</span>
                </div>
            </Link>

            <div className={s.info}>
                <h4 className={s.title}>{movie.title}</h4>

                <div className={s.extraInfo}>
                    <StarsRating rating={movie.vote_average} />
                </div>

                <div className={s.genres}>
                    {movie.genre_ids?.slice(0, 2).map(id => (
                        <GenreBadge
                            key={id}
                            id={id}
                            name={getGenreName(id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};