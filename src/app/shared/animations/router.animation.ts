import { animate, AnimationTriggerMetadata, group, query, style, transition, trigger } from '@angular/animations';
import { RouterOutlet } from '@angular/router';

export const routerTransition: AnimationTriggerMetadata = trigger('routerTransition', [
    transition('* <=> *', [
        /* order */
        /* 1 */ query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
        /* 2 */ query('.block', style({ opacity: 0 }), { optional: true }),
        /* 3 */ group([
            // block executes in parallel
            query(
                ':enter',
                [
                    style({ transform: 'translateX(100%)' }),
                    animate('0.6s ease-in-out', style({ transform: 'translateX(0%)' })),
                ],
                { optional: true }
            ),
            query(
                ':leave',
                [
                    style({ transform: 'translateY(0%)' }),
                    animate('0.2s ease-in-out', style({ transform: 'translateY(-200%)' })),
                ],
                { optional: true }
            ),
        ]),
        //   /* 4 */ query(':enter .block', stagger(400, [
        //   style({ transform: 'translateY(100px)' , 'z-index': 0}),
        //   animate('1s ease-in-out',
        //     style({ transform: 'translateY(0px)', opacity: 1 })),
        // ]), { optional: true }),
    ]),
]);

export class RouterAnimation {
    public getState(outlet: RouterOutlet): any {
        return outlet.activatedRouteData.state;
    }
}
