import { Photo } from "./photo";

    export interface Member {
        id: number;
        userName: string;
        photoUrl: string;
        age: number;
        knownAs: string;
        profileCreated: Date;
        lastActived: Date;
        gender: string;
        introduction: string;
        lookingFor: string;
        interests: string;
        city: string;
        country: string;
        photos: Photo[];
    }





