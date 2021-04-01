export const taskReducer = (state, {type, payload}) => {
    switch (type) {
        case 'CHANGE_LINE':
            const [remove] = state[payload.source.droppableId].splice(payload.source.index, 1);
            state[payload.source.droppableId].splice(payload.destination.index, 0, remove);
            return {...state}
        case 'CHANGE_COLUMN':
            let [remove2] = state[payload.source.droppableId].splice(payload.source.index, 1);
            state[payload.destination.droppableId].splice(payload.destination.index, 0, remove2);
            return {...state}
        case 'ADD':
            return {...state, [payload.column]: [...state[payload.column], payload.task]}
        case 'DELETE':
            const newColumn = state[payload.column].filter((ele) => ele.index !== payload.index);
            return {...state, [payload.column]: newColumn}
        default:
            throw new Error();
    }
}