import { AuthEffects } from './auth.effects';
import { NotifyEffect } from './notify.effects';
import { UserEffects } from './user.effects';
import { RouterEffects } from './router.effects';

// tslint:disable-next-line: typedef
export const effectsArr = [AuthEffects, NotifyEffect, UserEffects, RouterEffects];
