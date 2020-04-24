import App from 'next/app';
import Head from 'next/head';
import "../public/css/style.scss";

class ExtApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        return (
            <React.Fragment>
                <Head>
                    <title>EKO Game</title>
                    <meta charSet="utf-8" />
                </Head>
                <Component {...pageProps} />
            </React.Fragment>
        );
    }
}

export default ExtApp;
