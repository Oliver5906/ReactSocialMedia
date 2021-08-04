import React from 'react'
import Link from 'next/link'

export const getStaticPaths = async () => {
    const res = await fetch("https://posts-61bb3-default-rtdb.firebaseio.com/posts.json")
    var data = await res.json()

    const paths = []

    for (const key in data) {
        paths.push({params: {id : data[key].id.toString() }});
      }
    return {
        paths, fallback:false
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id
    const res2 = await fetch("https://posts-61bb3-default-rtdb.firebaseio.com/posts.json")
    var data2 = await res2.json()

    const Alldata = []

    for (const key in data2) {
        if(data2[key].id === id) Alldata.push(key)
      }

      const res = await fetch(`https://posts-61bb3-default-rtdb.firebaseio.com/posts/${Alldata[0]}.json`)
    var data = await res.json()
    return {
        props: {post: data}
    }
}

const Id = ({ post }) => {
    return (
        <div className="container">
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
          <Link href="/"><a className="nav-link active" aria-current="page" >Home</a></Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
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
                      <div className="d-flex flex-row align-items-center"> <img src={post.image} width="50" className="rounded-circle" />
                          <div className="d-flex flex-column ml-2"> <span className="font-weight-bold">{post.name}</span> </div>
                      </div>
                      <div className="d-flex flex-row mt-1 ellipsis"> <small className="mr-2">{post.time}</small>   
                       </div>
                  </div> 
                  <div className="p-2">
                      <p className="text-justify text-center">{post.text}</p>
                      <hr />

                  </div>
              </div>
          </div>
      </div>
  </div>
      </main>
      </div>
    )
}
export default Id