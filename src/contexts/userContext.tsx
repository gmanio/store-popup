import * as React from 'react';
import UserModel from 'src/models/UserModel';
import { Dispatch, SetStateAction } from 'react';

export type UserContextProps = {
  user: UserModel | null;
  setUser: Dispatch<SetStateAction<any>>;
};

export type UserReducerActionType = {
  type: string;
  payload: UserModel;
}

const UserContext = React.createContext({});

// const initialState = null;
//
// // set up the reducer - same as Redux, allows us to process more complex changes
// // to the state within the context API
// const reducer = (state: (UserModel | null), action: UserReducerActionType) => {
//   debugger;
//   switch (action.type) {
//     case 'set':
//       return Object.assign(state, action.payload);
//     case 'get':
//       return state;
//     default:
//       throw new Error(`Unhandled action type: ${action.type}`)
//   }
// }

const UserContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState(new UserModel());

  React.useEffect(() => {
    console.log(user);
    debugger;
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useAuth: any = () => React.useContext(UserContext);

export {
  UserContextProvider,
  UserContext,
  useAuth
};
