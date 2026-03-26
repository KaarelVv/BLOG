import { useState } from 'react'
import './App.css'
import PostCreate from './service/PostCreate'
import PostList from './service/PostList'

function App() {
  const [posts, setPosts] = useState([])

  const handlePostCreate = (post) => {
    setPosts((currentPosts) => [post, ...currentPosts])
  }

  return (
    <>
      <div className='container'>
        <h1>Create post</h1>
        <PostCreate onPostCreate={handlePostCreate} />
        <hr></hr>
        <h1>Posts</h1>
        <PostList posts={posts} setPosts={setPosts} />
      </div>
    </>
  )
}

export default App
