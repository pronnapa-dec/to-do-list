import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addTodo, toggleTodo, deleteTodo } from '../redux/actions';

const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state);
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'completed') return todo.completed;
    if (filter === 'incomplete') return !todo.completed;
    return false;
  });

  const handleAddTodo = (text: string) => {
    if(text)
    dispatch(addTodo(text));
    (document.getElementById('outlined-basic') as HTMLInputElement).value = ''
  };

  const handleToggleComplete = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div>
      <TextField
        label="Add Todo"
        id="outlined-basic"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleAddTodo((e.target as HTMLInputElement).value);
          }
        }}
      />
      <Button onClick={() => handleAddTodo((document.getElementById('outlined-basic') as HTMLInputElement).value)} variant="contained" color="primary">
        Add
      </Button>
      <div>
        <Button onClick={() => setFilter('all')} variant={filter === 'all' ? 'contained' : 'outlined'}>All</Button>
        <Button onClick={() => setFilter('completed')} variant={filter === 'completed' ? 'contained' : 'outlined'}>Completed</Button>
        <Button onClick={() => setFilter('incomplete')} variant={filter === 'incomplete' ? 'contained' : 'outlined'}>Incomplete</Button>
      </div>
      <List>
        {filteredTodos.map((todo) => (
          <ListItem key={todo.id}>
            <Checkbox
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo.id)}
            />
            <ListItemText
              primary={todo.text}
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            />
            <IconButton onClick={() => handleDeleteTodo(todo.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TodoList;
