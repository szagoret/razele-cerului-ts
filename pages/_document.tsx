import * as React from 'react';
import Document, {Head, Html, Main, NextScript} from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from "../src/styles/createEmotionCache";
import palette from "src/theme/palette";

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* PWA primary color */}
                    {/*<meta name="theme-color" content="#2a9d8f" />*/}
                    <meta name="theme-color" content={palette('light').primary.main}/>
                    <meta property="og:title" content="Razele Cerului"/>
                    <meta name="emotion-insertion-point" content=""/>
                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <meta property="og:description" content="O carte de cântări duhovnicesti"/>
                    <meta name="google-site-verification" content="sVjeWi_5fRlTI5G1punzs8BcjOc__cTioK9fSq-0JuQ"/>
                    <link rel="preconnect" href="https://6FZ2U75TWW-dsn.algolia.net" crossOrigin={""}/>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                    <title>Razele Cerului</title>
                    {(this.props as any).emotionStyleTags}
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}


MyDocument.getInitialProps = async (ctx) => {
    const originalRenderPage = ctx.renderPage;

    const cache = createEmotionCache();
    const {extractCriticalToChunks} = createEmotionServer(cache);

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App: any) =>
                function EnhanceApp(props) {
                    return <App emotionCache={cache} {...props} />;
                },
        });

    const initialProps = await Document.getInitialProps(ctx);
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            key={style.key}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{__html: style.css}}
        />
    ));

    return {
        ...initialProps,
        emotionStyleTags,
    };
};