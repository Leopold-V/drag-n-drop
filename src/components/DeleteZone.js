import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

export const DeleteZone = () => {
  return (
    <Droppable droppableId="trash" type="item">
      {(provided) => (
        <WrapperTrash ref={provided.innerRef} {...provided.droppableProps}>
          <i className="far fa-trash-alt"></i>
          <div>Drop items here to delete</div>
          {provided.placeholder}
        </WrapperTrash>
      )}
    </Droppable>
  );
};

export default DeleteZone;

const WrapperTrash = styled.div`
  width: 15rem;
  height: 8rem;
  margin: 2rem 0;
  padding: 2rem 1rem;
  color: #ff4b4b;
  text-align: center;
  border: 2px dashed #ff4b4b;
  border-radius: 5px;
  list-style: none;
  font-size: 1.1rem;
`;
