import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = (props) => {
  return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const allFeedback = good + neutral + bad

  if (allFeedback === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>no feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={allFeedback} />
          <Statistic text="average" value={(good - bad)/(allFeedback)} />
          <Statistic text="positive" value={good / allFeedback * 100} />
        </tbody>
      </table>
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good"/>
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button onClick={() => setBad(bad + 1)} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)