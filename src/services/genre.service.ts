import type {IGenreResponse} from "../models/IGenre.ts";
import {axiosInstance} from "./axios.service.ts";

export const genreService = {
    getAll: async (): Promise<IGenreResponse> => {
        const {data} = await axiosInstance.get("/genre/movie/list");
        return data;
    }
}