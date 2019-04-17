import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICard } from '../store/reducers/dashboard.reducer';

@Component({
    selector: '[app-card]',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent {
    @Input()
    public card!: ICard;

    @Output()
    public remove: EventEmitter<ICard> = new EventEmitter();

    @Output()
    public edit: EventEmitter<ICard> = new EventEmitter();

    public removeCard(card: ICard): void {
        this.remove.emit(card);
    }

    public editCard(card: ICard): void {
        this.edit.emit(card);
    }
}
