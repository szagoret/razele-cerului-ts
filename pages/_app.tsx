import * as React from 'react';
import Head from 'next/head';
import {AppProps} from 'next/app';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider, EmotionCache} from '@emotion/react';
import theme from '../src/styles/theme';
import createEmotionCache from '../src/styles/createEmotionCache';
import Script from "next/script";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

const MyApp = (props: MyAppProps) => {
    const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;
    return (
        <>
            <Script
                strategy='lazyOnload'
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script id='ga-analytics'>
                {
                    `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `
                }
            </Script>
            <CacheProvider value={emotionCache}>
                <Head>
                    <title key="title">Razele Cerului</title>
                    <meta name="viewport" content="initial-scale=1, width=device-width"/>
                </Head>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Component {...pageProps} />
                </ThemeProvider>
            </CacheProvider>
        </>
    );
};

export default MyApp;