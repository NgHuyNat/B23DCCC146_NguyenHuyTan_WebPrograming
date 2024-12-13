import React from 'react'

function Home() {
  return (
    <>
        <div className='sidebar-title'>
            <p>Dashboard</p>

        </div>

        <div className='sidebar-home'>
            <div className='sidebar-home-item'>
                <i className='fas fa-home'></i>
                <p>Home</p>
            </div>
            <div className='sidebar-home-item'>
                <i className='fas fa-chart-line'></i>
                <p>Analytics</p>
            </div>
        </div>
    </>
  )
}

export default Home
