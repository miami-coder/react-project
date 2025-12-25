import {useAppDispatch} from "../redux/hooks/useAppDispatch.tsx";
import {useEffect} from "react";
import {genreSliceActions} from "../redux/genreSlice/genreSlice.ts";
import Header from "../components/header/Header.tsx";
import {Outlet} from "react-router";

const MainLayout = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(genreSliceActions.loadGenres());
    }, [dispatch]);

    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;