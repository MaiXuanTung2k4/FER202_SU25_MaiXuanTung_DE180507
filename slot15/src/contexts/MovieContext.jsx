// src/contexts/MovieContext.jsx
import React, { createContext, useReducer, useContext, useEffect, useCallback } from 'react';
import { movieReducer, initialMovieState } from '../reducers/movieReducers';
import movieApi from '../api/movieAPI';

export const MovieStateContext = createContext(initialMovieState);
export const MovieDispatchContext = createContext(null);

export const useMovieState = () => useContext(MovieStateContext);
export const useMovieDispatch = () => useContext(MovieDispatchContext);

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialMovieState);

  const fetchMovies = useCallback(async () => {
    dispatch({ type: 'START_LOADING' });
    try {
      const res = await movieApi.get('/movies');
      dispatch({ type: 'SET_MOVIES', payload: res.data });
    } catch (err) {
      console.error('Fetch movies error', err);
      dispatch({ type: 'SET_MOVIES', payload: [] });
    }
  }, []);

  const confirmDelete = useCallback(
    async (id) => {
      dispatch({ type: 'CLOSE_DELETE_MODAL' });
      dispatch({ type: 'START_LOADING' });
      try {
        await movieApi.delete(`/movies/${id}`);
        fetchMovies();
      } catch (err) {
        console.error('Delete error', err);
        fetchMovies();
      }
    },
    [fetchMovies]
  );

  const handleCreateOrUpdate = useCallback(
    async (dataToSend, isEditingFlag, isEditingId) => {
      dispatch({ type: 'START_LOADING' });
      try {
        if (isEditingFlag) {
          await movieApi.put(`/movies/${isEditingId}`, dataToSend);
        } else {
          await movieApi.post('/movies', dataToSend);
        }
        dispatch({ type: 'RESET_FORM' });
        fetchMovies();
        return true;
      } catch (err) {
        console.error('Create/Update error', err);
        fetchMovies();
        return false;
      }
    },
    [fetchMovies]
  );

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const dispatchValue = {
    dispatch,
    fetchMovies,
    confirmDelete,
    handleCreateOrUpdate
  };

  return (
    <MovieStateContext.Provider value={state}>
      <MovieDispatchContext.Provider value={dispatchValue}>{children}</MovieDispatchContext.Provider>
    </MovieStateContext.Provider>
  );
};
