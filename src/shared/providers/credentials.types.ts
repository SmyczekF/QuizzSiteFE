export interface User {
    username: string;
    email: string;
    image?: {type: string, data: number[]};
}