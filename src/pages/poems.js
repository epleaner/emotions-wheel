import fetcher from "Helpers/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";

const Poems = (props) => {
  const { query } = useRouter();
  const { data, error } = useSWR(
    `/api/poems${query.author ? "?author=" + query.author : ""}`,
    fetcher
  );

  return (
    <>
      {!data
        ? "Loading"
        : error || data.status >= 400
        ? error || data.reason
        : data.map((poem) => <p key={poem.title}>{poem.title}</p>)}
    </>
  );
};

export default Poems;
