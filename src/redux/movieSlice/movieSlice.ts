import { createAsyncThunk, createSlice, isFulfilled, type PayloadAction } from "@reduxjs/toolkit";
import { movieService } from "../../services/movie.service";
import type {IMovie, IMovieResponse} from "../../models/IMovie.ts";

type MovieSliceType = {
    movies: IMovie[];
    totalPages: number;
    currentPage: number;
    loadState: boolean;
}

const initialState: MovieSliceType = {
    movies: [],
    totalPages: 1,
    currentPage: 1,
    loadState: false
};

const loadMovies = createAsyncThunk(
    'movieSlice/loadMovies',
    async (page: number, thunkAPI) => {
        try {
            const data = await movieService.getAll(page);
            return thunkAPI.fulfillWithValue(data);
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('error');
        }
    }
);

export const movieSlice = createSlice({
    name: "movieSlice",
    initialState: initialState,
    reducers: {
        changeLoadState: (state, action: PayloadAction<boolean>) => {
            state.loadState = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(loadMovies.fulfilled, (state, action: PayloadAction<IMovieResponse>) => {
                state.movies = action.payload.results;
                state.totalPages = action.payload.total_pages;
                state.currentPage = action.payload.page;
            })
            .addMatcher(isFulfilled(loadMovies), (state) => {
                state.loadState = true;
            })
});

export const movieSliceActions = {
    ...movieSlice.actions,
    loadMovies
}