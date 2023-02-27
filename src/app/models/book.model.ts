export class BookModel {
    constructor(public id: number,
        public title: string,
        public author: string,
        public cover: string,
        public rating: number,
        public reviewsNumber: number)
        {}
}