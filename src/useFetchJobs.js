import { useReducer, useEffect } from 'react';
import axios from 'axios';

const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error',
    UPDATE_HAS_NEXT_PAGE: 'update-has-next-page'
}

// Proxy for https://jobs.github.com/positions.json to dodge CORS error
const BASE_URL = "http://localhost:8010/proxy"

/**
 * Dispatches the different actions that the app needs to handle.
 * 
 * @param {*} state The current state of the application
 * @param {*} action The action that is about to happen
 */
function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return { loading: true, jobs: [] };
        case ACTIONS.GET_DATA:
            return { ...state, loading: false, jobs: action.payload.jobs };
        case ACTIONS.ERROR:
            return { ...state, loading: false, error: action.payload.error, jobs: [] };
        case ACTIONS.UPDATE_HAS_NEXT_PAGE:
            return { ...state, hasNextPage: action.payload.hasNextPage }
        default:
            return state;
    }
}

/**
 * Retrieves the jobs from the official GitHub Jobs API.
 * Makes use of the dispatcher to take the right actions after querying the API.
 * 
 * @param {*} params List of API parameters
 * @param {*} page Page that we currently are on
 */
export default function useFetchJobs(params, page) {
    const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true })

    useEffect(() => {
        // Use a cancel token in order to not send lots of requests when params change quickly
        const cancelToken1 = axios.CancelToken.source();

        dispatch({ type: ACTIONS.MAKE_REQUEST })
        axios.get(BASE_URL, {
            cancelToken: cancelToken1.token,
            params: { markdown: true, page: page, ...params }
        }).then(res => {
            dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } })
        }).catch(err => {
            // Dont treat canceling Request as an error
            if (axios.isCancel(err)) return;
            dispatch({ type: ACTIONS.ERROR, payload: { error: err } })
        })

        const cancelToken2 = axios.CancelToken.source();

        // Take a look if is one more page with results so pagination works without errors
        axios.get(BASE_URL, {
            cancelToken: cancelToken2.token,
            params: { markdown: true, page: page + 1, ...params }
        }).then(res => {
            dispatch({ type: ACTIONS.UPDATE_HAS_NEXT_PAGE, payload: { hasNextPage: res.data.length !== 0 } })
        }).catch(err => {
            // Dont treat canceling Request as an error
            if (axios.isCancel(err)) return;
            dispatch({ type: ACTIONS.ERROR, payload: { error: err } })
        })

        return () => {
            cancelToken1.cancel();
            cancelToken2.cancel();
        }
    }, [params, page]);

    return state;
}