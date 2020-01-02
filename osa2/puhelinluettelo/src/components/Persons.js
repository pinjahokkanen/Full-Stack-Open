import React from 'react'
import Person from './Person'

const Persons = ({ persons, filterName, removePerson }) => {
  const namesToShow = filterName === ''
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  return namesToShow.map(person => <Person key={person.name} person={person} removePerson={() => removePerson(person.id, person.name)} />)
}

export default Persons