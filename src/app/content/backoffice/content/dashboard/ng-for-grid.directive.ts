import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appNgForGrid]',
})
export class NgForGridDirective {
    @Input()
    public set appNgForGrid(_condition: any) {
        this._viewContainer.createEmbeddedView(this._templateRef);
    }

    @Input()
    public set appNgForGridOf(images: any) {
        this.images = images;

        this.images.forEach((element: any, i: number) => {
            this.context = {
                $implicit: element.images.low_resolution.url,
                likes: element.likes.count,
                tags: element.tags.reduce((tagsStr: string, tag: string) => {
                    return `${tagsStr}, #${tag}`;
                }, ''),
            };
            this._viewContainer.createEmbeddedView(this._templateRef, this.context, i);
        });
    }

    public context: any = null;
    public images: any = [];

    public constructor(private _templateRef: TemplateRef<any>, private _viewContainer: ViewContainerRef) {}
}
