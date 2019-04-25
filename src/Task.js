import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 3px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 50%;
  display: flex;
  width: 40px;
  height: 40px;
  margin: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    outline: none;
    border-color: orange;
  }
`;

const Task = ({ index, task: { content, id } = {} }) => {
  const isDragDisabled = id === 'task-1';
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          isDragDisabled={isDragDisabled}>
          {content[0]}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
