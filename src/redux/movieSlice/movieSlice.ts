import { createAsyncThunk, createSlice, isPending, isRejected, type PayloadAction } from "@reduxjs/toolkit";
import { movieService } from "../../services/movie.service";
import type { IMovie, IMovieResponse } from "../../models/IMovie.ts";

type MovieSliceType = {
    movies: IMovie[];
    currentMovie: IMovie | null;
    totalPages: number;
    currentPage: number;
    loadState: boolean;
    error: string | null;
}

const initialState: MovieSliceType = {
    movies: [],
    currentMovie: null,
    totalPages: 1,
    currentPage: 1,
    loadState: false,
    error: null
};

export const loadMovies = createAsyncThunk(
    'movieSlice/loadMovies',
    async (page: number, thunkAPI) => {
        try {
            return await movieService.getAll(page);
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('Не вдалося завантажити фільми');
        }
    }
);

export const loadMovieById = createAsyncThunk(
    'movieSlice/loadMovieById',
    async (id: number, thunkAPI) => {
        try {
            return await movieService.getById(id);
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('Фільм не знайдено');
        }
    }
);

export const movieSlice = createSlice({
    name: "movieSlice",
    initialState: initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        clearCurrentMovie: (state) => {
            state.currentMovie = null;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(loadMovies.fulfilled, (state, action: PayloadAction<IMovieResponse>) => {
                state.movies = action.payload.results;
                state.totalPages = action.payload.total_pages > 500 ? 500 : action.payload.total_pages;
                state.currentPage = action.payload.page;
                state.loadState = true;
                state.error = null;
            })
            .addCase(loadMovieById.fulfilled, (state, action: PayloadAction<IMovie>) => {
                state.currentMovie = action.payload;
                state.loadState = true;
            })
            .addMatcher(isPending(loadMovies), (state) => {
                state.loadState = false;
            })
            .addMatcher(isRejected(loadMovies), (state, action) => {
                state.loadState = true;
                state.error = action.payload as string;
            })
});

export const movieSliceActions = {
    ...movieSlice.actions,
    loadMovies,
    loadMovieById,
}