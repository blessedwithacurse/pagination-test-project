import * as React from 'react'
import {
  useQuery,
} from '@tanstack/react-query'
import Pagination from '../components/Pagination'
import { Link } from 'react-router-dom'
import '../styles/ListOfPosts.scss'

export default function ListOfPosts() {
  let PageSize = 10
  const [currentPage, setCurrentPage] = React.useState(1)
  const { isPending, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json()
      ),
  })
  const currentTableData = React.useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data?.slice(firstPageIndex, lastPageIndex)
  }, [currentPage]);

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return(
    <div className="container">
      <h1>Posts</h1>
      <ul className='ordered-list'>
        {currentTableData?.map((post: any) =>
        <li 
          className="list"
          key={post.id} 
        >
          <Link 
              className='list-item'
              to='/post'
              state={post}
              >{post.title}
          </Link>
        </li>)}
      </ul>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </div>
  )
}
