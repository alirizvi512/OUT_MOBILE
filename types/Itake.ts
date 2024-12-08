import { ICult } from "./ICult";
import { IMiniProfile } from "./IMiniProfile";
import { ITaggedUsers } from "./ITaggedUsers";

export interface ITake {
    id: number;
    cult: ICult;
    poster: IMiniProfile;
    category: number;
    content: string;
    mediaImage: string;
    mediaImageWidth: number;
    mediaImageHeight: number;
    commentsAmount: number;
    answer1: number;
    isHotTake: number;
    answer2: number;
    myAnswer: number;
    timestamp: number;
    taggedUsers: ITaggedUsers;
    isPublic: number;
}