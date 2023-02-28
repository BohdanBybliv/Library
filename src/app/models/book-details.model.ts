import { ReviewModel } from "./review.model";

export class BookDetailsModel{
    constructor(public id: number,
        public title: string,
        public author: string,
        public cover: string,
        public content: string,
        public genre: string,
        public rating: number,
        public reviews: ReviewModel[])
        {}
}