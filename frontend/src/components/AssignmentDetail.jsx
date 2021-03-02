import React from 'react'

export default function AssignmentDetail(props) {

  const { content, submitDate, authors } = props;
  
  return (
    <div>
      {content}
      {authors.map(author => <div className="assignment-authors">{author.fname} {author.lname}</div>)}
      Submitted on: {submitDate}
    </div>
  )
}