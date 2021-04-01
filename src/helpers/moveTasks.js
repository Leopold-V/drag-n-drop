export const changeOfLine = (state, source, destination) => {
	const result = { ...state };
	const [remove] = result[source.droppableId].splice(source.index, 1);
	result[source.droppableId].splice(destination.index, 0, remove);
	return result;
};
  
export const changeOfColumn = (state, source, destination) => {
	const result = { ...state };
	const [remove] = result[source.droppableId].splice(source.index, 1);
	result[destination.droppableId].splice(destination.index, 0, remove);
	return result;
};