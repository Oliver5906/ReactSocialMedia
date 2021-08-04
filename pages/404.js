import React,{ useEffect } from 'react'
import { useRouter } from 'next/router'

const Error = () => {
    const router = useRouter()
    useEffect(()=> {
        setTimeout(() => {
            router.push("/")
        },10000)
    },[])
    return (
        <div>
        <style jsx>{`
        .Center {
            text-align:center;
            margin-top: 80px;
        }
        .Center2 {
            text-align:center;
            margin-top: 5px;
            font-size:20px;
        }
      `}</style>
            <h1 className="Center">Error 404</h1>
            <h2 className="Center2">This Page Is Not Found</h2>
        </div>
    )
}

export default Error