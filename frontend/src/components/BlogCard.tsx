import { Link } from "react-router-dom";

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
                <Avatar name={authorName} />
                <p>{authorName}</p>
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


export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
    <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
        {name[0]}
    </span>
</div>
}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}