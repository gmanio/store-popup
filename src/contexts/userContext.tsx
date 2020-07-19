import * as React from 'react';
import UserModel from 'src/models/UserModel';
import { Dispatch, SetStateAction } from 'react';

export type UserContextProps = {
  user: UserModel | null;
  storeUser: Dispatch<SetStateAction<any>>;
};

const UserContext = React.createContext<UserContextProps>({
  user: null,
  storeUser: () => ({})
});

const UserContextProvider = (props: { children?: any }) => {
  const [user, setUser] = React.useState<any>(null);
  const storeUser = (user: UserModel) => {
    setUser({
      userName: user.name,
    })
  };

  return (
    <UserContext.Provider value={{ user, storeUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export {
  UserContextProvider,
  UserContext
};
