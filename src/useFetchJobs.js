import { useReducer, useEffect } from 'react';
import axios from 'axios';

const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error'
}

const BASE_URL = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json";

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
            return {...state, loading: false, jobs: action.payload.jobs };
        case ACTIONS.ERROR:
            return {...state, loading: false, error: action.payload.error, jobs: [] };
        default:
            return state;
    }
}

/**
 * Retrieves the jobs from the official GitHub Jobs API.
 * 
 * @param {*} params List of API parameters
 * @param {*} page Page that we currently are on
 */
export default function useFetchJobs(params, page) {
    const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true })

    useEffect(() => {
        // Use a cancel token in order to not send lots of requests when params change quickly
        const cancelToken = axios.CancelToken.source();

        dispatch({ type: ACTIONS.MAKE_REQUEST })
        axios.get(BASE_URL, {
            cancelToken: cancelToken.token,
            params: { markdown: true, page: page, ...params }
        }).then(res => {
            dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } })
        }).catch(err => {
            // Dont treat canceling Request as an error
            if (axios.isCancel(err)) return;
            dispatch({ type: ACTIONS.ERROR, payload: { error: err } })
        })

        return () => {
            cancelToken.cancel();
        }
    }, [params, page]);

    return state;
}