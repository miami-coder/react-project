import s from "./PosterPreview.module.css";
import type {FC} from "react";

interface IProps {
    path: string;
    title: string;
}

export const PosterPreview: FC<IProps> = ({ path, title }) => (
    <div className={s.posterContainer}>
        <img
            src={`https://image.tmdb.org/t/p/original${path}`}
            alt={title}
            className={s.image}
        />
        <div className={s.gradientOverlay} />
    </div>
);