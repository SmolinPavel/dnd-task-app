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

    const onDragEnd = () => {};

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Column key={column.id} column={column} tasks={tasks} />;
      </DragDropContext>
    );
  });
};

export default App;
