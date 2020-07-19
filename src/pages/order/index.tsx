import withAuth from 'src/hocs/withAuth';
import React from 'react';
import { UserContext } from 'src/contexts/userContext';

const OrderPage = (props: any) => {
  const { user } = React.useContext(UserContext);
  React.useEffect(() => {
    console.log(user);
    console.log(props.user);
    debugger;
  }, []);

  React.useEffect(() => {
    console.log(user);
    console.log(props.user);
    debugger;
  }, [props]);
  return (
    <>
      orderPage
      {user && (
        <img src={`${user.profile}`} alt=''/>
      )}
    </>
  )
};

export default withAuth(OrderPage);
