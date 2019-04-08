const initialStateUser = {
    language: "PL"
  };
  
  const lang = (state = initialStateUser, action) => {
    switch (action.type) {
      case "CHANGE_LANG":
        return { language: action.data };
      default:
        return state;
    }
  };
  
  export default lang;