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
                headers: !index ? this._getHeaders(Object.keys(data[0])) : null,
                index,
            });
        });
    }

    private _getHeaders(headers: string[]): string[] {
        const res: string[] = headers.filter((i: string) => i !== 'title' && i !== '__v');
        const status: string | undefined = res.pop();
        if (status) {
            res.unshift(status);
        }
        return res;
    }
}
