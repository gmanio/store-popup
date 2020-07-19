// https://developers.kakao.com/sdk/js/kakao.min.js
import React from 'react';
import { withRouter, useRouter } from 'next/router'
import { NextComponentType, NextPageContext } from 'next';
import EnvironmentService from 'src/utils/EnvironmentService';
import UserModel from 'src/models/UserModel';
import Head from 'next/head';
import { UserContext } from 'src/contexts/userContext';
import * as process from 'process';

const Kakao = !EnvironmentService.isServerSide() && window.Kakao;

const withAuth = (WrappedComponent: NextComponentType | any) => {

  const AuthenticatedComponent = (authenticatedComponentProps: any) => {
    const { user, storeUser } = React.useContext(UserContext);
    const [isLoading, setIsLoading] = React.useState(true);
    const router = useRouter();

    console.log(router);

    const handleFailureLogin = () => {
      setIsLoading(false);
    };

    React.useEffect(() => {
      if (authenticatedComponentProps.kakaoApiKey) {
        Kakao.init(authenticatedComponentProps.kakaoApiKey);
      }

      !user && Kakao.Auth.login({ success: handleSuccessLogin, fail: handleFailureLogin });
    }, [authenticatedComponentProps]);

    const handleSuccessLogin = (_res: any) => {
      window.Kakao.API.request({
        url: '/v2/user/me',
        success: (res: any) => {
          const logginedUser = new UserModel({
            kakaoId: res.id,
            email: res.kakao_account.email,
            name: res.kakao_account.profile.nickname,
            profile: res.kakao_account.profile.profile_image_url
          });
          storeUser(logginedUser);
          setIsLoading(false);
        },
        fail: handleFailureLogin
      });
    };

    return (
      <>
        <Head>
          <script type='text/javascript' src='https://developers.kakao.com/sdk/js/kakao.min.js'/>
        </Head>
        <>
          {isLoading ? <div>loading login process..</div> : (
            <WrappedComponent {...authenticatedComponentProps}/>
          )}
        </>
      </>
    )
  };

  AuthenticatedComponent.getInitialProps = (_context: NextPageContext) => {
    return {
      kakaoApiKey: process.env.KAKAO_KEY || ''
    }
  };

  return withRouter(AuthenticatedComponent);
};

export default withAuth;
