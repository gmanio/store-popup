import React from 'react';
import Document, { DocumentContext, DocumentInitialProps, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class CustomizedDocument extends Document {
  static async getInitialProps(context: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = context.renderPage;

    try {
      context.renderPage = () => originalRenderPage({
        enhanceApp: MyApp => props => sheet.collectStyles(<MyApp {...props} />)
      });

      const initialProps: DocumentInitialProps = await Document.getInitialProps(context);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <head>
          <script type='text/javascript' src='https://developers.kakao.com/sdk/js/kakao.min.js' />
          <style />
        </head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
