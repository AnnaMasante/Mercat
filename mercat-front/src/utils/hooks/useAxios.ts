import { useContext } from 'react';
import { UserContext } from '../../contexts/user/types';

export function useAxios() {
  return useContext(UserContext).axios;
}
