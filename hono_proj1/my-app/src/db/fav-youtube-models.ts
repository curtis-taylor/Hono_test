import { Schema, model } from "mongoose";

export interface IFavYoutubeVideoSchema {
    title: string;
    description: string;
    thumbnailUrl?: string;
    watched: boolean;
    youtuberName: string
}
/*
const FavYoutubeVideoScheme = new
Schema<IFavYoutubeVideoSchema>({
    title {
        type: String,
        required
    }
}) */