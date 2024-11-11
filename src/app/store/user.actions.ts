
import { createAction, props } from '@ngrx/store';
import { UserModel } from '../core/models/user.model';

// Define action to load users
export const setUser = createAction('[User] Set User', props<{ user: UserModel }>());
export const resetUser = createAction('[User] Reset User');

