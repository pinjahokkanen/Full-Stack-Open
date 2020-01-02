import React from 'react'
import Person from './Person'

const Persons = ({ persons, filterName }) => {
  const namesToShow = filterName === ''
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  return namesToShow.map(person => <Person key={person.name} person={person} />)
}

export default Persons