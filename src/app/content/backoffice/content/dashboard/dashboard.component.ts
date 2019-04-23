import { Component, ComponentFactoryResolver, Injector, OnDestroy, OnInit } from '@angular/core';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { CardStatus, filteredByStatusCards, ICard } from './store/reducers/dashboard.reducer';
import { ChangeCardPending, GetBoardPending, RemoveCardPending } from './store/actions/dashboard.action';
import { EntityState } from '@ngrx/entity';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CardModalComponent } from './card-modal/card-modal.component';
import { ModalService } from '../../../../modal/modal.service';

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
    public progress: ICard[] = [];
    public qa: ICard[] = [];
    public done: ICard[] = [];

    private _controlUnsubscribe$$: Subject<boolean> = new Subject();

    public constructor(
        private _store: Store<EntityState<ICard>>,
        private _modalService: ModalService,
        private _injector: Injector,
        private _componentFactoryResolver: ComponentFactoryResolver
    ) {}

    public ngOnInit(): void {
        this._store.dispatch(new GetBoardPending());
        this._store
            .select(filteredByStatusCards(CardStatus.BACKLOG))
            .pipe(takeUntil(this._controlUnsubscribe$$))
            .subscribe((cards: ICard[]) => {
                this.todo = cards;
            });
        this._store
            .select(filteredByStatusCards(CardStatus.PROGRESS))
            .pipe(takeUntil(this._controlUnsubscribe$$))
            .subscribe((cards: ICard[]) => {
                this.progress = cards;
            });
        this._store
            .select(filteredByStatusCards(CardStatus.QA))
            .pipe(takeUntil(this._controlUnsubscribe$$))
            .subscribe((cards: ICard[]) => {
                this.qa = cards;
            });
        this._store
            .select(filteredByStatusCards(CardStatus.DONE))
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
                new ChangeCardPending({
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

    public removeCard(card: ICard): void {
        this._store.dispatch(new RemoveCardPending(card));
    }

    public addCard(): void {
        this._modalService.open({
            component: CardModalComponent,
            resolver: this._componentFactoryResolver,
            injector: this._injector,
            context: { card: {}, mode: 'create' },
        });
    }

    public editCard(card: ICard): void {
        this._modalService.open({
            component: CardModalComponent,
            resolver: this._componentFactoryResolver,
            injector: this._injector,
            context: { card: { ...card }, mode: 'edit' },
        });
    }
}
