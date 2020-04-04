import { NextPage } from "next";
import Layout from "Components/shared/layout";

const About: NextPage<{ userAgent: string }> = ({ userAgent }) => (
  <Layout>
    <h1>Hello world! - user agent: {userAgent}</h1>
  </Layout>
);

About.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers["user-agent"] || "" : navigator.userAgent;
  return { userAgent };
};

export default About;
