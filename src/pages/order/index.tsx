import * as React from 'react';
import withAuth from 'src/hocs/withAuth';
import { useAuth } from 'src/contexts/userContext';

const OrderPage = () => {
  const [user] = useAuth();

  return (
    <>
      orderPage
      {JSON.stringify(user)}
      {user && (
        <img src={`${user.profile}`} alt='' />
      )}
    </>
  )
};

export default withAuth(OrderPage);
