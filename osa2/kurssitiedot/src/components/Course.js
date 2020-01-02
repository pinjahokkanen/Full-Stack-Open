import React from 'react'

const Header = ( {course} ) => {
    return <h2>{course}</h2>
  }

const Content = ( {parts} ) => {
    return (
      <div>
        {parts.map(parts => <Part key={parts.id} part={parts.name} exercises={parts.exercises}/>)}
      </div>
    )
  }

const Part = (props) => (
    <div>
      <p>{props.part} {props.exercises}</p>
    </div>
)

const Total = ( {parts} ) => {
    const total = parts.reduce( (s, p) => s + p.exercises, 0)
    return <h4> Number of exercises {total}</h4>
}

const Course = ({ courses }) => {
  return (
    <div>
        {courses.map((course,i) => {
          return (
            <div key={i}>
             <Header course={course.name} />
             <Content parts={course.parts} />
             <Total parts={course.parts} />
            </div>
          )
        })}
    </div>
  )
}

export default Course