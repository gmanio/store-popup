// https://developers.kakao.com/sdk/js/kakao.min.js
import React from 'react';
import { Router, withRouter } from 'next/router'
import AuthService from 'src/utils/AuthService';
import { NextComponentType } from 'next';
import Head from 'next/head';

export default (WrappedComponent: NextComponentType) => {
  return withRouter(class Authenticated extends React.Component<{ router: Router }> {
    state: {
      isLoading: boolean;
    }

    constructor (props: any) {
      super(props);
      this.state = {
        isLoading: true
      };
    }

    async componentDidMount () {
      if (!AuthService.isLogin()) {
        await this.props.router.replace(`/login?returnUrl=${this.props.router.pathname}`);
      }
      this.setState({ isLoading: false })
    }

    render () {
      return (
        <div>
          <Head>
            <script type='text/javascript' src='https://developers.kakao.com/sdk/js/kakao.min.js'/>
          </Head>
          {this.state.isLoading ? (
            <div>LOADING....</div>
          ) : (
            <WrappedComponent {...this.props}/>
          )}
        </div>
      )
    }
  })
}
