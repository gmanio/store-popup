import { NextComponentType, NextPageContext } from 'next';
import App from 'next/app';
import React from 'react';
import { NextRouter, Router } from 'next/router';
import { AppContextType } from 'next/dist/next-server/lib/utils';
import { UserContextProvider } from 'src/contexts/userContext';

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
    let pageProps = {};

    return {
      pageProps,
      userAgent: initialProps.ctx.req ? initialProps.ctx.req.headers['user-agent']! : navigator.userAgent
    };
  }

  render () {
    const { Component, pageProps, userAgent } = this.props;
    console.log(userAgent);
    return (
      <>
        <div style={{ paddingTop: 60, display: 'flex', width: '100%', background: '#f2f5f7', boxSizing: 'border-box' }}>
          <UserContextProvider>
            <Component {...pageProps}/>
          </UserContextProvider>
        </div>
      </>
    );
  }
}

export default MyApp;
