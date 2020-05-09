import React, { useState, useEffect } from "react";
import { data } from "./data";

export default function useSearch(number, count) {
  const [posts, newPosts] = useState([0]);

  useEffect(() => {
    newPosts((prevPosts) => {
      return [...data.slice(number, count)];
    });
  }, [number, count]);

  return { posts };
}
