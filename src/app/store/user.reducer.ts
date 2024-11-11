// src/app/store/user.reducer.ts

import { createReducer, on } from '@ngrx/store';
import { setUser, resetUser} from './user.actions';
import { UserState } from './user.state';

const initialState: UserState = {
  account: {
    email: '',
    firstname: '',
    lastname: ''
  },
};

export const userReducer = createReducer(
  initialState,
  on(setUser, updateUser),
  on(resetUser, _ => ({ ...initialState })),
);


function updateUser(state: UserState, action: any):  UserState {

  return {
    ...state,
    account: action.user
  }

}