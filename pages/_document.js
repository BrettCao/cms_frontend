/**
 * Created by Smile on 2018/5/25.
 */
import {auth} from '../components/Auth';
import {aRequest} from "../components/request";
import Document, {Head, Main, NextScript} from 'next/document';


export default class MyDocument extends Document {
    static async getInitialProps ({ renderPage }) {
        const transform = (App) => {
            // Next.js gives us a `transformPage` function
            // to be able to hook into the rendering of a page
            // Step 1: Here we will generate the styles
            return App;
        };

        const page = renderPage(transform);
        return { ...page };
    }
    render() {
        const { buildManifest } = this.props;
        const { css } = buildManifest;
        return (
            <html>
                <Head>
                    <link href="../static/css/global.css" rel="stylesheet" type='text/css'/>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.4.4/antd.css" type='text/css'/>
                    {css.map(file => {
                        return (
                            <link
                                rel="stylesheet"
                                href={`/_next/${file}`}
                                key={file}
                            />
                        );
                    })}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    }
}