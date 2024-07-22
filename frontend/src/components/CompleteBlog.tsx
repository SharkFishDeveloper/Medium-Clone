import { useParams } from "react-router-dom"
import Appbar from "./Appbar"
import {BlogInterface} from "../hooks/index"

export const FullBlog = ({ blog }: {blog: BlogInterface}) => {
    const formattedDate = new Date(blog.createdAt).toLocaleString();
    const {id} = useParams();
    console.log("id params",id)
    return <div>
        <Appbar />
        <div className="flex justify-center py-12">
  <div className="grid grid-cols-12 gap-8 max-w-screen-xl px-6 sm:px-8 lg:px-10">
    <div className="col-span-12 lg:col-span-7 space-y-6">
      <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900">
        {blog.title.charAt(0).toUpperCase() + blog.title.slice(1)}
      </h1>
      <div className="text-slate-500 text-base sm:text-lg">
        {formattedDate}
      </div>
      <div className="text-base sm:text-lg text-gray-800">
        {blog.content.charAt(0).toUpperCase() + blog.content.slice(1)}
      </div>
    </div>
    <div className="col-span-12 lg:col-span-5 space-y-4">
      <div className="text-slate-600 text-lg font-semibold">
        Author
      </div>
      <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-md">
        <div className="flex-shrink-0">
          <div className="bg-gray-500 text-white rounded-full h-16 w-16 flex items-center justify-center text-xl font-bold">
            {blog.author.name ? blog.author.name.charAt(0) : "A"}
          </div>
        </div>
        <div>
          <div className="text-xl font-bold text-gray-900">
            {blog.author.name || "Anonymous"}
          </div>
          <div className="pt-1 text-slate-500">
            A random catchphrase about the author's ability to grab the user's attention
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
    
}