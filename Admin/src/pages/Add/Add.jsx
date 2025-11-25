import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import "./Add.css"
import axios from 'axios';
import { toast } from 'react-toastify';

function Add({ url }) {

    const [image, setimage] = useState(false);
    const [color, setcolor] = useState("black")
    const [data, setdata] = useState({
        name: "",
        description: "",
        price: "",
        category: "salad"
    });



    const onchangehandler = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        setdata(data => ({ ...data, [name]: value }));

    }


    const submithandler = async (event) => {
        event.preventDefault();
        const formdata = new FormData();
        formdata.append("name", data.name);
        formdata.append("description", data.description);
        formdata.append("price", Number(data.price));
        formdata.append("category", data.category);
        formdata.append("image", image);
        formdata.append("color",color)


        const response = await axios.post(`${url}/api/food/add`, formdata);

        if (response.data.success) {
            setdata({
                name: "",
                description: "",
                price: "",
                category: "salad"
            });
            setimage(false);
            setcolor("");
            toast.success(response.data.message)
        } else {
            console.log(response.data)
            toast.error(response.data.message)
        }
    }

    return (
        <div>
            <div className="add">
                <form onSubmit={submithandler} className='flex-col'>
                    <div className="add-img-upload flex-col">
                        <p>Upload image</p>
                        <label htmlFor="image">
                            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                        </label>
                        <input onChange={(e) => setimage(e.target.files[0])} type="file" name="" id="image" hidden required />
                    </div>
                    <div className="add-product-name flex-col">
                        <p>product name</p>
                        <input onChange={onchangehandler} value={data.name} type="text" name="name" id="" placeholder='Type here' />
                    </div>
                    <div className="add-product-description flex-col">
                        <p>product description</p>
                        <textarea onChange={onchangehandler} value={data.description} name="description" rows="6" placeholder='Write content here...'></textarea>
                    </div>
                    <div className="add-category-price">
                        <div className="add-category flex-col">
                            <p>product category</p>
                            <select onChange={onchangehandler} name="category">
                                <option value="Refrigerator">Refrigerator</option>
                                <option value="Airpodes">Airpodes</option>
                                <option value="Processor">Processor</option>
                                <option value="Speakers">Speakers</option>
                                <option value="Watches">Watches</option>
                                <option value="Tv">Tv</option>
                                <option value="Camera">Camera</option>
                                <option value="Mobile">Mobile</option>
                            </select>
                        </div>
                        <div className="add-price flex-col">
                            <p>Product price</p>
                            <input onChange={onchangehandler} value={data.price} type="Number" name='price' placeholder='$20' />
                        </div>

                        <div className="add-color flex-col">
                            <p>product color</p>
                            <select onChange={(e) => setcolor(e.target.value)} name="color">

                                <option value="Black">Black</option>
                                <option value="Blue">Blue</option>
                            </select>
                        </div>




                    </div>
                    <button className='add-btn' type='submit'>ADD</button>
                </form>
            </div>
        </div>
    )
}

export default Add


