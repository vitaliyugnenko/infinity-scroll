import React, { useState, useRef, useCallback, useEffect } from "react";
import useSearch from "./search";

export default function App() {
  const [count, upCount] = useState(0);
  const { posts } = useSearch(0, count);

  useEffect(() => {
    upCount(count + 5);
  }, []);

  const observer = useRef();
  const lastPostRef = useCallback(
    (post) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            upCount(count + 5);
          }
        },
        { threshold: 1.0 }
      );
      if (post) {
        observer.current.observe(post);
      }
    },
    [count]
  );

  return (
    <div className='App'>
      {posts.length > 0 &&
        posts.map((item, index) => {
          if (posts.length === index + 1) {
            return (
              <div className='post' ref={lastPostRef} key={item.vin || index}>
                <div className='post-number'>{index + 1}</div>
                <div>{item.car_make}</div>
                <div>{item.car_model}</div>
                <div>{item.color}</div>
                <div>{item.year}</div>
                <div>{item.vin}</div>
              </div>
            );
          } else {
            return (
              <div className='post' key={item.vin || index}>
                <div className='post-number'>{index + 1}</div>
                <div>{item.car_make}</div>
                <div>{item.car_model}</div>
                <div>{item.color}</div>
                <div>{item.year}</div>
                <div>{item.vin}</div>
              </div>
            );
          }
        })}
    </div>
  );
}
