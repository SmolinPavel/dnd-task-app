import React, { useState } from 'react';
import styled from 'styled-components';
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';

import Column from './Column';
import initialData from './initialData';

const Container = styled.div`
  display: flex;
`;

const App = () => {
  const [data, setData] = useState(initialData);

  const onDragEnd = ({ destination, draggableId, source }) => {
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = [...start.taskIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };

      const newData = {
        ...data,
        columns: { ...data.columns, [newColumn.id]: newColumn }
      };

      setData(newData);
    } else {
      const startTaskIds = [...start.taskIds];
      startTaskIds.splice(source.index, 1);

      const newStart = { ...start, taskIds: startTaskIds };

      const finishTaskIds = [...finish.taskIds];
      finishTaskIds.splice(destination.index, 0, draggableId);

      const newFinish = { ...finish, taskIds: finishTaskIds };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish
        }
      };

      setData(newData);
    }
  };

  const onDragStart = () => {
    document.body.style.color = 'orange';
    document.body.style.transition = 'background-color 0.2s ease';
  };

  const onDragUpdate = update => {
    const { destination } = update;
    const opacity = destination
      ? destination.index / Object.keys(data.tasks).length
      : 0;
    document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  };

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}>
      <Container>
        {data.columnOrder.map(columnId => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map(taskId => data.tasks[taskId]);
          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </Container>
    </DragDropContext>
  );
};

export default App;
