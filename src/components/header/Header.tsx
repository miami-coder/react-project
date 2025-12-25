import { useEffect } from 'react';
import { useAppDispatch } from "../../redux/hooks/useAppDispatch.tsx";
import { useAppSelector } from "../../redux/hooks/useAppSelector.tsx";
import { genreSliceActions } from "../../redux/genreSlice/genreSlice.ts";
import s from "./Header.module.css";
import { SearchForm } from "../searchForm/SearchForm.tsx";
import { UserInfo } from "../userInfo/UserInfo.tsx";
import {Link} from "react-router";

const Header = () => {
    const dispatch = useAppDispatch();
    const { genres } = useAppSelector(state => state.genreSlice);

    useEffect(() => {
        dispatch(genreSliceActions.loadGenres());
    }, [dispatch]);

    return (
        <header className={s.header}>
            <div className={s.logo}>
                <Link to="/">Mini-Netflix</Link>
            </div>

            <nav className={s.nav}>
                <Link to="/movies">All Movies</Link>

                <div className={s.genresDropdown}>
                    <span>Genres ▾</span>
                    <div className={s.dropdownContent}>
                        {genres.map(genre => (
                            <Link key={genre.id} to={`/movies?with_genres=${genre.id}`}>
                                {genre.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>

            <div className={s.rightSection}>
                <SearchForm />
                <UserInfo />
            </div>
        </header>
    );
};

export default Header;