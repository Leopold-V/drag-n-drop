import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import Card from './Card';

export const Board = ({state, dispatch}) => {

    return (
        <Droppable droppableId="board" type="card" direction="horizontal">
          {provided => 
          <ContainerCard ref={provided.innerRef} {...provided.droppableProps}>
            {Object.keys(state).map((ele, i) => (
              <div key={i}>
                  <Card key={ele} title={ele} index={i} tasks={state[ele]} dispatch={dispatch} />
              </div>
            ))}
            {provided.placeholder}
          </ContainerCard>}
        </Droppable>
    )
};

Board.propTypes = { 
    state: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

export default Board;

const ContainerCard = styled.div`
  width: 100%;
  min-height: 20rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;
