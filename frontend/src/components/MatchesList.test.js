import { screen } from '@testing-library/react';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import MatchesList from './MatchesList';

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('render matches data', async () => {
  const fakeMatches = [
    {
      id: 1,
      game: 'Counter-Strike: Global Offensive',
      team1: 'MIBR',
      team2: 'G2',
      date: '22/02/2022',
    },
    {
      id: 2,
      game: 'Counter-Strike: Global Offensive',
      team1: 'NAVI',
      team2: 'FAZE',
      date: '30/02/2022',
    },
    {
      id: 3,
      game: 'Counter-Strike: Global Offensive',
      team1: 'G3X',
      team2: 'THELASTDANCE',
      date: '30/02/2022',
    },
  ];

  jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(fakeMatches),
  }));

  await act(async () => {
    render(<MatchesList />, container);
  });

  expect(container.querySelectorAll('.match').length).toBe(3);

  let element = screen.getByText(/G2/);
  expect(element).toBeInTheDocument();

  element = screen.getByText(/G3X/);
  expect(element).toBeInTheDocument();

  element = screen.getByText(/LASTDANCE/);
  expect(element).toBeInTheDocument();

  element = screen.getByText(/MIBR/);
  expect(element).toBeInTheDocument();

  global.fetch.mockRestore();
});
