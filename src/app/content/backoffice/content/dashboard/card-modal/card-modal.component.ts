import { Component } from '@angular/core';
import { ICard } from '../store/reducers/dashboard.reducer';
import { ModalService } from '@modal/modal.service';
import { Store } from '@ngrx/store';
import { EntityState } from '@ngrx/entity';
import { ChangeCardPending, CreateCardPending } from '../store/actions/dashboard.action';

@Component({
    selector: 'app-card-modal',
    templateUrl: './card-modal.component.html',
    styleUrls: ['./card-modal.component.scss'],
})
export class CardModalComponent {
    public card!: ICard;
    public mode!: 'edit' | 'create';

    public constructor(private _modalService: ModalService, private _store: Store<EntityState<ICard>>) {}

    public save(): void {
        this.mode === 'edit'
            ? this._store.dispatch(new ChangeCardPending(this.card))
            : this._store.dispatch(new CreateCardPending(this.card));
        this._modalService.close();
    }

    public close(): void {
        this._modalService.close();
    }
}
