import Head from "next/head";
import { AppProps } from "next/app";
import {Provider} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css'
import { wrapper } from "../store/store";

function MyApp({ Component, ...pageProps }: AppProps) {
   const {store, props} = wrapper.useWrappedStore(pageProps);
   return (
      <>
         <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
         </Head>
         <Provider store={store}>
            <Component {...props.pageProps} />
         </Provider>
      </>
   );
}
export default MyApp;