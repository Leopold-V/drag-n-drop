import { useReducer, useRef } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { taskReducer } from './reducer/taskReducer';

import Card from './components/Card';

function App() {

  const [state, dispatch] = useReducer(taskReducer, {'Todo': [], 'In progress': [], 'Completed': []});

  const ref_board = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = ref_board.current.value;
    if (input === '') 
      return;
    if (state[input] !== undefined) 
      return;
    dispatch({type: 'ADD_BOARD', payload: input});
    ref_board.current.value = '';
  }

  const onDragEnd = (result) => {
    const { draggableId, source, destination } = result;

    if (!destination) 
      return;
    if (source.index === destination.index && source.droppableId === destination.droppableId)
      return;

    if (destination.droppableId === 'Trash') {
      dispatch({type: 'DELETE', payload: {index: draggableId, column: source.droppableId}});
    } else if (destination.droppableId === 'Board') {
      dispatch({type: 'REORDER_BOARD', payload: {source, destination}})
    } else {
      if (source.droppableId === destination.droppableId) {
        dispatch({type: 'CHANGE_LINE', payload: {source, destination}});
      } else {
        dispatch({type: 'CHANGE_COLUMN', payload: {source, destination}});
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <Title>Drag and drop demo</Title>
        <Droppable droppableId="Board" type="board" direction="horizontal">
          {provided => 
          <ContainerCard ref={provided.innerRef} {...provided.droppableProps}>
            {Object.keys(state).map((ele, i) => (
              <div key={i}><Card key={ele} title={ele} index={i} tasks={state[ele]} dispatch={dispatch} /></div>
            ))}
            {provided.placeholder}
          </ContainerCard>}
        </Droppable>
        <InputGroup onSubmit={handleSubmit}>
          <Button>
            <i className='fa fa-plus'></i>
          </Button>
          <Input ref={ref_board} type="text" placeholder="Add a board"/>
        </InputGroup>
        <Droppable droppableId="Trash" type="card">
          {(provided) => (
            <WrapperTrash ref={provided.innerRef} {...provided.droppableProps}>
              <i className="far fa-trash-alt"></i>
              <div>Drop items here to delete</div>
              {provided.placeholder}
            </WrapperTrash>
          )}
        </Droppable>
      </Container>
    </DragDropContext>
  );
};

export default App;

const Title = styled.h1`
  text-align: center;
  padding: 2rem;
`

const WrapperTrash = styled.div`
  width: 15rem;
  height: 8rem;
  margin: 2rem auto;
  padding: 2rem 1rem;
  color: #ff4b4b;
  text-align: center;
  border: 2px dashed #ff4b4b;
  border-radius: 5px;
  list-style: none;
  font-size: 1.1rem;
`

const Container = styled.div`
  padding-top: 5rem;
  background-color: whitesmoke;
  min-height: 100vh;
`;

const ContainerCard = styled.div`
  width: 100%;
  margin-bottom: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`

const Button = styled.button`
  height: 100%;
  padding: .5rem .8rem;
  background-color: #ff4b4b;
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
  width: 14rem;
  margin: 0 auto;
  display: flex;
  justify-content: start;
  align-items: center;
  background-color: white;
  overflow: hidden;
  border-radius: 3px;
  box-shadow: 0 0 .3rem rgba(0, 0, 0, 0.3);
`

const Input = styled.input`
  width: 100%;
  padding: 0 .5rem;
  text-align: center;
  background-color: white;
  font-size: .9rem;
  border: none;
  outline: none;
`