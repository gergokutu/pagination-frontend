import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Posts from './components/Posts';
import Pagination from './components/Pagination';

function App() {
  const [ posts, setPosts ] = useState([])
  const [ loading, setLoading ] = useState(false)
  const [ currentPage, setCurrentPage ] = useState(1)
  const [ postsPerPage, setPostsPerPage ] = useState(10)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const res = await Axios.get('https://jsonplaceholder.typicode.com/posts')
      setPosts(res.data)
      setLoading(false)
    }

    fetchPosts()
  // [] » in order to only run it 1x when it mounts
  // not to have a infinite loop
  }, [])

  // get current post
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  return (
    <div className='container mt-5'>
      <h1 className='text-primary mb-3'>My Blog</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} />
    </div>
  );
}

export default App;
