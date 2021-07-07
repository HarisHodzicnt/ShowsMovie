import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import Filters from '.';
import { useStores } from '../../hooks/useStores';
import { MovieShowStore } from '../../stores/MovieShowsStore';

jest.mock('../../hooks/useStores');
jest.mock('axios');
const mockGet = jest.fn();
const mockPost = jest.fn();
axios.get = mockGet;
axios.post = mockPost;

test('Test MovieShowCard component', () => {
  useStores.mockReturnValue({
    movieShowStore: new MovieShowStore(),
  });
  const card = render(<Filters />);
  expect(card.container).toMatchSnapshot();
  userEvent.type(screen.getByTestId('filter-name-input'), 'Dragon');
  userEvent.click(screen.getByTestId('filter-search'));
  expect(mockGet).toBeCalledWith(
    'https://api.themoviedb.org/3/search/movie?api_key=0358321151dc20553c013d0dd7246aa6&with_genres=&year=&query=Dragon&sort_by=release_date.desc'
  );
});
