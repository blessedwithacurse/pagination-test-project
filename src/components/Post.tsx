import * as React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Post() {

  const location = useLocation()
  const navigate = useNavigate()

  const data = location.state

  const navigateToListOfPosts = () => {
    navigate('/');
  };
  
  return(
    <React.Fragment>
       <button onClick={navigateToListOfPosts}>
        Back
      </button>
      <h2>{data ? data.title : 'Title'}</h2>
      <p>{data ? data.body : 'Body Paragraph'}</p>
    </React.Fragment>
  )
}