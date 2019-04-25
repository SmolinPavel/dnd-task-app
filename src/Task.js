import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  background-color: ${props =>
    props.isDragDisabled ? 'lightgrey' : props.isDragging ? 'lightgreen' : 'white'};
  display: flex;
`;

const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`;

const Task = ({ index, task: { content, id } = {} }) => {
  const isDragDisabled = id === 'task-1';
  return (
    <Draggable draggableId={id} index={index} isDragDisabled={isDragDisabled}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          isDragDisabled={isDragDisabled}>
          <Handle {...provided.dragHandleProps} />
          {content}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
