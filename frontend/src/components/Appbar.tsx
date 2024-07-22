
import { Avatar } from './BlogCard'
import { Link } from 'react-router-dom'

const Appbar = () => {

  return (
    <div className="flex justify-center p-4 ">
        <div className="flex justify-between w-[80%]  border-b-2">
           <div className='flex-row'>
           <p className="font-semibold text-xl underline-offset-8">Meta-blogs</p>
           <Link to={"/blogs"} className="text-gray-500 text-sm">Check all posts</Link>
           </div>
            <div>
            <Link to={`/publish`}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">New</button>
            </Link>
            <Avatar name= "" size={"big"} blog={true}/>
            </div>
        </div>
    </div>
  )
}

export default Appbar