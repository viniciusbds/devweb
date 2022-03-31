import React from 'react';
import { useLocalObservable } from 'mobx-react';
import PropTypes from 'prop-types';

import AuthStore from '../stores/AuthStore';

const UserContext = React.createContext(null);

export function UserProvider({ children }) {
  const userStore = useLocalObservable(() => AuthStore);

  return <UserContext.Provider value={userStore}>{children}</UserContext.Provider>;
}

UserProvider.propTypes = {
  children: PropTypes.isRequired,

};

export const useUserStore = () => React.useContext(UserContext);
