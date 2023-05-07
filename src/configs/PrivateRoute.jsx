import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { LoginContext } from '../contexts/LoginContextProvider';

export default function PrivateRoute({ children }) {
  let { user } = useContext(LoginContext);
  const isLoggedIn = user;
  return children.props.isClosed && isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}

PrivateRoute.defaultProps = {
  isClosed: false,
};

PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  isClosed: PropTypes.bool,
};
