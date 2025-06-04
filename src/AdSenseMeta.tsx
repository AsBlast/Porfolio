import { Helmet } from 'react-helmet';

const AdSenseMeta = () => (
  <Helmet>
    <script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2734152198256091"
      crossOrigin="anonymous"
    ></script>
  </Helmet>
);

export default AdSenseMeta;
