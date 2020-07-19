import React from 'react';
// import EnvironmentService from 'src/utils/EnvironmentService';
import withAuth from 'src/hocs/withAuth';

const LoginPage = (props: any) => {
  React.useEffect(() => {
    console.log(props);
    debugger;
  }, [prop]);
  return (
    <>
      login page
    </>
  )
};

export default withAuth(LoginPage);
