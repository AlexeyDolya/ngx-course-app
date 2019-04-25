import { Component, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
type Cb = (checked: boolean) => void;
@Component({
    selector: 'app-switcher',
    templateUrl: './switcher.component.html',
    styleUrls: ['./switcher.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: SwitcherComponent,
            multi: true,
        },
    ],
})
export class SwitcherComponent implements ControlValueAccessor {
    public checked!: boolean;
    private _onChangeCb!: Cb;

    @HostListener('click')
    public toggle(): void {
        this.checked = !this.checked;
        this._onChangeCb(this.checked);
    }

    public writeValue(checked: boolean): void {
        this.checked = checked;
    }

    public registerOnChange(fn: Cb): void {
        this._onChangeCb = fn;
    }

    public registerOnTouched(_fn: Cb): void {}
}
