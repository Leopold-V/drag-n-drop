import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
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

  const handleDrag = (isDragging) => {
    console.log(isDragging);
  } 

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;
    if (source.index === destination.index && source.droppableId === destination.droppableId) return;

    if (source.droppableId === destination.droppableId) {
      setState(changeOfLine(state, source, destination));
    } else {
      setState(changeOfColumn(state, source, destination));
    }
  };

  return (
    <Container>
      <Title>Drag and drop demo</Title>
      <ContainerCard>
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.keys(state).map((ele) => (
            <div>
              <Card key={ele} title={ele} tasks={data[ele]} handleDrag={handleDrag} />
            </div>
          ))}
        </DragDropContext>
      </ContainerCard>
    </Container>
  );
}

export default App;

const Container = styled.div`
  position: relative;
  background-color: whitesmoke;
  min-height: 100vh;
`;

const ContainerCard = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 6rem;
`;

const Title = styled.h1`
  padding-top: 4rem;
  text-align: center;
`