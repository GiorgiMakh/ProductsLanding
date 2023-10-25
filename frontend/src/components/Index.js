import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function Index(){
    const [product, setProduct] = useState([]);

    useEffect( ()=>{
        axios.get('http://localhost:3001/api/products')
            .then( (res)=> {
                setProduct(res.data)
            })
    }, []);

    function DeleteAll(e){
        e.preventDefault();
        axios.delete('http://localhost:3001/api/products')
        setProduct([])
    }

    function Delete(e, id, index){
        e.preventDefault()
        axios.delete(`http://localhost:3001/api/product/${id}`)
        const updatedItems = product.filter((item, itemindex) => itemindex !== index);
        setProduct(updatedItems)
    }

    function renderProduct(){
        return product.map(({ _id, imageAddress, price, description }, index) => (
            <div key={index} className="col">
                <div className="card shadow-sm">
                <img className="bd-placeholder-img card-img-top" width="100%" height="225" src={`${imageAddress}`} alt="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false" />
                <div className="card-body">
                    <p className="card-text price">${price}</p>
                    <p className="card-text">{description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                        <Link to={`/product/${_id}`} className="btn btn-sm btn-outline-secondary">View</Link>
                        <Link to={`/edit/${_id}`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                        <button onClick={e => Delete(e, _id, index)} className="btn btn-sm btn-outline-danger">Delete</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        ))
    };

    return (
        <div>
           <main>
            <section className="py-2 text-center container">
                <div className="row py-lg-4">
                    <div className="col-lg-6 col-md-8 mx-auto">
                    <h1 className="fw-light">Product Landing Page Example</h1>
                    <p className="lead text-body-secondary">Text Here</p>
                    <p className="btn-group">
                        <Link to={'/add'} className="btn btn-outline-success my-2">Add</Link>
                        <button onClick={DeleteAll} className="btn btn-outline-danger my-2">Delete All</button>
                    </p>
                    </div>
                </div>
            </section>
                <div className="py-5 bg-body-tertiary">
                    <div className="container">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {renderProduct()}
                        </div>
                    </div>
                </div>
            </main>
            <footer className="my-5 pt-5 text-body-secondary text-center text-small">
                <p className="mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                    {' '}
                    <Link to={'https://github.com/GiorgiMakh'}>GiorgiMakh</Link>
                </p>
            </footer>
        </div>
    )
}