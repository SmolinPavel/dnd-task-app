import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import Task from './Task';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
  display: flex;
`;

const Column = ({ column: { id, title } = {}, isDropDisabled, tasks }) => (
  <Container>
    <Title>{title}</Title>
    <Droppable direction="horizontal" droppableId={id} type={id === 'column-3' ? 'done' : 'active'} isDropDisabled={isDropDisabled}>
      {(provided, snapshot) => (
        <TaskList
          ref={provided.innerRef}
          {...provided.droppableProps}
          isDraggingOver={snapshot.isDraggingOver}>
          {tasks.map((task, index) => (
            <Task index={index} key={task.id} task={task} />
          ))}
          {provided.placeholder}
        </TaskList>
      )}
    </Droppable>
  </Container>
);

export default Column;
