import * as React from 'react';
import UserModel from 'src/models/UserModel';

export type UserReducerActionType = {
  type: string;
  payload: UserModel;
}

const UserContext = React.createContext({});

const initialState = new UserModel();

const reducer = (state: UserModel, action: UserReducerActionType) => {
  switch (action.type) {
    case 'set':
      return Object.assign(state, action.payload);
    case 'get':
      return state;
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const UserContextProvider: React.FC = ({ children }) => {
  const [user, dispatchSetUser] = React.useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[user, dispatchSetUser]}>
      {children}
    </UserContext.Provider>
  );
};

const useAuth = () => React.useContext(UserContext);

export {
  UserContextProvider,
  UserContext,
  useAuth
};
