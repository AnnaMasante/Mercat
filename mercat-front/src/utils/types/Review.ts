export type Review = {
    _id? : string;
    text: string;
    idAuthor: any;
    idSeller: any;
    idProduct: any;
    grade: number;
    created_at?: Date;
}
