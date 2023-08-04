import { ChangeDetectorRef, InjectionToken, Provider } from '@angular/core';
import { TuiDestroyService } from './destroy.service';
import { watchedControllerFactory } from './watched-controller-provider-factory'
import { TUI_HINT_CONTROLLER } from './hint-controller.token';

export const TUI_HINT_WATCHED_CONTROLLER = new InjectionToken('watched hint controller');
// TODO: remove in ivy compilation
export const HINT_CONTROLLER_FACTORY = watchedControllerFactory;
export const HINT_CONTROLLER_PROVIDER: Provider = [
    TuiDestroyService,
    {
        provide: TUI_HINT_WATCHED_CONTROLLER,
        deps: [TUI_HINT_CONTROLLER, ChangeDetectorRef, TuiDestroyService],
        useFactory: HINT_CONTROLLER_FACTORY,
    },
];