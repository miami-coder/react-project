import s from "./Header.module.css";
import {Link} from "react-router";

const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.logo}>
                <Link to="/">MOVIE-DB</Link>
            </div>

            <nav className={s.nav}>
                <Link to="/movies">Movies</Link>
            </nav>

            <div className={s.userSection}>
                <span>Bohdan</span>
                <div className={s.avatar}></div>
            </div>
        </header>
    );
};

export default Header;