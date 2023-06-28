import { interval, Observable, ReplaySubject, takeUntil } from "rxjs";

export class TimerService {

    chrono: string = '00:00';
    private _minute: number = 0;
    private _second: number = 0;
    private _timer$: Observable<number> = interval(1000);
    private _destroyed$: ReplaySubject<boolean> = new ReplaySubject();

    constructor(){}

    startTimer(): void {
        this._timer$.pipe(takeUntil(this._destroyed$)).subscribe(() => {
            if(this._second >= 60 ){
                this._second = 0;
                this._minute++;
            } else {
                this._second++;
            }
            this.chrono = this._minute.toString().padStart(2, '0') + ':' + this._second.toString().padStart(2,'0');
        })
    }

    stopTimer(): void{
        this._destroyed$.next(false);
        this._destroyed$.complete();
        this._destroyed$ = new ReplaySubject();
    }

    resetTimer(): void {
        this._second = this._minute = 0;
        this.chrono = '00:00';
        this.stopTimer();
    }
}