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

  const onDragStart = start => {
    const homeIndex = data.columnOrder.indexOf(start.source.droppableId);

    setData({ ...data, homeIndex });
  };

  const onDragEnd = ({ destination, draggableId, source }) => {
    setData({ ...data, homeIndex: null });

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

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Container>
        {data.columnOrder.map((columnId, columnIndex) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map(taskId => data.tasks[taskId]);

          const isDropDisabled = columnIndex < data.homeIndex;

          return <Column key={column.id} column={column} tasks={tasks} isDropDisabled={isDropDisabled} />;
        })}
      </Container>
    </DragDropContext>
  );
};

export default App;
