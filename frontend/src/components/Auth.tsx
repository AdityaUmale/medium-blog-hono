import { SignupInput } from "@aditya17/random123";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({type}: {type: "Signup" | "Signin"}) => {
    const navigate = useNavigate();
    const [ postInputs, setPostInputs ] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""

    });

       async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "Signup" ? "signup" : "signin"}`);
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs"); 
        } catch(e) {

        }
       }

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
            <div className="px-10">
                <div className="text-3xl font-extrabold">
                    Create an account
                </div>
                <div className="text-slate-400">
                        Already have an account? 
                        <Link className="pl-2 underline" to={type === "Signin" ? "/signup" : "/signin"}>{type === "Signin" ? "Sign up" : "Sign in"}</Link>
                    </div>
            </div>
            <div className="pt-8">
                {type === "Signup" ? <LabelledInput label="Name" placeholder="aditya" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        name: e.target.value
                    })
                }} /> : null } 
                <LabelledInput label="username" placeholder="aditya@gmail.com" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        username: e.target.value
                    })
                }} />
                <LabelledInput label="Password" type={"password"} placeholder="aditya" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        password: e.target.value
                    })
                }} />
                <button onClick={sendRequest} type="button" className=" mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "Signup" ? "Sign up" : "Sign in" }</button>
            </div>
        </div>
        </div>

    </div>
}

interface LabelledInputType{

    label : string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type? : string

}
function LabelledInput({label, placeholder, onChange, type}: LabelledInputType){
    return <div>
         <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
    </div>
}
export default Auth