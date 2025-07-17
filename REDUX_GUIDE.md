# Redux Implementation Guide

This guide explains the Redux implementation in the Paralos Dashboard React TypeScript project.

## Overview

The Redux store is implemented using **Redux Toolkit (RTK)**, which is the official, opinionated, batteries-included toolset for efficient Redux development. RTK includes utilities that simplify the most common Redux use cases.

## Project Structure

```
src/
├── store/
│   ├── index.ts              # Store configuration and typed hooks
│   ├── Provider.tsx          # Redux Provider component
│   └── slices/
│       ├── counterSlice.ts   # Example slice for counter functionality
│       └── userSlice.ts      # Example slice with async operations
├── components/
│   ├── Counter.tsx           # Example component using Redux
│   └── UserList.tsx          # Example component with async Redux operations
├── App.tsx                   # Main app component
└── main.tsx                  # Entry point with Redux Provider
```

## Key Components

### 1. Store Configuration (`src/store/index.ts`)

The store is configured with:
- **configureStore**: RTK's store setup function
- **Typed hooks**: Pre-typed `useAppDispatch` and `useAppSelector` hooks
- **Middleware**: Default middleware with serializable check configuration

### 2. Redux Provider (`src/store/Provider.tsx`)

A wrapper component that provides the Redux store to the entire application using React Redux's Provider.

### 3. Slices

#### Counter Slice (`src/store/slices/counterSlice.ts`)
- Demonstrates basic Redux state management
- Includes synchronous actions (increment, decrement, reset)
- Shows how to handle payloads with `incrementByAmount`

#### User Slice (`src/store/slices/userSlice.ts`)
- Demonstrates async operations with `createAsyncThunk`
- Includes API calls to JSONPlaceholder
- Shows proper error handling and loading states
- Demonstrates CRUD operations (Create, Read, Update, Delete)

## Usage Examples

### Basic State Management

```typescript
import { useAppDispatch, useAppSelector } from '../store';
import { increment, decrement } from '../store/slices/counterSlice';

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.value);

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
};
```

### Async Operations

```typescript
import { useAppDispatch, useAppSelector } from '../store';
import { fetchUsers } from '../store/slices/userSlice';

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const { users, isLoading, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};
```

## Best Practices

### 1. Use RTK's createSlice
- Automatically generates action creators and action types
- Uses Immer under the hood for immutable updates
- Reduces boilerplate code significantly

### 2. Typed Hooks
- Always use `useAppDispatch` and `useAppSelector` instead of the raw hooks
- Provides full TypeScript support and autocomplete

### 3. Async Operations
- Use `createAsyncThunk` for async operations
- Handle pending, fulfilled, and rejected states in extraReducers
- Always include proper error handling

### 4. State Structure
- Keep state normalized when possible
- Separate loading states and errors per slice
- Use TypeScript interfaces for type safety

### 5. Component Organization
- Connect components to Redux at the appropriate level
- Don't over-connect - use props when it makes sense
- Keep business logic in slices, not components

## Adding New Slices

1. Create a new slice file in `src/store/slices/`
2. Define the state interface
3. Create the slice with initial state and reducers
4. Export actions and reducer
5. Add the reducer to the store configuration
6. Use the slice in your components

Example:
```typescript
// src/store/slices/todoSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { addTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
```

Then add it to the store:
```typescript
// src/store/index.ts
import todoSlice from './slices/todoSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    user: userSlice,
    todo: todoSlice, // Add new slice here
  },
  // ...
});
```

## Testing

When testing Redux components:
1. Use Redux Toolkit's testing utilities
2. Mock API calls for async thunks
3. Test both success and error states
4. Use `@testing-library/react` with custom render function that includes Redux Provider

## Performance Considerations

1. **Memoization**: Use `React.memo` for components that don't need frequent re-renders
2. **Selector Optimization**: Use reselect for expensive computed values
3. **Normalization**: Keep related data normalized to avoid deep updates
4. **Batching**: RTK automatically batches actions in React 18+

## Migration Notes

If migrating from vanilla Redux:
1. Replace `createStore` with `configureStore`
2. Replace hand-written reducers with `createSlice`
3. Replace `redux-thunk` with `createAsyncThunk`
4. Update action creators to use generated ones from slices
5. Update selectors to use the new state structure

## Dependencies

- `@reduxjs/toolkit`: Core Redux Toolkit
- `react-redux`: React bindings for Redux
- `@types/react-redux`: TypeScript types for React Redux

## Resources

- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Redux Documentation](https://react-redux.js.org/)
- [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools)

This implementation provides a solid foundation for state management in your React TypeScript application with modern best practices and full type safety.