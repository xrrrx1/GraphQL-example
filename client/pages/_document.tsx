import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
// Import styled components ServerStyleSheet
import { ServerStyleSheet } from "styled-components";

interface Props {
  styleTags: object;
}

export default class MyDocument extends Document<Props> {
  static getInitialProps({ renderPage }) {
    // Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();

    // Retrieve styles from components in the page
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));

    // Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement();

    // Pass styleTags as a prop
    return { ...page, styleTags };
  }

  render() {
    return (
      <html lang="eu">
        <Head>
          {/* Output the styles in the head  */}
          {this.props.styleTags}
        </Head>
        <body>
          <React.Fragment>
            <Main />
            <NextScript />
          </React.Fragment>
        </body>
      </html>
    );
  }
}
