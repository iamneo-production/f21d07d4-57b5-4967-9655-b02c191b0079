import axios from "axios";

import axiosObject from "../../src/api/bootapi"
//app axios methods
const baseUrl = "http://localhost:9090";

export const login = async (val)=>{
    const res = await axios({
        method: 'post',
        url: `${baseUrl}/authenticate`,
        data: val
      });
    return res;
}

export const signup = async(val) => {
    const res = await axios({
        method: 'POST',
        url: `${baseUrl}/signup`,
        data: val
    });
    return res;
}

//admin axios methods

export const addCenter = async(val)=>{
    const res = await axiosObject({
        method:'post',
        url:`/addServiceCenter`,
        data:val
      });
    return res;
}

export const deleteCenter = async(deleteUrl)=>{
    const res = await axiosObject({
        method:'delete',
        url:`/${deleteUrl}`
    });
    return res;
}

export const editCenter = async(val,editURL)=>{
    const res = await axiosObject({
        method: 'PUT',
        url: `/${editURL}`,
        data: val
    });
    return res;
}

export const fetchAllCenter = async()=>{
    const res = await axiosObject({
        method:'get',
        url:`/getServiceCenter`
      });
    return res;
}

export const fetchCenterById = async(URL)=>{
    const res = await axiosObject({
        method:'GET',
        url:`/${URL}`
    });
    return res;
}

//user axios methods

export const bookAppointment = async(val)=>{
    const res = await axiosObject({
        method:'post',
        url:`/bookappointment`,
        data:val
      });
    return res;
}

export const deleteBooking = async(deleteUrl)=>{
    const res = await axiosObject({
        method:'delete',
        url:`/${deleteUrl}`
    });
    return res;
}


export const updateBooking = async(val,editUrl)=>{
    const res = await axiosObject({
        method: 'PUT',
        url: `/${editUrl}`,
        data: val
    });
    return res;
}

export const fetchUserBookings = async(userId)=>{
    const res = await axiosObject({
        method:'get',
        url:`/getAppointments/${userId}`,
        headers: {
          'Access-Control-Allow-Origin': true,
        }
      });
    return res;
}
export const fetchAllBookings = async(userId)=>{
    const res = await axiosObject({
        method:'get',
        url:`/getAppointments/`,
        headers: {
          'Access-Control-Allow-Origin': true,
        }
      });
    return res;
}

export const fetchAllReviewsByCenter = async(url)=>{

    const res = axiosObject({
        method:"GET",
        url: `${baseUrl}/${url}`
    })

    return res;
}

export const submitReview = async(val)=>{
    const res = axiosObject({
        method:"POST",
        url:`${baseUrl}/addReview`,
        data:val
    });

    return res;
}

export const deleteReview =async(delurl)=>
{
    const res=await axiosObject({
        method:'delete',
        url:`${baseUrl}/${delurl}`
    });
    return res;
}
    
export const editReview = async(val,editurl)=>{
    const res = await axiosObject({
        method: 'PUT',
        url: `${baseUrl}/${editurl}`,
        data: val
    });
    return res;
}

 export const makePayment = async(id)=>{
     const res = axiosObject({
         method:'PUT',
         url:`/payment/${id}`
     });
     return res;
 }
