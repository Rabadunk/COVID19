import React from 'react'
import TitleImage from '../../img/Title.png';
import './Title.css'

function Title () {
  return (
    <div className='Title'>
      <h1>
        <img src={TitleImage} alt="COVID-19 VISUALISER"/>
      </h1>
    </div>
  )
}

export default Title
