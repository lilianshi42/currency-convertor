const initState = {
  loading: false,
  rate: "",
};

const loadReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_RATE_STARTED":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_RATE_SUCCESS":
      return {
        ...state,
        loading: false,
        rate: action.payload,
      };
    case "FETCH_RATE_FAILED":
      return {
        loading: false,
        rate: "",
        error: action.payload,
      };
    default:
      return state;
  }
};

export default loadReducer;
