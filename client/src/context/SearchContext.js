import { createContext, useReducer } from "react";

const INITIAL_STATE = {
	destination: undefined,
	dates: [],
	options: {
		children: undefined,
		adult: undefined,
		room: undefined,
	},
};

export const SearchContext = createContext(INITIAL_STATE);

const searchReducer = (state, { type, payload }) => {
	console.log(state);

	switch (type) {
		case "NEW_SEARCH":
			return payload;

		case "REET_SEARCH":
			return INITIAL_STATE;

		default:
			return state;
	}
};

export const SearchContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(searchReducer, INITIAL_STATE);

	return (
		<SearchContext.Provider
			value={{
				dates: state.dates,
				city: state.city,
				options: state.options,
				dispatch,
			}}>
			{children}
		</SearchContext.Provider>
	);
};

// const INITIAL_STATE = {
// 	city: undefined,
// 	dates: [],
// 	options: {
// 		adult: undefined,
// 		children: undefined,
// 		room: undefined,
// 	},
// };

// export const SearchContext = createContext(INITIAL_STATE);

// const SearchReducer = (state, action) => {
// 	switch (action.type) {
// 		case "NEW_SEARCH":
// 			return action.payload;
// 		case "RESET_SEARCH":
// 			return INITIAL_STATE;
// 		default:
// 			return state;
// 	}
// };

// export const SearchContextProvider = ({ children }) => {
// 	const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

// 	return (
// 		<SearchContext.Provider
// 			value={{
// 				city: state.city,
// 				dates: state.dates,
// 				options: state.options,
// 				dispatch,
// 			}}>
// 			{children}
// 		</SearchContext.Provider>
// 	);
// };
