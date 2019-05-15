import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appNgTable]',
})
export class NgTableDirective {
    public constructor(private _container: ViewContainerRef, private _template: TemplateRef<any>) {}

    @Input()
    public set appNgTableOf(data: any) {
        this._container.clear();
        data.forEach((item: any, index: number) => {
            this._container.createEmbeddedView(this._template, {
                $implicit: item,
                headers: !index ? this._getHeaders() : null,
                index,
            });
        });
    }

    private _getHeaders(): string[] {
        return ['Status', 'Card Id', 'Card Title', 'Text', 'Author', 'Date'];
    }
}
