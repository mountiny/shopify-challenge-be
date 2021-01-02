import "../css/index.css";
import Head from "next/head";
import Layout from "@components/layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Shopify Internship Code Challenge</title>
        <meta
          name="Description"
          content="Shopify Backend Developer Internship Code Challenge"
        />
      </Head>

      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
