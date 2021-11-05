const initialState = '';

const searchTermReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'searchTerm/setSearchTerm':
        return action.payload;
      default:
        return state;
    }
  }

export function setSearchTerm(term) {
  return {
    type: 'searchTerm/setSearchTerm',
    payload: term
  }
}

export const selectSearchTerm = (state) => state.searchTerm;

export default searchTermReducer;