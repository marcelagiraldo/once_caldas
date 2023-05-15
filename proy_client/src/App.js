/* rafce */
import React from 'react'
import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AllRoutesProject from './config/routes'
<<<<<<< HEAD
=======
import  SignIn  from './pages/SignIn/SignIn'
import { LayoutGenreal } from './layouts/GeneralLayout/LayoutGenreal'
import AdminRegister from './pages/AdminRegister/AdminRegister'
import ChangePassword from './pages/ChangePassword/ChangePassword'
>>>>>>> f337300 (register admin & change password)

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
=======
        <Route path='/' element={<SignIn/>}></Route>
        <Route path='dashboard' element={<LayoutGenreal/>}></Route>
        <Route path='adminregister' element={<AdminRegister/>}></Route>
        <Route path='changepassword' element={<ChangePassword/>}></Route>
>>>>>>> f337300 (register admin & change password)
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

export default App;
