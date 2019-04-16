import { Directive, TemplateRef, ViewContainerRef, Input, OnInit, ViewRef } from '@angular/core';

@Directive({
  selector: '[appNgForGrid]'
})
export class NgForGridDirective implements OnInit {

  @Input()
  set appNgForGrid(condition: any) {
    console.log(condition);
    this._viewContainer.createEmbeddedView(this._templateRef);
  }

  @Input()
  set appNgForGridOf(images: any) {
    console.log(images);
    this.images = images;

    this.images.forEach((element, i: number) => {
      console.log(element.images.standard_resolution)
      this.context = {
        $implicit: element.images.low_resolution.url,
        likes: element.likes.count,
        tags: element.tags.reduce((tagsStr, tag) => {
          return `${tagsStr}, #${tag}`;
        }, '')
      };
      console.log(this._viewContainer.element.nativeElement);
      this._viewContainer.createEmbeddedView(this._templateRef, this.context, i);
    });
  }

  context: any = null;
  images: any = [];

  public constructor(
    private _templateRef: TemplateRef<any>,
    private _viewContainer: ViewContainerRef,
  ) {

  }

  public ngOnInit(): void {


  }


}
