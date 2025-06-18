import React from 'react'
import { useRouteError } from 'react-router-dom'

function Error() {
  const error=useRouteError()
  return (
   <div className='flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800'>
      <h1 className='text-4xl font-bold mb-4'>Oops!</h1>
      <p className='text-lg mb-2'>Something went wrong.</p>
      <p className='text-sm text-gray-600'>{error.statusText || error.message}</p>
      <a href="/" className='mt-4 text-blue-500 hover:underline'>Go back to Home</a>
   </div>
  )
}

export default Error