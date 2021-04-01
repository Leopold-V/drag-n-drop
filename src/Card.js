import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import { Item } from './Item';

export const Card = ({ title, tasks }) => {
  return (
    <CardStyled>
      <CardHeader>{title}</CardHeader>
      <Droppable droppableId={title}>
        {(provided) => (
          <CardBody ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((ele, i) => (
              <Item key={ele.index} index={i} task={ele} />
            ))}
            {provided.placeholder}
          </CardBody>
        )}
      </Droppable>
    </CardStyled>
  );
};

const CardStyled = styled.div`
  background-color: white;
  width: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin: 0 1rem;
  padding: 1rem;
  box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.3);
`;

const CardHeader = styled.h2`
  padding-bottom: 1rem;
  border-bottom: 1px solid #cfcfcf;
  text-align: center;
`;

const CardBody = styled.ul`
  padding-top: 1rem;
`;
