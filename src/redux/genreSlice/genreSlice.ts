import { createAsyncThunk, createSlice, isFulfilled, type PayloadAction } from "@reduxjs/toolkit";
import { genreService } from "../../services/genre.service";
import type {IGenre, IGenreResponse} from "../../models/IGenre.ts";

type GenreSliceType = {
    genres: IGenre[];
    loadState: boolean;
}

const initialState: GenreSliceType = {
    genres: [],
    loadState: false
};

const loadGenres = createAsyncThunk(
    'genreSlice/loadGenres',
    async (_, thunkAPI) => {
        try {
            const data = await genreService.getAll();
            return thunkAPI.fulfillWithValue(data);
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('error');
        }
    }
);

export const genreSlice = createSlice({
    name: "genreSlice",
    initialState: initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(loadGenres.fulfilled, (state, action: PayloadAction<IGenreResponse>) => {
                state.genres = action.payload.genres;
            })
            .addMatcher(isFulfilled(loadGenres), (state) => {
                state.loadState = true;
            })
});

export const genreSliceActions = {
    ...genreSlice.actions,
    loadGenres
};