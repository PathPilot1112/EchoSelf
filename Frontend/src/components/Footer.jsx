import React from 'react'

const Footer = () => {
  return (
    <div className='w-full h-[300px] bg-black p-10'>
        <div className='w-full mr-10 h-1 bg-gray-600 '></div>
        <div className='text-white font-grotesk flex justify-between py-10 '>
            <div>
                <h1 className='font-bold text-3xl '>ECHOSELF</h1>
                <span className='text-gray-500 mr-3 '>MADE WITH SPOTIFY API.</span>
                <span className='text-gray-500'>NOT AFFLIATED WITH SPOTIFY</span>
            </div>
            <div className='flex gap-5'>
                <h2>PRIVACY POLICY</h2>
                <h2>TERMS OF USE</h2>
                <h2>CONTACT</h2>
            </div>
        </div>

    </div>
  )
}

export default Footer