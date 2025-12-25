import type { IMovie, IMovieResponse } from "../models/IMovie.ts";
import { axiosInstance } from "./axios.service.ts";

export const movieService = {
    getAll: async (page: number = 1): Promise<IMovieResponse> => {
        const { data } = await axiosInstance.get<IMovieResponse>("/discover/movie", {
            params: { page }
        });
        return data;
    },

    getById: async (id: number): Promise<IMovie> => {
        const { data } = await axiosInstance.get<IMovie>(`/movie/${id}`);
        return data;
    },

    searchMovies: async (query: string, page: number = 1): Promise<IMovieResponse> => {
        const { data } = await axiosInstance.get<IMovieResponse>("/search/movie", {
            params: {
                query,
                page
            }
        });
        return data;
    },
    getByGenre: async (genreId: string, page: number = 1): Promise<IMovieResponse> => {
        const { data } = await axiosInstance.get<IMovieResponse>("/discover/movie", {
            params: { with_genres: genreId, page }
        });
        return data;
    }
}