export class User {
    id: number;
    email: string;
    password: string;
    name: string;
    sex: string;

    constructor(
        public id: number,
        public email: string,
        public password: string,
        public name: string,
        public sex: string
    ) {}
}