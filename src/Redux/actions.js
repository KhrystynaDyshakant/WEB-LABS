const addFlowers = (flowers, quantity) => ({
    type: 'ADD_FLOWERS',
    data: {
        flowers,
        quantity,
    },
});

const increaseQuantity = (flowersId) => ({
    type: 'INCREASE_QUANTITY',
    data: flowersId,
});

const decreaseQuantity = (flowersId) => ({
    type: 'DECREASE_QUANTITY',
    data: flowersId,
});

const deleteFlowers = (flowersId) => ({
    type: 'DELETE_FLOWERS',
    data: flowersId,
});

export { addFlowers, increaseQuantity, decreaseQuantity, deleteFlowers };