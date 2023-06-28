import { DifficultiesEnum } from "../Enums/difficulties.enum";

export class DifficultyOption  {
    difficulty: DifficultiesEnum;
    rows: number;
    columns: number;
    mineCount: number;

    constructor(difficulty: DifficultiesEnum, rows: number, columns: number, mineCount: number) {
        this.difficulty = difficulty;
        this.rows = rows;
        this.columns = columns;
        this.mineCount = mineCount;
    }
}