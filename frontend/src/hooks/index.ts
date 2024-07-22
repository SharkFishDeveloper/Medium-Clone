
import axios from 'axios';
import  { useEffect, useState } from 'react'
import { BACKEND_URL } from '../config';

export interface BlogInterface{
    "content": string,
    "title": string,
    "id": string,
    "author": {
        "name": string
    },
    "createdAt":Date
  }
  

export const useBlogs = () => {
    const id = localStorage.getItem("token");
    console.log("id of user ",id);

    const [loading,setLoading] = useState(false);
    const [blogs,setBlogs] = useState<BlogInterface[]|null>(null);

    useEffect(()=>{
        setLoading(true);
        if (!id) {
          setLoading(false);
          return;
        }
        const getblogs = async()=>{
           try {
            const ans = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{headers:{
                Authorization:id
            }});
            setBlogs(ans.data.message);
            console.log(ans.data.message);
           } catch (error) {
            console.log(error);
           }finally{
            setLoading(false);
           }
        };
        getblogs();
    },[id])

  return {
    loading,
    blogs
  }
}


export const useBlog = ({id}:{id:string|undefined}) => {
    const idc = localStorage.getItem("token");
    console.log("id of user ",id);
    const [loading,setLoading] = useState(false);
    const [blog,setBlog] = useState<BlogInterface>();
    // if(!idc){
    //   return alert("Please sign in");

    // }
    useEffect(()=>{
        setLoading(true);

        const getblogs = async()=>{
           try {
            const ans = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{headers:{
                Authorization:idc
            }});
            setBlog(ans.data.message);
            console.log(ans.data.message);
           } catch (error) {
            console.log(error);
           }finally{
            setLoading(false);
           }
        };
        getblogs();
    },[idc])

  return {
    loading,
    blog
  }
}
