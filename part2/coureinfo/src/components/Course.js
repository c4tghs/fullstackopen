import React from "react";


const Header = ({title}) => {
  return (
    <h2>{title}</h2>
  )
}

const Content = ({course}) => {
  return (
    <div>
      {course.map((part) => <Part key={part.id} part={part} />)}
    </div>
  )
}


const Total = ({parts}) => {
  const total = parts.reduce((previousVal,currentVal) => previousVal + currentVal.exercises,0) 
  
  return(
      <strong>total of {total} exercises</strong>
  )
}

const Part = ({part}) => {
  return(
    <p>{part.name} {part.exercises}</p>
  )
}


const Course =({course}) => {
    return (
        <div>
          <Header title={course.name} />
          <Content course={course.parts}/>
          <Total parts={course.parts} />
        </div>
      )
}

export default Course