import './App.css'
import { Routes, Route } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Post from './components/Post'
import ListOfPosts from './components/ListOfPosts'

const queryClient = new QueryClient()

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<ListOfPosts />} />
          <Route path="/post" element={<Post />} />
        </Routes>
      </QueryClientProvider>
    </>
  )
}

export default App
