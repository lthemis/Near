import React from 'react'
import "../styles/Home/Home.css"
import { MainSvg } from '../components/svg/MainSvg';
import { CardFace } from '../components/svg/CardFace';
import mainSvg from '../assets/mainSvg.svg'

export const Home = () => {
  return (
    <div className='homeContainer'>
      <svg className="bcgSvg" width="850" height="850" viewBox="0 0 994 982" fill="none" xmlns="http://www.w3.org/2000/svg">
      
      {/* <svg className="bcgSvg" width="994" height="982" viewBox="0 0 994 982" fill="none" xmlns="http://www.w3.org/2000/svg"> */}
        <path d="M993.5 -14C863.032 -14 733.841 11.7623 613.304 61.816C492.767 111.87 383.244 185.235 290.989 277.722C198.734 370.209 125.554 480.007 75.6256 600.847C25.6976 721.688 -1.97002e-05 851.203 0 982L993.5 982V-14Z" fill="#071E3D"/>
      </svg>
      <MainSvg height={600} width={600}></MainSvg>
      <div className="introContainer">
        <div>
          <h1 className='introContainer--mainHeading'>Proximity based shopping</h1>
        </div>
        <div>
          <h2 className='introContainer--subHeading'>Buy from your neighbours  <br/> and local businesses <br/> closest to you <br/>- in one click! </h2>
        </div>
        <div className='card'>
          <CardFace height={125} width={125}/>
          <p className='introContainer--paragraph'>10+ cities covered <br/>1000+ happy <br/>customers</p>
        </div>
      </div>
    </div>
  )
}



