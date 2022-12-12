import * as React from 'react';
import {AppProps} from 'next/app';
import {CacheProvider, EmotionCache} from '@emotion/react';
import createEmotionCache from '../src/styles/createEmotionCache';
import Script from "next/script";
import {SettingsProvider, ThemeSettings} from "src/components/settings";
import MotionLazyContainer from "src/components/animate/MotionLazyContainer";
import ProgressBar from "src/components/progress-bar";
import ThemeProvider from "src/theme";

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
                <SettingsProvider>
                    <MotionLazyContainer>
                        <ThemeProvider>
                            <ThemeSettings>
                                <ProgressBar/>
                                <Component {...pageProps} />
                            </ThemeSettings>
                        </ThemeProvider>
                    </MotionLazyContainer>
                </SettingsProvider>
            </CacheProvider>
        </>
    );
};

export default MyApp;