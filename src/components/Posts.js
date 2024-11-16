import React, { useState, useEffect } from 'react';
import api from '../api';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await api.get('posts/');
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const newPost = { title, content };
    const response = await api.post('posts/', newPost);
    setPosts([...posts, response.data]);
    setTitle('');
    setContent('');
  };

  return (
    <div>
      <h2>Посты</h2>
      <form onSubmit={handleCreate}>
        <input
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Контент"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Создать</button>
      </form>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;