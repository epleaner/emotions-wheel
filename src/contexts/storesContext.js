import { createContext } from 'react';
import { createCurrentUserStore } from '@stores/currentUserStore';

const storesContext = createContext({
  currentUserStore: createCurrentUserStore(),
});

export default storesContext;
