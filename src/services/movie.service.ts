import type {IMovieResponse} from "../models/IMovie.ts";
import {axiosInstance} from "./axios.service.ts";

export const movieService = {
    getAll: async (page: number = 1): Promise<IMovieResponse> => {
        const {data} = await axiosInstance.get<IMovieResponse>("/discover/movie", {params: {page}});
        return data;
    },
    getById: async (id: number) => {
        const {data} = await axiosInstance.get(`/movie/${id}`);
        return data;
    }
}