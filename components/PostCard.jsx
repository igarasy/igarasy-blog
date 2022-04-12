import { AppProps } from 'next/app';
import React from 'react';
import moment from 'moment';
import Link from 'next/link';

const PostCard = ({ post }) => {
  console.log(post);
  return (
    <div className="mb-8 rounded-lg bg-white p-0 pb-12 shadow-lg lg:p-8">
      <div className="relative mb-6 overflow-hidden pb-80 shadow-md">
        {/*   <img
          src={post.featuredImage.url}
          alt={post.title}
          className-="object-top absolute h-80 w-full object-cocver
           shadow-lg ronded-t-lg lg:rounded-lg"
        /> */}
      </div>
    </div>
  );
};

export default PostCard;
