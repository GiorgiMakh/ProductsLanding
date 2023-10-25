import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Edit(){
    let { id } = useParams();
    const navigate = useNavigate();
    const [preview, setPreview] = useState(null);
    const [image, setImage] = useState(null);
    const [oldimage, setOldimage] = useState(null);
    const [input, setInput] = useState({
        price:"",
        description:""
    });

    useEffect(()=>{
        axios.get(`http://localhost:3001/api/product/${id}`).then((res)=>{
            setInput(res.data)
            setOldimage(res.data.imageAddress)
            setPreview(res.data.imageAddress)
        })
    },[id])

    function handleImageChange(e) {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            setPreview(URL.createObjectURL(selectedImage));
            setImage(selectedImage)
        }
    }

    function handleChange(event) {
        const {name, value} = event.target;

        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
    };

    function handleSubmit(e) {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('image', image);
        formData.append('oldimage', oldimage)
        formData.append('price', input.price);
        formData.append('description', input.description);
    
        axios.put(`http://localhost:3001/api/product/${id}`, formData )
        navigate("/");
      };


    return (
        <div>
            <div className="container">
                <main>
                    <div className="py-5 text-center">
                    <h2>Add Product</h2>
                    <p className="lead">Text Here <Link to={'/'}>Back to Homepage</Link></p>
                    </div>

                    <div className="row g-5">
                        <div className="col-md-5 col-lg-4 order-md-last">
                            {preview && (
                                <div>
                                    <img src={preview} alt="Preview" style={{ maxWidth: '300px' }} />
                                </div>
                            )}
                        </div>
                        <div className="col-md-7 col-lg-8">
                            <form className="needs-validation" onSubmit={handleSubmit}>
                                <div className="input-group mb-3">
                                    <input onChange={handleImageChange} type="file" className="form-control" id="ImageFile" accept="image/*" required/>
                                    <label className="input-group-text" htmlFor="ImageFile">Upload</label>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">$</span>
                                    <input onChange={handleChange} name='price' value={input.price} type="number" className="form-control"  placeholder="Price" aria-label="Price" aria-describedby="basic-addon1" required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description:</label>
                                    <textarea onChange={handleChange} name='description' value={input.description} className="form-control" id="description" rows="3" required></textarea>
                                </div>
                                <button className="w-100 btn btn-success btn-lg" type="submit">Submit</button>
                            </form>
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
        </div>
    )
}