import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import data from './data';
import { Card } from './Card';

function App() {
  const [state, setState] = useState(data);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    const changeLine = (state, source, destination) => {
      const result = { ...state };
      const [remove] = result[source.droppableId].splice(source.index, 1);
      result[source.droppableId].splice(destination.index, 0, remove);
      return result;
    };

    const changeColumn = (state, source, destination) => {
      const result = { ...state };
      const [remove] = result[source.droppableId].splice(source.index, 1);
      result[destination.droppableId].splice(destination.index, 0, remove);
      return result;
    };

    if (!destination) return;
    if (source.index === destination.index && source.droppableId === destination.droppableId) return;

    if (source.droppableId === destination.droppableId) {
      setState(changeLine(state, source, destination));
    } else {
      setState(changeColumn(state, source, destination));
    }
  };

  return (
    <Container>
      <ContainerCard>
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.keys(state).map((ele) => (
            <div>
              <Card key={ele} title={ele} tasks={data[ele]} />
            </div>
          ))}
        </DragDropContext>
      </ContainerCard>
    </Container>
  );
}

export default App;

const Container = styled.div`
  background-color: whitesmoke;
  position: relative;
  min-height: 100vh;
`;

const ContainerCard = styled.div`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin-top: 10rem;
`;
