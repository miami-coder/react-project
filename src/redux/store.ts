import {configureStore} from "@reduxjs/toolkit";
import {movieSlice} from "./movieSlice/movieSlice.ts";
import {genreSlice} from "./genreSlice/genreSlice.ts";

export const store = configureStore({
    reducer: {
        movieSlice: movieSlice.reducer,
        genreSlice: genreSlice.reducer,
    }
})