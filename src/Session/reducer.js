const initialStateUser = {
    user: {
      isLogged: false,
      isVerified: false,
      role: ""
    }
  };
  
  const user = (state = initialStateUser, action) => {
    switch (action.type) {
      case "LOGIN":
        return { user: action.data };
      case "LOGOUT":
        return { user: action.data };
      case "VERIFICATION":
        return { user: action.data };
      default:
        return state;
    }
  };
  
  export default user;