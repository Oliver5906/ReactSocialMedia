import React, { useState,useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'


export default function Home() {
  const router = useRouter()
  const [search,setSearch] = useState('')
  const [InviteUrl,setInviteUrl] = useState('')
  const [edit,setEdit] = useState('')
  const [ppppp,setPpppp] = useState(false)
  const [change,setChange] = useState(false)
  const [data,setData] = useState(false)
  const [Text,setText] = useState('')
  const [Login,isLogin] = useState(false)
  const [DmorAll,setDmorAll] = useState(false)
  const [DmData,setDmData] = useState(false)

  const check = async () => {
    const response = await fetch(
      'https://data-621f9-default-rtdb.firebaseio.com/users.json'
    );

    const responseData = await response.json();

    var loadedMeals2 = [];

    for (const key in responseData) {
      loadedMeals2.push({
        name: responseData[key].name,
        password: responseData[key].password,
        image: responseData[key].image
      });
    }

var m = false
for(var i = 0; i < loadedMeals2.length; i++){
    if(localStorage.getItem("name")){
      if(localStorage.getItem("password")){
          if(localStorage.getItem("name") === loadedMeals2[i].name){
            if(localStorage.getItem("password") === loadedMeals2[i].password){
              if(localStorage.getItem("image") === loadedMeals2[i].image){
                m = true
                isLogin(true)
              }else{
                m = true
                localStorage.setItem("image",loadedMeals2[i].image)
                isLogin(true)
              }
            }
          }
      }
    }
  }
  if(m === false) localStorage.clear()
}

useEffect(() => {
  check()
},[])


  const fetchMeals = async () => {
    const response = await fetch(
      'https://posts-61bb3-default-rtdb.firebaseio.com/posts.json'
    );

    const responseData = await response.json();

    var loadedMeals = [];

    for (const key in responseData) {
      loadedMeals.push({
        id: responseData[key].id,
        name: responseData[key].name,
        image: responseData[key].image,
        text: responseData[key].text,
        time: responseData[key].time
      });
    }
    const f = loadedMeals.sort((a,b)=> 0.5-Math.random())
    setData(f);
  };


  const fetchDm = async () => {
    const resFollwers = await fetch("https://sunlit-amulet-315410-default-rtdb.firebaseio.com/follwers.json")
    const dat = await resFollwers.json()
    const allDate = []
    for(const k in dat){
      if(dat[k].follwer){
      if(dat[k].follwer.includes(localStorage.getItem("name"))){
        allDate.push(dat[k].name)
      }
    }
    }
    
    const response = await fetch(
      'https://posts-61bb3-default-rtdb.firebaseio.com/posts.json'
    );

    const responseData = await response.json();

    var loadedMeals = [];

    for (const key in responseData) {
      if(allDate.includes(responseData[key].name)){
      loadedMeals.push({
        id: responseData[key].id,
        name: responseData[key].name,
        image: responseData[key].image,
        text: responseData[key].text,
        time: responseData[key].time
      });
    }
    }
    // console.log(loadedMeals)
    const w = loadedMeals.sort((a,b)=> 0.5-Math.random())
    // console.log(w)
    setDmData(w)
  };

useEffect(() => {
  fetchMeals()
  fetchDm()
},[])

const copy = async (id) => {
  const response = await fetch(
    'https://posts-61bb3-default-rtdb.firebaseio.com/posts.json'
  );

  const responseData = await response.json();

  var loadedMeals = [];

  for (const key in responseData) {
    if(responseData[key].id === id){
      loadedMeals.push(responseData[key].text)
    }
  }
  const copyText = loadedMeals[0]
  var input = document.createElement("input");
  input.value = copyText;
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input); 
}

const GetInvite = (invite) => {
  setInviteUrl(invite)
  document.getElementById('id02').style.display='block'
}

const Save = async (id) => {
  const response = await fetch(
    'https://posts-61bb3-default-rtdb.firebaseio.com/posts.json'
  );

  const responseData = await response.json();

  for (const key in responseData) {
    if(responseData[key].id === id){
      await fetch(`https://posts-61bb3-default-rtdb.firebaseio.com/posts/${key}.json`, {
        method: 'DELETE'
      })
      await fetch('https://posts-61bb3-default-rtdb.firebaseio.com/posts.json', {
    method: 'POST',
    body: JSON.stringify({
      id: responseData[key].id,
      image: responseData[key].image,
      name: responseData[key].name,
      text: edit,
      time: responseData[key].time
    })
    });
    }
  }
  window.location.reload()
}

const CopyLinkUrl = () => {
  var CopyLinkUrl2 = document.getElementById("HjdgfbfgnfnBudsg78Jds9")
  CopyLinkUrl2.select();
  document.execCommand("copy");
}

const Delete = async (id) => {
  const response = await fetch(
    'https://posts-61bb3-default-rtdb.firebaseio.com/posts.json'
  );

  const responseData = await response.json();

  for (const key in responseData) {
    if(responseData[key].id === id){
      await fetch(`https://posts-61bb3-default-rtdb.firebaseio.com/posts/${key}.json`, {
      method: 'DELETE',
    });
    }
  }
  window.location.reload()
}

const AddPost = async () => {
  setText('')
  document.getElementById('id01').style.display='none'
  const date = new Date();
  var newformat = date.getHours() >= 12 ? 'PM' : 'AM'; 
  const deta2 = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} | ${date.getHours()}:${date.getMinutes()} | ${newformat}`
  var text = "";

  var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRStuvwxyz0123456789";

  for( var i=0; i < 40; i++ )
      text += charset.charAt(Math.floor(Math.random() * charset.length));

  await fetch('https://posts-61bb3-default-rtdb.firebaseio.com/posts.json', {
    method: 'POST',
    body: JSON.stringify({
      id: text,
      image: localStorage.getItem("image"),
      name: localStorage.getItem("name"),
      text: Text,
      time: deta2
    })
  });
  window.location.reload()
}
  return (
    <div className="container">
      <Head>
        <title>Home</title>
        </Head>
        <style jsx>{`
        .c49{
          width:49%
        }

body {font-family: Arial, Helvetica, sans-serif;}

/* Full-width input fields */
input[type=text], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

/* Set a style for all buttons */
button{
  border:1px solid black;
  margin: 1px;
}
/* Extra styles for the cancel button */
.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}

/* Center the image and position the close button */
.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
  position: relative;
}

img.avatar {
  width: 40%;
  border-radius: 50%;
}

.container {
  padding: 16px;
}

span.psw {
  float: right;
  padding-top: 16px;
}

/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  padding-top: 60px;
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button (x) */
.close {
  position: absolute;
  right: 25px;
  top: 0;
  color: #000;
  font-size: 35px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: red;
  cursor: pointer;
}

/* Add Zoom Animation */
.animate {
  -webkit-animation: animatezoom 0.6s;
  animation: animatezoom 0.6s
}

@-webkit-keyframes animatezoom {
  from {-webkit-transform: scale(0)} 
  to {-webkit-transform: scale(1)}
}
  
@keyframes animatezoom {
  from {transform: scale(0)} 
  to {transform: scale(1)}
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
     display: block;
     float: none;
  }
  .cancelbtn {
     width: 100%;
  }
}
.o{
  background-color:#f1f1f1
}
.oo{
  width: 49%
}
.active2{
  background-color:#dae0e5;
  border-color:#dae0e5;
}
.active2:active{
  background-color:#dae0e5;
  border-color:#dae0e5;
}
.active2:hover{
  background-color:#dae0e5;
  border-color:#dae0e5;
}
.mt-d{
  margin-top: 20px;
}
      `}</style>
<div id="id01" className="modal">
  
  <form className="modal-content animate" action="/action_page.php" method="post">
    <div className="imgcontainer">
      <span onClick={() => document.getElementById('id01').style.display='none'} className="close" title="Close Modal">&times;</span>
    </div>

    <div className="container">
      <label for="uname"><b>Enter Text:</b></label>
      <input type="text" placeholder="Enter Text" name="uname" required onChange={(event) => {setText(event.target.value)}} value={Text}/>

      <button type="submit" onClick={AddPost}>submit</button>
    </div>

    <div className="container o">
      <button type="button" onClick={() => document.getElementById('id01').style.display='none'} className="cancelbtn">Cancel</button>
    </div>
  </form>
</div>

<div id="id02" className="modal">
  
  <form className="modal-content animate" action="/action_page.php" method="post">
    <div className="imgcontainer">
      <span onClick={() => document.getElementById('id02').style.display='none'} className="close" title="Close Modal">&times;</span>
    </div>

    <div className="container">
      <input id="HjdgfbfgnfnBudsg78Jds9" type="text" placeholder="Enter Text" name="uname" required value={`http://localhost:3000/posts/${InviteUrl}`}/><button type="button" onClick={CopyLinkUrl} className="c49">Copy</button><Link href={`/posts/${InviteUrl}`}><button type="button" className="c49">Go</button></Link>
    </div>

    <div className="container o">
      <button type="button" onClick={() => document.getElementById('id02').style.display='none'} className="cancelbtn">Cancel</button>
    </div>
  </form>
</div>


      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link href="/"><a className="nav-link active2" aria-current="page" >Home</a></Link>
        </li>
        <li className="nav-item">
          <Link href={!Login ? "/login" : "/logout"}><a className="nav-link f" aria-current="page" >{!Login ? "Login" : "Logout"}</a></Link>
        </li>
        {!Login ? "" : 
        <li className="nav-item">
          <a onClick={() => document.getElementById('id01').style.display='block'} href="#" className="nav-link f" aria-current="page" >Add Post</a>
        </li>
        }
        {!Login ? "" : 
        <li className="nav-item">
          <Link href="/Profile"><a className="nav-link f" aria-current="page" >Profile</a></Link>
        </li>
        }
        <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(event) => setSearch(event.target.value)} required />
        <button className="btn btn-outline-success" onClick={() => router.push(`/user/${search}`)} type="button">Search</button>
      </form>
      </ul>
    </div>
  </div>
</nav>
<div className="Home">
<br />

<div>
          <h1>Home</h1>
          <hr />
          <button id="All" className="btn oo active2" onClick={() => {setDmorAll(false);document.getElementById("All").classList.add("active2");document.getElementById("Dm").classList.remove("active2")}}>All</button><button id="Dm" className="btn oo" onClick={() => {setDmorAll(true);document.getElementById("Dm").classList.add("active2");document.getElementById("All").classList.remove("active2")}}>Follow</button>
{!DmorAll ? !data ? <h1>Loding...</h1> : 
<div>
{data.map(d => 
  <main>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha1/dist/css/bootstrap.min.css" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha1/dist/js/bootstrap.bundle.min.js" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha1/dist/css/bootstrap.min.css" /> */}
      <div className="container mt-5 mb-5">
    <div className="row d-flex align-items-center justify-content-center">
        <div className="col-md-6">
            <div className="card">
                <div className="d-flex justify-content-between p-2 px-3">
                    <div className="d-flex flex-row align-items-center"> <img src={d.image} width="50" className="rounded-circle" />
                        <div className="d-flex flex-column ml-2"> <span className="font-weight-bold"><Link href={`/user/${d.name}`}><a>{d.name}</a></Link></span> </div>
                    </div>
                    <div className="d-flex flex-row mt-1 ellipsis"> <small className="mr-2">{d.time}</small> 
                    
                    
                    <li className="nav-item dropdown">
          <a id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="fa fa-ellipsis-h"></i>
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            {!Login ? "" : localStorage.getItem("name") != d.name ? "" : <div><li><a onClick={() => Delete(d.id)} className="dropdown-item" href="#">Delete</a></li></div>}
            {!Login ? "" : localStorage.getItem("name") != d.name ? "" : <div><li><a onClick={() => {setChange(true);setPpppp(d.id);setEdit(d.text);}} className="dropdown-item" href="#">Change</a></li><hr/></div>}
            <li><a onClick={() => copy(d.id)} className="dropdown-item" href="#">Copy</a></li>
            <li><a onClick={() => GetInvite(d.id)} className="dropdown-item" href="#">Share</a></li>
          </ul>
        </li>
                    
                     </div>
                </div> 
                <div className="p-2">
                    {!change ? <p className="text-justify">{d.text}</p> : d.id != ppppp ? <p className="text-justify">{d.text}</p> : <div><input value={edit} onChange={(event) => setEdit(event.target.value)} /><button onClick={() => {setChange(false);setPpppp(false);setEdit(false);}} className="bg-red">Cancel</button><button onClick={() => Save(d.id)}>Save</button></div>}
                    <hr />
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex flex-row muted-color"> <span className="ml-2">Share</span> </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    </main>
)}<h2 className="text-center">The End</h2></div> : !DmData ? <h1>Loding...</h1> : !DmData[0] ? <h1 className="text-center mt-d">You Don't Follwing Any Pepole</h1> :
<div>
{DmData.map(d => 
  <main>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha1/dist/css/bootstrap.min.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha1/dist/js/bootstrap.bundle.min.js" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
  {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha1/dist/css/bootstrap.min.css" /> */}
  <div className="container mt-5 mb-5">
<div className="row d-flex align-items-center justify-content-center">
    <div className="col-md-6">
        <div className="card">
            <div className="d-flex justify-content-between p-2 px-3">
                <div className="d-flex flex-row align-items-center"> <img src={d.image} width="50" className="rounded-circle" />
                    <div className="d-flex flex-column ml-2"> <span className="font-weight-bold"><Link href={`/user/${d.name}`}><a>{d.name}</a></Link></span> </div>
                </div>
                <div className="d-flex flex-row mt-1 ellipsis"> <small className="mr-2">{d.time}</small> 
                
                
                <li className="nav-item dropdown">
      <a id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <i className="fa fa-ellipsis-h"></i>
      </a>
      <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        {!Login ? "" : localStorage.getItem("name") != d.name ? "" : <div><li><a onClick={() => Delete(d.id)} className="dropdown-item" href="#">Delete</a></li></div>}
        {!Login ? "" : localStorage.getItem("name") != d.name ? "" : <div><li><a onClick={() => {setChange(true);setPpppp(d.id);setEdit(d.text);}} className="dropdown-item" href="#">Change</a></li><hr/></div>}
        <li><a onClick={() => copy(d.id)} className="dropdown-item" href="#">Copy</a></li>
        <li><a onClick={() => GetInvite(d.id)} className="dropdown-item" href="#">Share</a></li>
      </ul>
    </li>
                
                 </div>
            </div> 
            <div className="p-2">
                {!change ? <p className="text-justify">{d.text}</p> : d.id != ppppp ? <p className="text-justify">{d.text}</p> : <div><input value={edit} onChange={(event) => setEdit(event.target.value)} /><button onClick={() => {setChange(false);setPpppp(false);setEdit(false);}} className="bg-red">Cancel</button><button onClick={() => Save(d.id)}>Save</button></div>}
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-row muted-color"> <span className="ml-2">Share</span> </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</main>
  )}
  <h2 className="text-center">The End</h2>
  </div>

}
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
      </div>
</div>
    </div>
  )
}
