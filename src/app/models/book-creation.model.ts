export class BookCreationModel{
    constructor(public id: number,
        public title: string,
        public author: string,
        public cover: string,
        public content: string,
        public genre: string)
        {}
}