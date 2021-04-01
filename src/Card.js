import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import Item from './Item';

const Card = ({ title, tasks, handleDrag }) => {
  return (
    <CardStyled>
      <CardHeader>{title}</CardHeader>
      <Droppable droppableId={title}>
        {(provided) => (
          <CardBody ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((ele, i) => (
              <Item key={ele.index} index={i} task={ele} handleDrag={handleDrag} />
            ))}
            {provided.placeholder}
          </CardBody>
        )}
      </Droppable>
    </CardStyled>
  );
};

export default Card;

const CardStyled = styled.div`
  width: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin: 1rem;
  padding: 1rem;
  background-color: white;
  box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.3);
`;

const CardHeader = styled.h2`
  padding-bottom: 1rem;
  text-align: center;
  border-bottom: 1px solid #cfcfcf;
`;

const CardBody = styled.ul`
  padding-top: 1rem;
`;
