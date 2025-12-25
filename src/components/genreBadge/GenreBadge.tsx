import s from './GenreBadge.module.css';
import type {FC} from "react";

interface IProps {
    name: string;
}

export const GenreBadge: FC<IProps> = ({ name }) => {
    return (
        <span className={s.badge}>
            {name}
        </span>
    );
};