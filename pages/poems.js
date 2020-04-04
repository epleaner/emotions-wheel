import { useRouter } from "next/router";
import useSWR from "swr";

import fetcher from "Helpers/fetcher";

import Layout from "Components/shared/layout";

const Poems = props => {
  const { query } = useRouter();
  const { data, error } = useSWR(
    `/api/poems${query.author ? "?author=" + query.author : ""}`,
    fetcher
  );

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
