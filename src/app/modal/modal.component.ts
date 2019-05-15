import {
    Component,
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    HostListener,
    Injector,
    OnInit,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { ModalService } from './modal.service';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
    @ViewChild('modalContent', { read: ViewContainerRef })
    public modal!: ViewContainerRef;

    public childComponent!: ComponentFactory<any>;
    public isOpen: boolean = false;
    public modalContext!: ComponentRef<any>;
    public refInjector!: Injector;

    public constructor(private _modalService: ModalService) {}

    public ngOnInit(): void {
        this._modalService.modalSequence$.subscribe(
            (componentObj: { component: any; resolver: ComponentFactoryResolver; injector: any; context: any }) => {
                if (!componentObj) {
                    this.close();
                    return;
                }
                this.isOpen = true;
                this.childComponent = componentObj.resolver.resolveComponentFactory(componentObj.component);

                this.refInjector = Injector.create({
                    providers: [{ provide: componentObj.component, useValue: componentObj.component }],
                    parent: componentObj.injector,
                });
                this.modalContext = this.modal.createComponent(this.childComponent, 0, this.refInjector);
                Object.keys(componentObj.context).forEach(
                    (key: string) => (this.modalContext.instance[key] = componentObj.context[key])
                );
            }
        );
    }

    @HostListener('window:keyup', ['$event.keyCode'])
    public close(code: number = 27): void {
        if (code !== 27) {
            return;
        }
        this.modalContext && this.modalContext.destroy();
        this.isOpen = false;
    }
}
