import useSWR from "swr";
import fetcher from "@helpers/fetcher";

export default () => {
  const { data, mutate } = useSWR("/api/user", fetcher);
  const isFetching = typeof data === "undefined";

  const user = data && data.user;
  return [user, { mutate }, isFetching];
};
