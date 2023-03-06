export class ReviewCreationModel{
    constructor(public id: number,
        public message: string,
        public reviewer: string,
        public bookId: number)
        {}
}