import useStores from '@hooks/useStores';

const useCurrentUser = () => {
  const { currentUserStore } = useStores();

  return currentUserStore;
};

export default useCurrentUser;
