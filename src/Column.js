import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";

import Task from "./Task";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  background-color: ${props => (props.isDraggingOver ? "skyblue" : "white")};
`;

const Column = ({ column: { id, title } = {}, tasks }) => (
  <Container>
    <Title>{title}</Title>
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <TaskList ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={snapshot.isDraggingOver}>
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
