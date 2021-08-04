import React,{ useState,useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Login = () => {
    const [Perror,setPerror] = useState(false)
    const [Nerror,setNerror] = useState(false)
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const router = useRouter()
    const submit = async () => {
        const response = await fetch(
            'https://data-621f9-default-rtdb.firebaseio.com/users.json'
          );
      
          const responseData = await response.json();
          var o = false
          var o2 = false
          for (const key in responseData) {
            if(responseData[key].name === name) {
                o = true
                if(responseData[key].password === password) {
                    o2 = true
                }
            }
          }
          if(!o) return setNerror("Name Is Not Found")
          if(!o2) return setPerror("Password Is Not Correct")
          localStorage.setItem("name",name)
          localStorage.setItem("password",password)
          router.push("/")
    }
    const check = async () => {
        const response = await fetch(
          'https://data-621f9-default-rtdb.firebaseio.com/users.json'
        );
    
        const responseData = await response.json();
    
        var loadedMeals2 = [];
    
        for (const key in responseData) {
            if(responseData[key].name === localStorage.getItem("name")){
          loadedMeals2.push({
            name: responseData[key].name,
            password: responseData[key].password,
            image: responseData[key].image
          });
        }
        }
    
        if(localStorage.getItem("name")){
          if(localStorage.getItem("password")){
              if(localStorage.getItem("name") === loadedMeals2[0].name){
                if(localStorage.getItem("password") === loadedMeals2[0].password){
                    router.push("/")
                }else{
                  localStorage.clear()
                }
              }else{
                localStorage.clear()
              }
          }else{
            localStorage.clear()
          }
        }else{
          localStorage.clear()
        }
      }
    
    useEffect(() => {
      check()
    },[])
    
    return (
        <div className="container d">
            <Head>
                <title>Login</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
                </Head>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link href="/"><a className="nav-link active" aria-current="page" >Home</a></Link>
        </li>
        <li className="nav-item">
          <Link href="/login"><a className="nav-link f" aria-current="page" >Login</a></Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
<style jsx>{`
    @import "bourbon";
.d{
    margin-top: 18px;
}
.red{
    color:red;
}
`}</style>     

<br />

<h1 className="form-signin-heading">Login</h1>
<hr />
<input type="text" className="form-control" name="username" placeholder="Username" required="" autoFocus="" onChange={(event) => {setName(event.target.value);setNerror(false)}} value={name}/>
<p className="red">{!Nerror ? "" : Nerror}</p>
<input type="password" className="form-control" name="password" placeholder="Password" required="" onChange={(event) => {setPassword(event.target.value);setPerror(false)}} value={password}/>
<p className="red">{!Perror ? "" : Perror}</p>      

  <Link className="text-center" href="/register"><a className="text-center">Register</a></Link><br/>
  <p></p>      

  <div className="d-grid gap-2">
<button onClick={submit} className="btn btn-lg btn-primary btn-block" type="submit">Login</button>  
</div>
      </div>
    )
}

export default Login