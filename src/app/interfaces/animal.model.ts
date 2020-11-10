import { Food } from './food.model';

export interface Animal{
    id: string;
    name: string;
    numOfLegs: number;
    classText: string;
    classCode:number;
    subClassText: string;
    subClassCode:number;
    description:string;
    dateAdded:string;

    foods?:Food[]
}


export interface AnimalForCreation{
    name: string;
    numOfLegs: number;
    class: string;
    dateAdded:string;
    description:string;

    foods?:Food[]
}