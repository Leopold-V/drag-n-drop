import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

export const Item = ({ task, index }) => {
  return (
    <Draggable draggableId={task.index} index={index}>
      {(provided) => (
        <Itemstyled ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {task.name}
        </Itemstyled>
      )}
    </Draggable>
  );
};

const Itemstyled = styled.li`
  background-color: #306bc8;
  color: white;
  width: 80% auto;
  max-height: 4rem;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 2px;
  box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.3);
  text-align: center;
`;
