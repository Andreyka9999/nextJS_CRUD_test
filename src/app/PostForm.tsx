'use client';

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  onSubmit: (title: string, body: string, id?: number) => void;
  onCancel: () => void;
  initialTitle?: string;
  initialBody?: string;
  id?: number;
};

export default function PostForm({ onSubmit, onCancel, initialTitle = "", initialBody = "", id }: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);

  useEffect(() => {
    setTitle(initialTitle);
    setBody(initialBody);
  }, [initialTitle, initialBody]);

  return (
    <form
      className="p-4 border rounded-lg my-4 bg-gray-50"
      onSubmit={e => {
        e.preventDefault();
        onSubmit(title, body, id);
      }}
    >
      <div>
        <Input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="mb-2"
        />
      </div>
      <div>
        <Input
          placeholder="Body"
          value={body}
          onChange={e => setBody(e.target.value)}
          className="mb-2"
        />
      </div>
      <div className="flex gap-2">
        <Button type="submit">{id ? "Update" : "Save"}</Button>
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}
