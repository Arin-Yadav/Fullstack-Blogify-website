import React from 'react'

const Blogcard = ({title, content, author}) => {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-700">{content}</p>
      <p className="text-sm text-gray-500 mt-2">By {author}</p>
    </div>
  )
}

export default Blogcard