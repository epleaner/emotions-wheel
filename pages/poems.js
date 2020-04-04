import { useRouter } from "next/router";
import useSWR from "swr";

import fetcher from "helpers/fetcher";

import Layout from "components/shared/layout";

const Poems = props => {
  const { query } = useRouter();
  const { data, error } = useSWR(
    `/api/poems${query.author ? "?author=" + query.author : ""}`,
    fetcher
  );
  console.log(data, error);
  return (
    <Layout>
      {!data
        ? "Loading"
        : error || data.status >= 400
        ? error || data.reason
        : data.map(poem => <p key={poem.title}>{poem.title}</p>)}
    </Layout>
  );
};

export default Poems;
