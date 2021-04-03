import { useState, useReducer, useRef } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { taskReducer } from './reducer/taskReducer';

import Board from './components/Board';
import DeleteZone from './components/DeleteZone';
import { Input, InputGroup } from './components/Form';
import { ButtonAdd } from './components/Button';

function App() {
  /* 
  state data model example :
  {'Card Example' : [{index: 'gNrI5', name: 'Item example'}], 'Other Card': []}
  */
  const [state, dispatch] = useReducer(taskReducer, {});
  const [error, setError] = useState('');

  const ref_card = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = ref_card.current.value;
    if (input === '') {
      setError('Please provide a name.');
      return;
    }
    if (state[input] !== undefined) {
      setError('Card name already exist.');
      return;
    }
    dispatch({ type: 'ADD_CARD', payload: input });
    ref_card.current.value = '';
    setError('');
  };

  const onDragEnd = (result) => {
    const { draggableId, source, destination } = result;

    if (!destination) return;
    if (source.index === destination.index && source.droppableId === destination.droppableId) return;
    if (destination.droppableId === 'trash') {
      dispatch({ type: 'DELETE', payload: { index: draggableId, column: source.droppableId } });
    } else if (destination.droppableId === 'board') {
      dispatch({ type: 'REORDER_CARD', payload: { source, destination } });
    } else {
      if (source.droppableId === destination.droppableId) {
        dispatch({ type: 'CHANGE_LINE', payload: { source, destination } });
      } else {
        dispatch({ type: 'CHANGE_COLUMN', payload: { source, destination } });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <Title>Demo react-beautiful-dnd with reducer</Title>
        <Board state={state} dispatch={dispatch} />
        <InputGroup onSubmit={handleSubmit}>
          <ButtonAdd variant="danger" />
          <Input ref={ref_card} type="text" placeholder="Add a board" />
        </InputGroup>
        <Error>{error}</Error>
        <DeleteZone />
      </Container>
    </DragDropContext>
  );
}

export default App;

const Title = styled.h1`
  text-align: center;
  padding: 2rem;
`;

const Error = styled.div`
  margin-top: 1rem;
  min-height: 2rem;
  color: red;
  font-weight: 600;
`;

const Container = styled.div`
  background-color: whitesmoke;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
