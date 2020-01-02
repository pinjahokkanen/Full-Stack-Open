import React from 'react'

const Filter = ({ filterName, handleFilterChange, persons}) => {
  return (
    <div>filter shown with <input value={filterName} onChange={handleFilterChange}/></div>
  )
}

export default Filter