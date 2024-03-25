
import {useBlog} from '../hooks'
import { FullBlog } from '../components/CompleteBlog';
import { useParams } from 'react-router-dom';
import SingleBlogSkeleton from '../components/SingleBlogSkeleton';

const Blog = () => {
  const {id} = useParams();
  const {loading,blog} = useBlog({id});
  if(loading){
    return (<SingleBlogSkeleton/>)
  }
  console.log(blog);
  return (
    <div>
      {blog && (<FullBlog blog={blog}/>)}
    </div>
  )
}

export default Blog