/* rafce */
import React from 'react'
import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AllRoutesProject from './config/routes'
import  SignIn  from './pages/SignIn/SignIn'
import { LayoutGenreal } from './layouts/GeneralLayout/LayoutGenreal'
import AdminRegister from './pages/AdminRegister/AdminRegister'
import ChangePassword from './pages/ChangePassword/ChangePassword';
import Fevolution from './pages/Fevolution/Fevolution';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn/>}></Route>
        <Route path='dashboard' element={<LayoutGenreal/>}></Route>
        <Route path='adminregister' element={<AdminRegister/>}></Route>
        <Route path='changepassword' element={<ChangePassword/>}></Route>
        <Route path='fevolution' element={<Fevolution/>}></Route>
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

