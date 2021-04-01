import React, { useRef } from 'react';
import styled from 'styled-components';
import { nanoid } from 'nanoid';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import Item from './Item';

const Card = ({ title, index, tasks, dispatch }) => {

  const ref_task = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ref_task.current.value === '') return;
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
        <CardHeader>{title}</CardHeader>
        <Droppable droppableId={title} type="card">
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
          <Button>
            <i className='fa fa-plus'></i>
          </Button>
          <Input ref={ref_task} type="text" placeholder="Add a task" />
        </InputGroup>
      </CardStyled>}
    </Draggable>
  );
};

export default Card;

const Button = styled.button`
  height: 100%;
  padding: 0 .8rem;
  background-color: #2abd88;
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all .3s;
  &:hover {
    opacity: 0.8;
  }
`

const InputGroup = styled.form`
  margin-top: 1rem;
  display: flex;
  justify-content: start;
  align-items: center;
  background-color: whitesmoke;
  overflow: hidden;
  border-radius: 3px;
  box-shadow: 0 0 .3rem rgba(0, 0, 0, 0.3);
`

const Input = styled.input`
  width: 100%;
  padding: .5rem .5rem;
  text-align: center;
  background-color: whitesmoke;
  font-size: .9rem;
  border: none;
  outline: none;
`

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
