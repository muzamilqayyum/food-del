import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify';

function Edit({ url, data, setdata }) {

    const [image, setimage] = useState(false);
    const [color, setcolor] = useState("black");

    const onchangehandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setdata(datas => ({ ...datas, [name]: value }))
    }

    const submithandler = async (event) => {
        event.preventDefault();

        const formdata = new FormData();
        formdata.append("name", data.name)
        formdata.append("description", data.description);
        formdata.append("price", Number(data.price));
        formdata.append("category", data.category);
        formdata.append("_id", data._id);
        formdata.append("color",color);

        if (image) {
            formdata.append("image", image);

        } else {
            formdata.append("image", data.image)

        }

        const response = await axios.post(`${url}/api/food/list/updatedata`, formdata);

        if (response.data.success) {
            window.location.href = `http://localhost:5174/list`

        } else {
            toast.error("Error")
        }
    }

    return (
        <div className='add'>
            <form onSubmit={submithandler} className='flex-col'>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : `${url}/images/` + data.image} alt="" />
                    </label>
                    <input onChange={(e) => setimage(e.target.files[0])} type="file" hidden id='image' required />
                </div>
                <div className="add-product-name flex-col">
                    <input onChange={onchangehandler} value={data.name} name="name" placeholder='Enter product name' type="text" required />
                </div>
                <div className="add-product-description flex-col">
                    <p>product description</p>
                    <textarea onChange={onchangehandler} value={data.description} name="description" rows="6" placeholder='Write content here...'></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>product category</p>
                        <select onChange={onchangehandler} name="category" value={data.category}>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Sandwhich">Sandwhich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Noddles">Noddles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input onChange={onchangehandler} value={data.price} type="Number" name='price' placeholder='$20' />
                    </div>

                    <div className="add-color flex-col">
                        <p>product color</p>
                        <select onChange={(e) => setcolor(e.target.value)} name="color">

                            <option value="black">Black</option>
                            <option value="blue">Blue</option>
                        </select>
                    </div>
                </div>
                <button onClick={submithandler} className='add-btn' type='submit'>Save Changes</button>
            </form>
        </div>
    )
}

export default Edit
