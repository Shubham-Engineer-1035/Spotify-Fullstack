import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios'

export const PlayerContext = createContext();

const PlayerContextProvider = (props)=>{
    const audioRef = useRef();
    const seekBg = useRef();
    const seelBar = useRef();

    const url = "https://spotify-fullstack-server.onrender.com";
    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);

    const [track, setTrack] = useState(songsData[0]);
    const [playStatus , setPlayStatus] = useState(false);
    const [time, settime] = useState({
        currentTime: {
            second: 0,
            minute:0
        },
        totalTime:{
            second: 0,
            minute:0
        }
    })

    const play = ()=>{
        audioRef.current.play();
        setPlayStatus(true);
    }
    const pause = ()=>{
        audioRef.current.pause();
        setPlayStatus(false);
    }
    const platWithId = async(id)=>{
        await songsData.map((item)=>{
            if(id === item._id){
                setTrack(item);
            }
        })

        await audioRef.current.play();
        setPlayStatus(true)
    }
    const previous = async()=>{
       songsData.map(async(item, index)=>{

        if (track._id === item._id && index > 0) {
            await setTrack(songsData[index-1]);
            await audioRef.current.play();
            setPlayStatus(true)
        }
       })
    }
    const Next = async()=>{
        songsData.map(async(item, index)=>{

            if (track._id === item._id && index < songsData.length-1) {
                await setTrack(songsData[index+1]);
                await audioRef.current.play();
                setPlayStatus(true)
            }
           })
    }
    const seekSong = async(e)=>{
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration)
    }

    const getSongsData = async()=>{
        try {
            const response = await axios.get(`${url}/api/song/list`);
            setSongsData(response.data.songs)
            setTrack(response.data.songs[0]);
        } catch (error) {
            console.log("Internal server error")
        }
    }

    const getAlbumsData =  async()=>{
        try {
            const response = await axios.get(`${url}/api/album/list`);
            setAlbumsData(response.data.albums);
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(()=>{
        setTimeout(()=>{
            audioRef.current.ontimeupdate = ()=>{
                seelBar.current.style.width = (Math.floor(audioRef.current.currentTime/audioRef.current.duration*100))+"%"
                
                settime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime:{
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60)
                    }
                })
            }
        },1000)
    },[audioRef]);

    useEffect(()=>{
        getSongsData();
        getAlbumsData();
    },[])

    const contextValue = {
        audioRef,
        seekBg,
        seelBar,
        track,setTrack,
        playStatus,setPlayStatus,
        time,settime,
        play,pause,platWithId,
        Next,previous,seekSong,
        songsData,albumsData
    }

    return(
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;
