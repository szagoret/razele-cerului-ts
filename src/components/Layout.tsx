import Head from 'next/head'
import SongAppBar from "./SongAppBar";
import * as React from "react";

const Layout = ({
                    children,
                    title = 'Razele Cerului',
                    thumbPath = 'razelecerului.jpg',
                    songs = []
                }: { children: any, title: string, thumbPath: string, songs: Array<{ index: number, title: string, }> }) => (
    <div>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8"/>
            <meta property="og:image" content={`/thumb/${thumbPath}`}/>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        </Head>
        <SongAppBar songs={songs}/>
        {children}
    </div>
);

export default Layout