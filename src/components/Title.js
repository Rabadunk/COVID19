import React from 'react'
import TitleImage from '../img/Title.png';
import { FiAlertTriangle } from 'react-icons/fi'

function Title () {
  return (
    <div className='Title'>
      <h1>
        <img src={TitleImage}/>
      </h1>
    </div>
  )
}

export default Title
