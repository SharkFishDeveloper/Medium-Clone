import axios from 'axios'
import { SignupInput } from 'overlordzeroking-common-medium'
import  { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { BACKEND_URL } from '../config'
import { useNavigate } from 'react-router-dom'

interface loginMethod {
    type:"signup"|"signin"
}

const Auth = ({type}:loginMethod) => {
    const navigate = useNavigate();
    const [postInputs,setPostInputs] = useState<SignupInput>({
        email:"",
        password:"",
        name:""
    })

    async function sendRequest(){
       try {
        console.log("reques to ",`${BACKEND_URL}/api/v1/user/${type ==="signin"?"signin":"signup"}`);
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type ==="signin"?"signin":"signup"}`,postInputs,{withCredentials:true}
        );
        localStorage.setItem("token",`Bearer ${response.data.message}`);
        alert(`Signup successfull`);
        navigate("/blogs");
       } catch (error) {
        //ts-expect-error
        alert("Authentication error");
       }
    }


  return (
    <div className="flex justify-center items-center flex-col h-screen">
        <div className="flex-col my-auto space-y-4">
            <p className="text-4xl font-bold">{type==="signin"?"Sign in your account":"Create an account "}</p>
            <span className="flex flex-row  space-x-1">
                {type==="signin"?(<p>Dont have an account ?</p>):(<p>Already have an account ?</p>)}
            <Link to={type==="signin"?"/signup":"/signin"}><p className="text-blue-400 underline"> {type ==="signin"?"Signup":"Signin"}</p></Link></span>

            <div className=" w-full">
            { 
            type ==="signup" && 
            (   
            <LabelledInput label='Name' placeholder='Enter name' onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    name:e.target.value
                })
            }}/>
            )
            }
            <LabelledInput label='Email' placeholder='Enter email' onChange={(e)=>{
                    setPostInputs({
                        ...postInputs,
                        email:e.target.value
                    })
            }}/>
            <LabelledInput label='Password' placeholder='Enter password' onChange={(e)=>{
                    setPostInputs({
                        ...postInputs,
                        password:e.target.value
                    })
            }}/>
            <button className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700  dark:border-gray-700"
            onClick={sendRequest}
            
            >{type === "signin" ? "Signin":"Signup"}</button>
            </div>
        </div>
    </div>
  )
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}

export default Auth