const initialState = {
    token: null,
    user: null,
    isAuthenticated: false,
  };
  
  // Action Types
  const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
  const LOGOUT = 'LOGOUT';
  
  // Action Creators
  export const loginSuccess = (token, user) => ({
    type: LOGIN_SUCCESS,
    payload: { token, user },
  });
  
  export const logout = () => ({
    type: LOGOUT,
  });
  
  // Auth Reducer
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          token: action.payload.token,
          user: action.payload.user,
          isAuthenticated: true,
        };
      case LOGOUT:
        return initialState; // Reset to initial state
      default:
        return state;
    }
  };
  
  export default authReducer;
  