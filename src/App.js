import { useReducer } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { taskReducer } from './reducer/taskReducer';

import Card from './components/Card';

function App() {

  const [state, dispatch] = useReducer(taskReducer, {'Todo': [], 'In progress': [], 'Completed': []});

  const onDragEnd = (result) => {
    const { draggableId, source, destination } = result;

    if (!destination) return;
    if (source.index === destination.index && source.droppableId === destination.droppableId) return;

    if (destination.droppableId !== 'trash') {
      if (source.droppableId === destination.droppableId) {
        dispatch({type: 'CHANGE_LINE', payload: {source, destination}})
      } else {
        dispatch({type: 'CHANGE_COLUMN', payload: {source, destination}})
      }
    } else {
      dispatch({type: 'DELETE', payload: {index: draggableId, column: source.droppableId}})
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
      <Title>Drag and drop demo</Title>
        <ContainerCard>
            {Object.keys(state).map((ele, i) => (
              <div key={i} >
                <Card title={ele} tasks={state[ele]} dispatch={dispatch} />
              </div>
            ))}
        </ContainerCard>
        <Droppable droppableId="trash">
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
}

export default App;

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
  background-color: whitesmoke;
  min-height: 100vh;
`;

const ContainerCard = styled.div`
  width: 100%;
  min-height: 20rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 5rem;
`;

const Title = styled.h1`
  padding-top: 4rem;
  text-align: center;
`