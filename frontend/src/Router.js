import React from 'react';
import { observer } from 'mobx-react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { useUserStore } from './providers/UserProvider';

import Login from './pages/login/Login';
import Navbar from './pages/navbar/Navbar';

import Home from './pages/home/Home';
import Teams from './pages/teams/Teams';
import NewTeam from './components/team/NewTeam';
import Games from './pages/games/Games';
import NewGame from './pages/games/NewGame';
import MatcheList from './pages/match/MatchList';
import MatchFormPage from './pages/match/MatchFormPage';
import UserBets from './pages/user/UserBets';

const Router = observer(() => {
  const UserStore = useUserStore();

  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="login"
          element={UserStore.isAuthenticated ? <Navigate to="/" /> : <Login />}
        />

        <Route path="" element={<Navbar />}>

          <Route path="" element={<Home />} />

          <Route path="matches" element={<MatcheList />} />
          <Route path="matches/new" element={<MatchFormPage />} />
          <Route path="matches/edit/:id" element={<MatchFormPage />} />

          <Route path="teams" element={<Teams />} />
          <Route path="teams/new" element={<NewTeam />} />
          <Route path="games" element={<Games />} />
          <Route path="newGame" element={<NewGame />} />
          <Route path="bets" element={<UserBets />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
});

export default Router;
