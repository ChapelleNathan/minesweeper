import { DifficultiesEnum } from "../Enums/difficulties.enum";

export interface Difficulties_Options {
    difficulty : DifficultiesEnum,
    rows: number,
    columns: number,
    mineCount: number,
}