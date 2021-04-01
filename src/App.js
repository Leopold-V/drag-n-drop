import { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import data from './data';
import Card from './Card';

const changeOfLine = (state, source, destination) => {
  const result = { ...state };
  const [remove] = result[source.droppableId].splice(source.index, 1);
  result[source.droppableId].splice(destination.index, 0, remove);
  return result;
};

const changeOfColumn = (state, source, destination) => {
  const result = { ...state };
  const [remove] = result[source.droppableId].splice(source.index, 1);
  result[destination.droppableId].splice(destination.index, 0, remove);
  return result;
};

function App() {
  const [state, setState] = useState(data);

  const onDragEnd = (result) => {
    const { draggableId, source, destination } = result;

    if (!destination) return;
    if (source.index === destination.index && source.droppableId === destination.droppableId) return;

    if (destination.droppableId !== 'trash') {
      if (source.droppableId === destination.droppableId) {
        setState(changeOfLine(state, source, destination));
      } else {
        setState(changeOfColumn(state, source, destination));
      }
    } else {
      const newColumn = state[source.droppableId].filter((ele) => ele.index !== draggableId);
      setState({...state, [source.droppableId]: newColumn});
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
      <Title>Drag and drop demo</Title>
        <ContainerCard>
            {Object.keys(state).map((ele) => (
              <div key={ele} >
                <Card title={ele} tasks={state[ele]} />
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