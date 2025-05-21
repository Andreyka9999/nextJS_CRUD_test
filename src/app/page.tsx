'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import PostForm from "./PostForm";

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editPost, setEditPost] = useState<Post | null>(null);

  // Get the posts number
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  // add or refresh the post
  const handleSubmit = async (title: string, body: string, id?: number) => {
    if (id) {
      // UPDATE
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body }),
      });
      const updatedPost = await res.json();
      setPosts(posts.map(p => (p.id === id ? { ...p, ...updatedPost } : p)));
    } else {
      // CREATE
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body }),
      });
      const newPost = await res.json();
      setPosts([newPost, ...posts]);
    }
    setShowForm(false);
    setEditPost(null);
  };

  // Delete the post
  const handleDelete = async (id: number) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    });
    setPosts(posts.filter(post => post.id !== id));
  };

  // Open the form for edditing
  const handleEdit = (post: Post) => {
    setEditPost(post);
    setShowForm(true);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl mb-4">Posts</h1>
      <Button onClick={() => { setShowForm(true); setEditPost(null); }}>Create Post</Button>
      {showForm && (
        <PostForm
          onSubmit={handleSubmit}
          onCancel={() => { setShowForm(false); setEditPost(null); }}
          initialTitle={editPost?.title}
          initialBody={editPost?.body}
          id={editPost?.id}
        />
      )}
      <ul className="mt-6 space-y-4">
        {posts.map(post => (
          <li key={post.id} className="border rounded-lg p-4 shadow flex flex-col gap-2">
            <div>
              <h2 className="text-lg font-bold">{post.title}</h2>
              <p>{post.body}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleEdit(post)}>Edit</Button>
              <Button variant="destructive" onClick={() => handleDelete(post.id)}>Delete</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
