import React, { useState } from 'react'

const Button = ({onClick,text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({text,value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Heading = ({text}) => <h1>{text}</h1>

const Statistics = ({good, bad, all, neutral}) => {
  let average = good-bad /all
  let positive = (good/all)*100
  if(all === 0)
  {
    return (
      <div>
        <Heading text="statistics"/>
        No feedback given
      </div>
    )
  }
  return(
    <div>
      <Heading text="statistics"/>
      <table>
        <tbody>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="all" value={all}/>
          <StatisticLine text="average" value={average}/>
          <StatisticLine text="positive" value={positive+" %"}/>
        </tbody>
      </table>
        

    </div>
  )

}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)


  const increaseGood =  () => {
    setAll(all + 1)
    setGood(good + 1)
  }
  const increaseNeutral = () => {
    setAll(all + 1)
    setNeutral(neutral + 1)
  }
  const increaseBad = () => {
    setAll(all + 1)
    setBad(bad + 1)
  }

  return (
    <div>
      <div>
        <Heading text="give feedback"/>
        <Button onClick={increaseGood} text="good"/>
        <Button onClick={increaseNeutral} text="neutral"/>
        <Button onClick={increaseBad} text="bad"/>
      </div>
      
     <Statistics good={good} neutral={neutral} bad={bad} all={all} />

    </div>
  )
}

export default App