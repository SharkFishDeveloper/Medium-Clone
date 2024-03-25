import { useParams } from "react-router-dom"
import Appbar from "./Appbar"
import { Avatar } from "./BlogCard"
import {BlogInterface} from "../hooks/index"

export const FullBlog = ({ blog }: {blog: BlogInterface}) => {
    const formattedDate = new Date(blog.createdAt).toLocaleString();
    const {id} = useParams();
    console.log("id params",id)
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
                <div className="col-span-7 text-wrap space-y-4">
                    <div className="text-5xl font-extrabold">
                        <p className="text-wrap">{blog.title.charAt(0).toUpperCase()+blog.title.slice(1)}</p>
                    </div>
                    <div className="text-slate-500 pt-2">
                        {formattedDate}
                    </div>
                    <div className="pt-4">
                    {blog.content.charAt(0).toUpperCase()+blog.content.slice(1)}
                    </div>
                </div>
                <div className="col-span-5">
                    <div className="text-slate-600 text-lg">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar size="big" name={blog.author.name || "Anonymous"} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Random catch phrase about the author's ability to grab the user's attention
                            </div>
                        </div>
                    </div>  
                </div>
                
            </div>
        </div>
    </div>
    
}