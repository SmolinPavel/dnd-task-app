import React, { useState } from 'react';
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';

import Column from './Column';
import initialData from './initialData';

const App = () => {
  const [data, setData] = useState(initialData);

  return data.columnOrder.map(columnId => {
    const column = data.columns[columnId];
    const tasks = column.taskIds.map(taskId => data.tasks[taskId]);

    const onDragEnd = ({ destination, draggableId, source }) => {
      if (!destination) return;
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      )
        return;

      const column = data.columns[source.droppableId];
      const newTaskIds = [...column.taskIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...column,
        taskIds: newTaskIds
      };

      const newData = {
        ...data,
        columns: { ...data.columns, [newColumn.id]: newColumn }
      };

      setData(newData);
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
        <Column key={column.id} column={column} tasks={tasks} />
      </DragDropContext>
    );
  });
};

export default App;
