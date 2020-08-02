// https://developers.kakao.com/sdk/js/kakao.min.js
import React from 'react';
import { NextComponentType } from 'next';
import EnvironmentService from 'src/utils/EnvironmentService';
import UserModel from 'src/models/UserModel';
import { useAuth } from 'src/contexts/userContext';

const Kakao = !EnvironmentService.isServerSide() && window.Kakao;

const withAuth = (WrappedComponent: NextComponentType | any) => {

  const AuthenticatedComponent = (authenticatedComponentProps: any) => {
    const [user, dispatchSetUser] = useAuth();
    const [isLoading, setIsLoading] = React.useState(true);
    const handleFailureLogin = () => {
      debugger;
      setIsLoading(false);
    };
    const handleSuccessLogin = (_res: any) => {
      window.Kakao.API.request({
        url: '/v2/user/me',
        success: (res: any) => {
          const loggedInUser = new UserModel({
            kakaoId: res.id,
            email: res.kakao_account.email,
            name: res.kakao_account.profile.nickname,
            profile: res.kakao_account.profile.profile_image_url
          });
          dispatchSetUser({ type: 'set', payload: loggedInUser });
          setIsLoading(false);
        },
        fail: handleFailureLogin
      });
    };

    React.useEffect(() => {
      if (authenticatedComponentProps.kakaoApiKey) {
        Kakao.init(authenticatedComponentProps.kakaoApiKey);
      }

      Kakao.Auth.login({ success: handleSuccessLogin, fail: handleFailureLogin });
    }, [authenticatedComponentProps]);

    return (
      <>
        {isLoading && user ? <div>loading login process..</div> : (
          <WrappedComponent {...authenticatedComponentProps} />
        )}
      </>
    )
  };

  return AuthenticatedComponent;
};

export default withAuth;
