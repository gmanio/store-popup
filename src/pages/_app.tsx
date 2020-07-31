import { NextComponentType, NextPageContext } from 'next';
import App from 'next/app';
import React from 'react';
import { NextRouter, Router } from 'next/router';
import { UserContextProvider } from 'src/contexts/userContext';
import { AppContextType } from 'next/dist/next-server/lib/utils';
import * as process from 'process';

export type AppProps = {
  Component: NextComponentType<NextPageContext>;
  router: Router;
  userAgent: string;
};

export type AppInitialProps = AppContextType<NextRouter>;

export class MyApp extends App<AppProps> {
  componentDidMount = () => {
    Router.events.on('routeChangeComplete', () => window.scrollTo(0, 0));
  }

  static getInitialProps = async (initialProps: AppInitialProps) => {
    let pageProps = { kakaoApiKey: process.env.KAKAO_KEY };

    return {
      pageProps,
      userAgent: initialProps.ctx.req ? initialProps.ctx.req.headers['user-agent']! : navigator.userAgent
    };
  }

  render() {
    const { Component, pageProps, userAgent } = this.props;

    return (
      <UserContextProvider>
        <Component {...pageProps} userAgent={userAgent} />
      </UserContextProvider>
    );
  }
}

export default MyApp;
