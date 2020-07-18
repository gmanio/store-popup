import React from 'react';
import EnvironmentService from 'src/utils/EnvironmentService';
import withAuth from 'src/hocs/withAuth';

type Props = {
  kakaoApiKey?: string;
};
const Kakao = !EnvironmentService.isServerSide() && window.Kakao;

const LoginPage = (props: Props) => {
  const handleFailureLogin = () => {
    // TODO: Failed login process
  }
  const handleSuccessLogin = (res: any) => {
    Kakao.API.request({
      url: '/v2/user/me',
      success: (res) => {
        debugger;
      },
      fail: (res) => {
        debugger;
      }
    });
  };
  React.useEffect(() => {
    Kakao && Kakao.init(props.kakaoApiKey);
    Kakao && Kakao.Auth.login({
      success: handleSuccessLogin,
      fail: handleFailureLogin,
    });
  }, []);
  return (
    <>
      login page
    </>
  )
};

LoginPage.getInitialProps = () => {
  return {
    kakaoApiKey: process.env.KAKAO_KEY
  }
}

export default withAuth(LoginPage);
