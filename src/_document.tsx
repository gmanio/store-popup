import React from 'react';
import Document, { DocumentContext, DocumentInitialProps, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class CustomizedDocument extends Document {
  static async getInitialProps (context: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = context.renderPage;
    // const userAgent: string = context.req ? context.req.headers['user-agent']! : navigator.userAgent;

    try {
      context.renderPage = () =>
        originalRenderPage({
          enhanceApp: MyApp => props => sheet.collectStyles(
            <>
              <MyApp {...props}/>
            </>
          )
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

  render () {
    return (
      <Html>
        <head>
          <style/>
        </head>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    );
  }
}
