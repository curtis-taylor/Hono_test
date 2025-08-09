import { Schema, model } from "mongoose";

export interface IFavYoutubeVideoSchema {
    title: string;
    description: string;
    thumbnailUrl?: string;
    watched: boolean;
    youtuberName: string
}

const FavYoutubeVideoScheme = new
Schema<IFavYoutubeVideoSchema>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnailUrl: {
        type: String,
        default: "https://images.silvergold.media/cdn-cgi/image/quality=85,format=auto/https://silvergold.media/media/catalog/category/category-tiles-gold-new-arrivals-gold.png",
        required: false
    },
    watched: {
        type: Boolean,
        default: false,
        required: true
    },
    youtuberName: {
        type: String,
        required: true
    }

});

const FavYoutubeVideosModel = model('fav-youtube-videos', FavYoutubeVideoScheme);

export default FavYoutubeVideosModel;