import s from './Pagination.module.css';
import type {FC} from "react";

interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

export const Pagination: FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className={s.pagination}>
            <button
                className={s.pageBtn}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &lt; Prev
            </button>

            <div className={s.pageInfo}>
                Page <span>{currentPage}</span> of {totalPages}
            </div>

            <button
                className={s.pageBtn}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next &gt;
            </button>
        </div>
    );
};