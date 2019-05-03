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
                headers: !index ? Object.keys(data[0]).filter((i: string) => i !== '_id' && i !== '__v') : null,
                index,
            });
        });
    }
}
