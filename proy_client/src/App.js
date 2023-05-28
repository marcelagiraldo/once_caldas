/* rafce */
import React from 'react';
import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AllRoutesProject from './config/routes'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {AllRoutesProject.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <route.layout>
                <route.component />
              </route.layout>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );

};

export default App



