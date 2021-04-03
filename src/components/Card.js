import React, { useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import Item from './Item';
import { Input, InputGroup } from './Form';
import { ButtonAdd, ButtonClose } from './Button';

const Card = ({ title, index, tasks, dispatch }) => {

  const ref_task = useRef(null);

  const handleClose = () => {
    dispatch({type: 'DELETE_CARD', payload: title});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ref_task.current.value === '') 
      return;
    const newTask = {index: nanoid(5), name: ref_task.current.value};
    dispatch({type: 'ADD', payload: {column: title, task: newTask}});
    ref_task.current.value = '';
  }

  return (
    <Draggable draggableId={title} index={index}> 
      {provided =>
      <CardStyled
        ref={provided.innerRef} 
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <ButtonClose onClick={handleClose}>
          <i className="fas fa-times"></i>
        </ButtonClose>
        <CardHeader>{title}</CardHeader>
        <Droppable droppableId={title} type="item">
          {(provided) => (
            <CardBody ref={provided.innerRef} {...provided.droppableProps}>
              {tasks.map((ele, i) => (
                <Item key={ele.index} index={i} task={ele} />
              ))}
              {provided.placeholder}
            </CardBody>
          )}
        </Droppable>
        <InputGroup onSubmit={handleSubmit}>
          <ButtonAdd />
          <Input ref={ref_task} type="text" placeholder="Add a task" />
        </InputGroup>
      </CardStyled>}
    </Draggable>
  );
};

Card.propTypes = { 
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  tasks: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Card;


const CardStyled = styled.div`
  position: relative;
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
  text-overflow: ellipsis;
  overflow: hidden;
`;

const CardBody = styled.ul`
  padding-top: 1rem;
`;
