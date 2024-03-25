
import Appbar from '../components/Appbar'
import BlogCard from '../components/BlogCard';
import BlogSkeleton from '../components/BlogSkeleton';
import {useBlogs} from '../hooks'


const BlogBulk = () => {
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

{ blogs && blogs.map((blog)=>
(<BlogCard authorName={blog.author.name || "Anonymous"} title={blog.title} content={blog.content} id={blog.id} createdAt={blog.createdAt}/>))  }
{}
</div>
  )
}

export default BlogBulk;

