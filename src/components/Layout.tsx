import Head from 'next/head'
import SongAppBar from "./SongAppBar";
import * as React from "react";

const Layout = ({
                    children,
                    title = 'Razele Cerului',
                    songs = []
                }: { children: any, title: string, songs: Array<{ index: number, title: string }> }) => (
    <div>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        </Head>
        <header>
            <SongAppBar songs={songs}/>
        </header>

        {children}
    </div>
);

export default Layout