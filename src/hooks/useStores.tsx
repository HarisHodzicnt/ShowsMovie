import { useContext } from 'react';
import { rootStoreContext } from '../contexts';

export const useStores = () => useContext(rootStoreContext);
