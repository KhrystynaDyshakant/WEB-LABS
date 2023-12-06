const searchFlowersId = (flowers, expectingId) => {
    return flowers.findIndex((stateFlowers) => stateFlowers.flowers.id === expectingId);
};

const initialState = {
    flowers: [],
};

const flowersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_FLOWERS':
            const existingIdAdd = searchFlowersId(state.flowers, action.data.flowers.id);
            if (existingIdAdd !== -1) {
                const updatedState = [...state.flowers];
                updatedState[existingIdAdd].quantity += action.data.quantity;
                
                return { ...state, flowers: updatedState };
            } else {
                return { ...state, flowers: state.flowers.concat(action.data) };
            }
        
        case 'INCREASE_QUANTITY':
            const existingIdInc = searchFlowersId(state.flowers, action.data);
            const increasedState = [...state.flowers];
            
            if (existingIdInc !== -1) {
                increasedState[existingIdInc].quantity += 1;
            }

            return { ...state, flowers: increasedState };
        
        case 'DECREASE_QUANTITY':
            const existingIdDec = searchFlowersId(state.flowers, action.data);
            const decreasedState = [...state.flowers];

            if ( existingIdDec !== -1 && decreasedState[existingIdDec].quantity > 1){
                decreasedState[existingIdDec].quantity -= 1;
            }

            return { ...state, flowers: decreasedState };

        case 'DELETE_FLOWERS':
            const existingIdDel = searchFlowersId(state.flowers, action.data);
            const deletedState = [...state.flowers];

            if (existingIdDel !== -1) {
                deletedState.splice(existingIdDel, 1);
            }
            
            return { ...state, flowers: deletedState };

        default:
            return state;

    }

};

export default flowersReducer;