import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setNewFilter] = useState('')
  const [ message, setMessage ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    
    if (persons.some(person => (person.name.toLowerCase() === newName.toLowerCase()) && (person.number !== newNumber))) {
      const oldPerson = persons.find(n => n.name.toLowerCase() === newName.toLowerCase())
      const changedPerson = { ...oldPerson, number: newNumber }

      if (window.confirm(`${oldPerson.name} is already added to the phonebook, replace the old number with a new one?`)) {
        personService
          .update(oldPerson.id, changedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== oldPerson.id ? person : response.data))
            setNewName('')
            setNewNumber('')
            setMessage(`Replaced ${changedPerson.name}'s number with the number ${changedPerson.number} succesfully.`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setMessage(`Person '${oldPerson.name}' was already removed from server`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setPersons(persons.filter(n => n.name !== newName))
          })
      }
    } else if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      setNewName('')
      setNewNumber('')
      setMessage(`${newName} is already added to phonebook`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } else {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setMessage(`${newName} added to the phonebook succesfully.`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  const removePerson = (id, name ) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
      .remove(id)
        .then(response => {
          setPersons(persons.filter(n => n.id !== id))
          setMessage(`${newName} removed from the phonebook succesfully.`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    } else if ( message.includes("succesfully")) {
      return (
        <div className="success">
          {message}
        </div>
      )
    } else {
      return (
        <div className="error">
          {message}
        </div>
      )
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={message} />
        <Filter filterName={filterName} handleFilterChange={handleFilterChange} persons={persons} />
      <h2>Add a new person</h2>
        <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
        <Persons persons={persons} filterName={filterName} removePerson={removePerson}/>
    </div>
  )

}

export default App