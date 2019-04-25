import React, { memo } from 'react';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import Task from './Task';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
  background-color: white;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  background-color: ${props =>
    props.isDraggingOver ? 'lightgrey' : 'inherit'};
  flex-grow: 1;
  min-height: 100px;
`;

const InnerList = memo(({ tasks }) => (
  <>
    {tasks.map((task, index) => (
      <Task index={index} key={task.id} task={task} />
    ))}
  </>
));

const Column = ({ column: { id, title } = {}, index, tasks }) => (
  <Draggable draggableId={id} index={index}>
    {provided => (
      <Container {...provided.draggableProps} ref={provided.innerRef}>
        <Title {...provided.dragHandleProps}>{title}</Title>
        <Droppable droppableId={id} type='tasks'>
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}>
              <InnerList tasks={tasks} />
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    )}
  </Draggable>
);

export default memo(Column);
