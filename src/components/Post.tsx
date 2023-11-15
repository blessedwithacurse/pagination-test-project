import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useQuery,
} from '@tanstack/react-query'
import { PostType } from '../types/post'

const fetchPost = async (postId: string | undefined): Promise<PostType> => {
  try {
    const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    if (!post.ok) {
      throw new Error(`Failed to fetch post (status ${post.status})`);
    }
    return post.json()
  } catch(e) {
    console.error(e)
    throw new Error ('something went wrong') 
  }
}
export default function Post() {

  const navigate = useNavigate()
  const params = useParams<{postId: string}>()

  const { isPending, error, data } = useQuery({
    queryKey: ['post', params.postId],
    queryFn: () => fetchPost(params.postId),
    enabled: !!params.postId
  })
  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  const navigateToListOfPosts = () => {
    navigate('/')
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