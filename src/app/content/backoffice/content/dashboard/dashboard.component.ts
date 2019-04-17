import { Component, OnDestroy, OnInit } from '@angular/core';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { CardStatus, filtredByStatusCards, ICard } from './store/reducers/dashboard.reducer';
import { ChangeCard, GetBoard } from './store/actions/dashboard.action';
import { EntityState } from '@ngrx/entity';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [
        trigger('listAnimation', [
            transition('* => *', [
                // each time the binding value changes
                query(':leave', [stagger(100, [animate('.5s', style({ opacity: 0 }))])], { optional: true }),
                query(':enter', [style({ opacity: 0 }), stagger(100, [animate('.5s', style({ opacity: 1 }))])], {
                    optional: true,
                }),
            ]),
        ]),
    ],
})
export class DashboardComponent implements OnInit, OnDestroy {
    public todo: ICard[] = [];
    public inprogress: ICard[] = [];
    public qa: ICard[] = [];
    public done: ICard[] = [];

    private _controlUnsubscribe$$: Subject<boolean> = new Subject();

    public constructor(private _store: Store<EntityState<ICard>>) {}

    public ngOnInit(): void {
        this._store.dispatch(new GetBoard());
        this._store
            .select(filtredByStatusCards('backlog'))
            .pipe(takeUntil(this._controlUnsubscribe$$))
            .subscribe((cards: ICard[]) => {
                this.todo = cards;
            });
        this._store
            .select(filtredByStatusCards('inprogress'))
            .pipe(takeUntil(this._controlUnsubscribe$$))
            .subscribe((cards: ICard[]) => {
                this.inprogress = cards;
            });
        this._store
            .select(filtredByStatusCards('qa'))
            .pipe(takeUntil(this._controlUnsubscribe$$))
            .subscribe((cards: ICard[]) => {
                this.qa = cards;
            });
        this._store
            .select(filtredByStatusCards('done'))
            .pipe(takeUntil(this._controlUnsubscribe$$))
            .subscribe((cards: ICard[]) => {
                this.done = cards;
            });
    }

    public ngOnDestroy(): void {
        this._controlUnsubscribe$$.next(true);
    }

    public drop(event: CdkDragDrop<ICard[]>): void {
        if (event.previousContainer === event.container) {
            // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            // current item event.previousContainer.data[event.previousIndex]
            this._store.dispatch(
                new ChangeCard({
                    ...event.previousContainer.data[event.previousIndex],
                    status: event.container.id as CardStatus,
                })
            );
            // transferArrayItem(
            //     event.previousContainer.data,
            //     event.container.data,
            //     event.previousIndex,
            //     event.currentIndex
            // );
        }
    }
}
