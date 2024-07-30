import React from 'react'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Routes, Route } from 'react-router-dom';
import AddAlbum from './pages/AddAlbum';
import AddSong from './pages/AddSong'
import ListSong from './pages/ListSong'
import ListAlbum from './pages/ListAlbum'
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Welcome from './pages/Welcome';

export const url = "https://spotify-fullstack-server.onrender.com";

const App = () => {
  return (
    <div className='flex items-start min-h-screen'>
      <ToastContainer/>
      <Sidebar/>

      <div className="flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]">
        <Navbar/>
        
        <div className="pt-8 pl-5 sm:pt-12 sm:pl-12">
          <Routes>
           <Route path='/' element={<Welcome/>}/>
            <Route path='/add-song' element={<AddSong/>}/>
            <Route path='/add-album' element={<AddAlbum/>}/>
            <Route path='/list-song' element={<ListSong/>}/>
            <Route path='/list-album' element={<ListAlbum/>}/>
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App;
