import * as actionTypes from '../actions/actionTypes'; 

const today = new Date(); 
const initialState = {
    transactions: [], 
    categories: [],
    filters: {
        dates: [], 
        categories: [], 
        activeFilters: {
            primaryFilter: 'none', 
            secondaryFilter: 'none'
        }
    }, 
    trackedDates: {
        month: today.getMonth() + 1, 
        year: today.getFullYear()
    }, 
    loading: true
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_TRANSACTIONS: 
            return {
                ...state, 
                transactions: action.transactions, 
                loading: false
            }; 
        case actionTypes.SET_TRACKED_DATES: 
            return {
                ...state, 
                trackedDates: action.trackedDates
            }; 
        case actionTypes.SET_DATE_FILTERS: 
            return {
                ...state, 
                filters: {
                    ...state.filters, 
                    dates: action.dates
                }
            }; 
        case actionTypes.SET_CATEGORY_FILTERS: 
            return {
                ...state, 
                filters: {
                    ...state.filters, 
                    categories: action.categories
                }
            }; 
        case actionTypes.SET_ACTIVE_FILTERS: 
            return {
                ...state, 
                filters: {
                    ...state.filters, 
                    activeFilters: action.activeFilters
                }
            }; 
        case actionTypes.SET_USER_CATEGORIES: 
            return {
                ...state, 
                categories: action.categories
            }; 
        case actionTypes.SET_TRANSACTIONS_LOADING: 
            return {
                ...state, 
                loading: action.loading
            }; 
        default: 
            return state; 
    }
}

export default reducer; 