/* rafce */
import React,{ useEffect, useState } from 'react'
import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AllRoutesProject from './config/routes'
import  SignIn  from './pages/web/SignIn/SignIn';
import { LayoutGeneral } from './layouts/LayoutGeneral/LayoutGeneral'
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/admins');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(data)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn/>}></Route>
        <Route path='dashboard' element={<LayoutGeneral/>}></Route>
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



