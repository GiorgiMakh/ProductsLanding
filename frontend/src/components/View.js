import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function View(){
    let { id } = useParams();
    const [data, setData] = useState({});

    useEffect(()=>{
        axios.get(`http://localhost:3001/api/product/${id}`).then((res)=>{
            setData(res.data)
        })
    }, [])

    return (
        <div>
            <main>
                <section className="py-2 text-center container">
                    <div className="row py-lg-4">
                        <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light">Example Product page</h1>
                        <p className="lead text-body-secondary">Text Here <Link to={'/'}>Back to Homepage</Link></p>
                        </div>
                    </div>
                </section>
                <div className="container">
                    <div className="card mb-6">
                        <div className="row g-1">
                            <div className="col-md-4">
                                <img src={data.imageAddress} className="img-fluid rounded-start" alt="Placeholder" />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">$ {data.price}</h5>
                                    <p className="card-text">{data.description}</p>                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}