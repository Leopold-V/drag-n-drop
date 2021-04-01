import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

export const Item = ({ task, index}) => {

    

  return (
    <Draggable draggableId={task.index} index={index}>
      {(provided, snapshot) => (
        <Itemstyled 
        ref={provided.innerRef} 
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        isDragging={snapshot.isDragging}
        >
          {task.name}
        </Itemstyled>
      )}
    </Draggable>
  );
};

export default Item;

const Itemstyled = styled.li`
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  text-align: center;
  background-color: ${props => props.isDragging ? '#6389c4' : '#306bc8'};
  color: white;
  border-radius: 3px;
  box-shadow: 0 0 .3rem rgba(0, 0, 0, 0.3);
`;
