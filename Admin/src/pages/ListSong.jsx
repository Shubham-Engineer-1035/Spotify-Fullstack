import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {url} from '../App'
import { toast } from 'react-toastify';

const ListSong = () => {
  const [data, setData] = useState([]);

  const fetchSongs = async()=>{
    try {
      const response = await axios.get(`${url}/api/song/list`)
      
      if (response.data.success) {
        setData(response.data.songs)
      }

    }
     catch (error) {
      toast.error("Failed to load songs")
    }
  }

  const removeSong = async(id)=>{
    try {
      const response = await axios.post(`${url}/api/song/remove`, {id})

      if(response.data.success){
        toast.success(response.data.message);
        await fetchSongs();
      }
    } catch (error) {
      toast.error("Internal server error");
    }
  }

  useEffect(()=>{
    fetchSongs();
  },[])  

  return (
    <div>
      <p >All Songs List</p>
      <br/>
      <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
        <b>Image</b>
        <b>Name</b>
        <b>Album</b>
        <b>Duration</b>
        <b>Action</b>
      </div>
      <div className="">
        {data.map((item, index)=>{
          return(
            <div className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5" key={index}>
              <img src={item.image} className='w-12' alt="" />
              <p>{item.name}</p>
              <p>{item.album}</p>
              <p>{item.duration}</p>
              <p className='cursor-pointer' onClick={()=>removeSong(item._id)}><i class="fa-regular fa-trash-can"></i></p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListSong