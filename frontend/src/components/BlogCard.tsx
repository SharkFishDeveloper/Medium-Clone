import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

interface BlogProps {
    authorName: string;
    title: string;
    content: string;
    createdAt: Date;
    id: string;
}


const BlogCard = ({authorName,title,content,createdAt,id}:BlogProps) => {
    const formattedDate = new Date(createdAt).toLocaleString();
  return (
    <Link to={`/api/v1/blog/${id}`}>
    <div className="  space-y-2 mb-4 w-[70%] mx-auto cursor-pointer">
          <div className="flex items-center space-x-2">
                <div className="text-xl font-bold  h-[3rem] w-[5rem] bg-gray-600 text-white rounded-lg flex justify-center items-center p-3">
                    {authorName|| "Anonymous"}
                </div>
                <Circle />
                <span className="text-gray-700">{formattedDate}</span>
            </div>
        <div className="text-4xl text-black font-sans font-bold">
            {title}
        </div>
        <div className="text-2xl text-gray-800 font-serif">
            {content.slice(0,100)+"..."}
        </div>

        <div className=" border-b-2 border-gray-200 space-y-1">
        <span className="text-gray-500">{Math.ceil(content.length/100) + " min read "}</span>
        </div>

    </div>
    </Link>
  )
}

export default BlogCard


export function Avatar({name, size = "small",blog }: { name: string, size?: "small" | "big",blog:boolean }) 
{   
    const navigator = useNavigate();
    const [nameS,setnames] = useState(name);
    const [logout,setLogout] = useState(false);
    useEffect(()=>{
        console.log(localStorage.getItem("token"));
        const resp = async()=>{
       try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/get`,{
            token:localStorage.getItem("token")
        });
        console.log(response.data.message);
        setnames(response.data.message.name);
       } catch (error) {
        console.log();
       }
    }
    resp();
    },[logout])


    return <>
    <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-8 h-8" : "w-10 h-10 cursor-pointer"}`}>
    <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
        {nameS ? (<p>
            {nameS[0]}
        </p>):<p onClick={()=>navigator("/signin")}>
        <p className="text-sm">Login</p>
        </p>}
    </span>
</div>
    {nameS && (<p className=" flex justify-end cursor-pointer hover:text-gray-600" onClick={()=>{
        localStorage.removeItem("token");
        setLogout(true);
    }}>{blog ? (<p>Logout</p>):""}</p>) }
    </>
}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">
        
    </div>
}