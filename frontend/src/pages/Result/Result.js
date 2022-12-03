import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

import axios from "axios";

import "./Result.css";

const Resultpage = () => {
  const [myData, setMyData] = useState([]);
  const [error, setError] = useState("");

  const [ name, setName ] = useState("");
  const [ registraion, setRegistraion ] = useState("");
  const [ authorities, setAuthorities ] = useState("");

  const location = useLocation();
  const image = location.state.image;
  const lab = location.state.lab;

  console.log(image);
  console.log(lab);

  const dataURLtoBlob = (dataurl) => {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}
  const getMyPostData = async () => {
    // setName("Sarvajeet Chavan");
    // setRegistraion("2020BCS512");
    // setAuthorities("Enter, Use PC");
    try {
      let data = new FormData();
      data.append('image', dataURLtoBlob(image), 'photo.jpg');
      data.append('lab', lab);
      const res = await axios.post('http://127.0.0.1:8000/scan/', data, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        }
      });
      if(res.data.status == "success"){
        setName(res.data.name);
        setRegistraion(res.data.registration);
        setAuthorities(res.data.authorities);
      }else{
        if(res.data.error == "FACENOTFOUND"){
          setError("Face not detected in the image. Please try again.");
        }else if(res.data.error == "NORECORDFOUND"){
          setError("Face not matched with any record. Person dont have any authorities.");
        }else{
          setError("Please try again.");
        }
      }
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  

  // NOTE:  calling the function
  useEffect(async () => {
    await getMyPostData();
    console.log(name);
  }, []);

  return (
    <>
      <div className="flex flex-col text-center w-full mt-8">
        <h2 className="text-xl text-indigo-500 tracking-widest font-medium title-font mb-1">Lab Access Control</h2>
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white  ">Check for authorities!!</h1>
      </div>

      {error !== "" && <h2>{error}</h2>}

      { !name ? 
        <h1>Loading...</h1>
      :
      <div className="grid">
          <div className="card">
            <h1></h1>
            <h2>Name : {name}</h2>
            <h2>Regisatration Number : {registraion}</h2>
            <h2>Authorities in {lab}:</h2>
            <ui>{authorities.split(",").map((authority) => {
              return <li>{authority}</li>;
            })}</ui>
          </div>
      </div>}
    </>
  );
};


export default Resultpage;