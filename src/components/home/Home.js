import React, { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import axios from "axios";
import FolderIcon from "@mui/icons-material/Folder";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Audio, Hourglass } from "react-loader-spinner";

const Home = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [list, setList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  let email = localStorage.getItem("email");

  const deleteHandler = async (i) => {
    // const data = [...list];
    // data.splice(i,1);
    // setList(data);
    let url = "http://localhost:5000/todos";
   
    try{
      await axios.delete(url + "/" + i);
    }
    catch(err){
      setError(true);
      console.log(err.message);
      return;
    }

    setError(false);
    let copyArr = [...list];
    let arr = copyArr.filter((item)=>item.id!==i);
    setList(arr);
    console.log("copyArr",copyArr);
    
  };
  const submitHandler = async (e) => {
    e.preventDefault();
   
    let url = "http://localhost:5000/todos";

    let body = {
      title: title,
      des: desc,
      email: email,
    };

    try {
      await axios.post(url, body);
      // throw new Error();
    } catch (error) {
      // toast.error("difficulty in adding todo . please try again ")
      setError(true);
      console.log(error.message);
      return;
    }
    setError(false)
    setList([...list, body]);
    setDesc("");
    setTitle("");
  };

  const toLoadData = async () => {
    const data = await axios.get("http://localhost:5000/todos");
    console.log("data", data.data);
    console.log("email",email);

    const temp = data.data.filter((d) => {
      return d.email === email;
    });
    setList(temp);
  };
  useEffect(() => {
    toLoadData();
    setLoading(false);
  }, []);

  let renderResult = <h1>NO task availble</h1>;
  if (list.length > 0) {
    renderResult = list.map((d, i) => {
      return (
        <li key={d.id} className="flex items-center justify-between">
          <div className="flex justify-start items-center gap-10 w-3/4">
            <FolderIcon />
            <div className=" items-center  mb-5 ">
              <h2 className=" text-2xl font-semibold">{d.title}</h2>
              <p className=" text-lg font-semibold">{d.des}</p>
            </div>
          </div>
          <button
            onClick={() => {
              deleteHandler(d.id);
            }}
            className=" bg-emerald-200 text-black px-4 py-2 rounded mr-10"
          >
            delete
          </button>
        </li>
      );
    });
  }

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#306cce", "#72a1ed"]}
          />
        </div>
      ) : (
        <>
          <Navbar></Navbar>

          <form className=" flex justify-center" onSubmit={submitHandler}>
            <input
              type="text"
              className=" text-2xl border-zinc-800 border-2 m-5"
              placeholder="title here"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />

            <input
              type="text"
              className=" text-2xl border-zinc-800 border-2 m-5"
              placeholder="desc here"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />

            <button className=" bg-black text-white text-2xl px-4 py-2 font-bold rounded m-5">
              {" "}
              click me
            </button>
          </form>

          {
            isError && <h1 className=" text-center text-red-700 text-2xl">Error in adding todo. refresh again</h1>

          }
          <hr />
          <div className=" p-5 bg-slate-100 mx-28">
            <ul>{renderResult}</ul>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
