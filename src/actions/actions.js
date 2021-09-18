import axios from "axios";

// ACTION for loadReducer
export const getExchangeRate = (date, currency) => {
    return (dispatch) => {
        dispatch(fetchStarted());
        axios
            .get(`https://www.bankofcanada.ca/valet/observations/FXCAD${currency}?start_date=${date}&end_date=${date}`)
            .then((res) => {
                console.log(res);
                dispatch(fetchSuccess(res.data.observations[0][`FXCAD${currency}`].v));
            })
            .catch((err) => {
                dispatch(fetchFailed(err));
            });
    };
};

const fetchStarted = () => {
    return {
        type: "FETCH_RATE_STARTED",
    };
};

const fetchSuccess = (rate) => {
    return {
        type: "FETCH_RATE_SUCCESS",
        payload: rate,
    };
};

const fetchFailed = (err) => {
    return {
        type: "FETCH_RATE_FAILED",
        payload: err,
    };
};
