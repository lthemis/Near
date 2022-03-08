import React from 'react'
import "../styles/Home/Home.css"
import { MainSvg } from '../components/MainSvg';

export const Home = () => {
  return (
    <div className='homeContainer'>
      <svg className="bcgSvg" width="994" height="982" viewBox="0 0 994 982" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M993.5 -14C863.032 -14 733.841 11.7623 613.304 61.816C492.767 111.87 383.244 185.235 290.989 277.722C198.734 370.209 125.554 480.007 75.6256 600.847C25.6976 721.688 -1.97002e-05 851.203 0 982L993.5 982V-14Z" fill="#071E3D"/>
      </svg>
      <MainSvg className="mainSvg"></MainSvg>
      
    </div>
  )
}



