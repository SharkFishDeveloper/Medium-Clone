
import { useEffect } from 'react';
import Appbar from '../components/Appbar'
import BlogCard from '../components/BlogCard';
import BlogSkeleton from '../components/BlogSkeleton';
import {useBlogs} from '../hooks'


const BlogBulk = () => {
  const token = localStorage.getItem("token");

  const {loading,blogs} = useBlogs();
  if(loading){
    return (<>
        
    <BlogSkeleton/>
    <br />
    <BlogSkeleton/>
    <br />
    <BlogSkeleton/></>)
  }
  return (
    <div className="flex-col justify-center ">
    <Appbar/>
    {!localStorage.getItem("token") && (
       <div className="flex justify-center items-center h-screen bg-gray-100">
       <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm mx-auto text-center">
         <h2 className="text-2xl font-bold mb-4 text-gray-900">You’re Not Signed In</h2>
         <p className="text-gray-700 mb-6">
           To access this content, please sign in to your account. If you don’t have an account, you can create one easily.
         </p>
       </div>
     </div>
    )}
{ blogs && blogs.map((blog,i)=>
(<BlogCard key={i} authorName={blog.author.name || "Anonymous"} title={blog.title} content={blog.content} id={blog.id} createdAt={blog.createdAt}/>))  }
{ blogs?.length==0 && (
   (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto text-center">
        <svg
          className="w-16 h-16 text-gray-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 16h8M8 12h8m-8-4h8m-4 12a9 9 0 110-18 9 9 0 010 18z"
          ></path>
        </svg>
        <h2 className="text-2xl font-bold mb-2">No Blogs Available</h2>
        <p className="text-gray-600 mb-4">
          It looks like there are no blogs available at the moment. Please check back later or write your own!
        </p>
      </div>
    </div>
   )
)}
</div>
  )
}

export default BlogBulk;

