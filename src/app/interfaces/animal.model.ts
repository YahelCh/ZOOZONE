import { Food } from './food.model';

export interface Animal{
    id: string;
    name: string;
    numOfLegs: number;
    class: string;
    description:string;

    foods?:Food[]
}


export interface AnimalForCreation{
    name: string;
    numOfLegs: number;
    class: string;
    description:string;

    foods?:Food[]
}