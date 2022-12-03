import React from "react";
import "./Home.css"
import logo from "../../assets/osca-logo.png";
import {
    useNavigate
} from "react-router-dom";

const Home = () => {
    const navigate=useNavigate();
    return(
        <div>
            <section className="text-white-900 body-font pl-9">
                <div className="container  flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <h1 className="title-font sm:text-2xl text-5xl mb-4 font-medium text-white-900 text-indigo-500">Lab Access Control</h1>
                        <h4 className="sm:text-4xl text-2xl mb-5 font-medium text-white-900">Authentication is first priority!!</h4>
                        <div className="flex justify-center mt-16">
                            <button className="proceed inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none rounded text-lg w-50 animate__animated hover:animate__bounceIn"  onClick={()=>{navigate("/entry")}}>Proceed!!</button>
                        </div>
                    </div>
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-1/3 animate__animated animate__rotateIn">
                        <img className="object-cover object-center rounded" alt="hero" src={logo}/>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home;