export interface ISignup {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
}

export interface ILogin {
    email: string;
    password: string;
}

export type ReducerT = {
    value: TUser;
}

export type TUser = {
    email: string;
    firstName: string;
    lastName: string;
    id: string;
    _id: string;
    __v: number;
}

export type BoardsValueT = {
    value: BoardsT[]
} 

export interface IBoards {
    boards: BoardsT[]
}

export type BoardsT = {
    _id: string;
    user: string;
    icon: string;
    title: string;
    description: string;
    position: number;
    favourite: boolean;
    favouritePosition: number;
    __v: number;
    id: string;

}

export type ITask = {
    id: string ,
    _id: string | undefined,
    section: ISection,
    title: string,
    content: string,
    position: number,
    createdAt?: string
} | undefined

export type ISection = {
    id: string;
    _id: string;
    board: string;
    title: string;
}