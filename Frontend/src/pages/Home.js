import React from 'react'

import "./home.css"
import Navbar from '../components/Navbar'



export default function Home() {
  return (
    <><Navbar />
    <div>
      
      <div id="carouselExample" class="carousel slide">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="firstpic.png" class="d-block w-100" alt="..." />
          </div>
          <div class="carousel-item">
            <img src="firstpic.png" class="d-block w-100" alt="..." />
          </div>
          <div class="carousel-item">
            <img src="firstpic.png" class="d-block w-100" alt="..." />
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
      <div className='Hero'>
        <h1 className='Hero1'>Health Information System</h1>
      </div>
      
      <div className='container'>
        <div className='box'>
          <div className='icon'>
          <i className="fa fa-info" aria-hidden="true"></i>
          </div>
          <div className='content'>
            <h3>info</h3>
           <p>hello health Information System</p>
          </div>
        </div>
        
        <div className='box'>
          <div className='icon'>
          <i className="fa fa-info" aria-hidden="true"></i>
          </div>
          <div className='content'>
            <h3>info</h3>
           <p>hello health Information System</p>
          </div>
        </div>
        
        <div className='box'>
          <div className='icon'>
          <i className="fa fa-info" aria-hidden="true"></i>
          </div>
          <div className='content'>
            <h3>info</h3>
           <p>hello health Information System</p>
          </div>
        </div>
        
      </div>
    </>

  )
}




