import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import "./List.css"
import { NavLink } from 'react-router';
function List({ url, setdata }) {

    const [list, setlist] = useState([]);

    const fetchlist = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        if (response.data.success) {


            setlist(response.data.data);
        } else {
            toast.error("Error");
        }
    }

    const removefood = async (foodid) => {
        const response = await axios.post(`${url}/api/food/remove`, { _id: foodid });
        await fetchlist();
        if (response.data.success) {
            toast.success(response.data.message);
        } else {
            console.log(foodid)
            toast.error("Error");
        }
    }

    const sendid = async (editid) => {
        const response = await axios.post(`${url}/api/food/list/editid`, { _id: editid })
        if (response.data.success) {
            setdata(response.data.message)

        } else {
            toast.error("Error");
        }
    }

    useEffect(() => {
        fetchlist();
    }, []);

    return (
        <div className='list add flex-col'>
            <p>All Foods List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Color</b>
                    <b>Action</b>
                    <b>Edit</b>
                </div>
                {list.map((item, idx) => {
                    return (
                        <div key={idx} className="list-table-format">
                            <img src={`${url}/images/` + item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>{item.price}</p>
                            <p>{item.color}</p>
                            <p onClick={() => removefood(item._id)} className='cursor'>X</p>
                            <NavLink to='/list/edit'>
                                <p onClick={() => sendid(item._id)}>edit</p>
                            </NavLink>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default List
