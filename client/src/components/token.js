import React from 'react';
import { Navigate } from 'react-router-dom';
import { logOutUser } from '../redux/user/user.slice';
import { useDispatch,useSelector } from 'react-redux';

const Token = ({ element, allowedRoles }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  if (user === '') {
    dispatch(logOutUser());
    return <Navigate to="/login" replace />;
  }
  // console.log(allowedRoles);
  // console.log(user);
  if(user.currentUser !== '' && user.currentUser !== null){
    // console.log(user.currentUser.role);

    if (allowedRoles && !allowedRoles.includes(user.currentUser?.role)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }
  

  return element;
};

export default Token;
