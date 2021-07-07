import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MovieShowCard from '.';

const setFavorite = jest.fn();

const props = {
  movieShow: {
    adult: false,
    backdrop_path: '/wjQXZTlFM3PVEUmKf1sUajjygqT.jpg',
    genre_ids: [878, 28, 53],
    id: 581726,
    original_language: 'en',
    original_title: 'Infinite',
    overview:
      'Evan McCauley has skills he never learned and memories of places he has never visited. Self-medicated and on the brink of a mental breakdown, a secret group that call themselves “Infinites” come to his rescue, revealing that his memories are real.',
    popularity: 4322.487,
    poster_path: '/niw2AKHz6XmwiRMLWaoyAOAti0G.jpg',
    release_date: '2021-09-08',
    title: 'Infinite',
    video: false,
    vote_average: 0,
    vote_count: 0,
  },
  isFavorite: true,
  setFavorite,
};

test('Test MovieShowCard component', () => {
  const card = render(<MovieShowCard {...props} />);
  expect(card.container).toMatchSnapshot();
  const btn = screen.getByTestId('movie-show-card-favorites');
  userEvent.click(btn);
  expect(setFavorite).toBeCalled();
  expect(btn).toHaveTextContent('Remove from Favorites');
});

test('Test MovieShowCard component add to favorites', () => {
  render(<MovieShowCard {...props} isFavorite={false} />);
  const btn = screen.getByTestId('movie-show-card-favorites');
  expect(btn).toHaveTextContent('Add to Favorites');
});
