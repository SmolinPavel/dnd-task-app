export default {
  tasks: {
    'task-1': { id: 'task-1', content: 'Find cool dnd library' },
    'task-2': { id: 'task-2', content: 'Find cool react dnd library' },
    'task-3': { id: 'task-3', content: 'Learn cool react dnd library' },
    'task-4': { id: 'task-4', content: 'Implement cool react dnd library' }
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      taskIds: []
    }
  },
  columnOrder: ['column-1', 'column-2']
};
