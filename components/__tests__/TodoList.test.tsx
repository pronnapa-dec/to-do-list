// components/__tests__/TodoList.test.tsx
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TodoList from '../TodoList';
import { Provider } from 'react-redux';
import store from '../../redux/store';

test('renders todo list', () => {
  render(
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
  const inputElement = screen.getByLabelText('Add Todo');
  expect(inputElement).toBeInTheDocument();
});

test('adds a new todo', () => {
  render(
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
  const inputElement = screen.getByLabelText('Add Todo');
  fireEvent.change(inputElement, { target: { value: 'Test Todo' } });
  fireEvent.keyPress(inputElement, { key: 'Enter', code: 'Enter', charCode: 13 });
  const todoItem = screen.getByText('Test Todo');
  expect(todoItem).toBeInTheDocument();
});

test('toggles todo completion status', () => {
  render(
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
  const inputElement = screen.getByLabelText('Add Todo');
  fireEvent.change(inputElement, { target: { value: 'Test Todo' } });
  fireEvent.keyPress(inputElement, { key: 'Enter', code: 'Enter', charCode: 13 });
  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
});

test('deletes a todo', () => {
  render(
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
  const inputElement = screen.getByLabelText('Add Todo');
  fireEvent.change(inputElement, { target: { value: 'Test Todo' } });
  fireEvent.keyPress(inputElement, { key: 'Enter', code: 'Enter', charCode: 13 });
  const deleteButton = screen.getByRole('button', { name: /delete/i });
  fireEvent.click(deleteButton);
  const todoItem = screen.queryByText('Test Todo');
  expect(todoItem).not.toBeInTheDocument();
});
