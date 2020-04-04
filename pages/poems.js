import fetch from "isomorphic-unfetch";

import Layout from "components/shared/layout";

const Poems = props => (
  <Layout>
    {props.poems.map(poem => (
      <p key={poem.title}>{poem.title}</p>
    ))}
  </Layout>
);

Poems.getInitialProps = async () => {
  const res = await fetch("http://poetrydb.org/author/Shakespeare");
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    poems: data
  };
};

export default Poems;
