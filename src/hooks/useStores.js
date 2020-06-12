import { useContext } from 'react';
import storesContext from '@contexts/storesContext';

const useStores = () => useContext(storesContext);

export default useStores;
