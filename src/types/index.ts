// This file exports interfaces that define the types used throughout the application.

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

export interface Response<T> {
    data: T;
    message: string;
    status: number;
}