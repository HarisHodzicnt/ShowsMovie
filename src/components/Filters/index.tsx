import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useStores } from '../../hooks/useStores';
import { MENU_TABS } from '../../constants';
import './index.scss';

const Filters = observer(() => {
  const { movieShowStore } = useStores();
  let history = useHistory();

  useEffect(() => {
    movieShowStore.getAllGenres();
  }, []);

  const handleInputChange = useCallback(
    (
      event: React.ChangeEvent<{
        value: string[] | string;
        id: string;
        name: string;
      }>
    ) => {
      const id = event.target.id ? event.target.id : event.target.name;
      movieShowStore.setFilters({
        ...movieShowStore.filters,
        [id]: event.target.value as string[],
      });
    },
    [movieShowStore.filters]
  );

  const handleSubmit = () => {
    const { genre, name, year } = movieShowStore.filters;
    movieShowStore.getFilteredMoviesShows(genre.join(','), year, name);
  };

  const handleTabClick = (tab: 'Favorites' | 'Movies' | 'Shows') => () => {
    if (tab === 'Favorites') {
      history.push('/favorites');
      return;
    }
    movieShowStore.setActiveTabSelect(tab);
  };

  return (
    <Grid item xs={12} md={4} className="tabs-filters-page">
      <div className="tabs-filters">
        <div className="tabs">
          {MENU_TABS.map((tab: any) => {
            return (
              <Button
                key={tab}
                className={`${
                  tab === movieShowStore.activeTabSelect
                    ? 'active-tab'
                    : 'secondary-tab'
                }`}
                onClick={handleTabClick(tab)}
              >
                {tab}
              </Button>
            );
          })}
        </div>

        <div className="flex-row filters">
          <div className="title">Filters</div>
          <Input
            placeholder={'Filter by name'}
            id="name"
            onChange={handleInputChange}
            value={movieShowStore.filters.name}
            className="flex-row"
            data-testid="filter-name-input"
          />
          <FormControl className="flex-row selection">
            <InputLabel className="genre-label" id="demo-simple-select-label">
              Choose genre
            </InputLabel>

            <Select
              labelId="genre"
              id="genre"
              onChange={handleInputChange as any}
              value={movieShowStore.filters.genre}
              multiple
              input={<Input />}
              name="genre"
            >
              {movieShowStore.allGeneres.map((genre) => (
                <MenuItem value={genre.name} key={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Input
            className="flex-row"
            placeholder={'Filter by year'}
            onChange={handleInputChange}
            id="year"
            value={movieShowStore.filters.year}
          />
          <Button
            onClick={handleSubmit}
            className="select flex-row"
            data-testid="filter-search"
          >
            Search
            <SearchIcon />
          </Button>
        </div>
      </div>
    </Grid>
  );
});

export default Filters;
