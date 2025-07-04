"use client"

import React, { useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import Cookies from "js-cookie";

const ConfirmSubModal = ({id, setConfirmSubModal}) => {
    const plan = JSON.parse(localStorage.getItem('selectedPlan'));
    const [quantity, setQuantity] = useState('')
    const itemsInCart = JSON.parse(localStorage.getItem('itemsInCart')) || []

    const user = JSON.parse(localStorage.getItem('user'))

    async function handleSubConfirmation(){
        if(!quantity){
            alert("Please fill in the field")
        }else{
            const subTotalPrice = plan.amount * quantity;
            const item = {
                subscriptionType: plan._id,
                quantity,
            }
            // itemsInCart.push(item)
            // localStorage.setItem('itemsInCart', JSON.stringify(itemsInCart))
            setConfirmSubModal(false)
            console.log(JSON.stringify({
                subscriptionType: plan._id,
                quantity,
                org:id
            }));
            const res = await fetch(`https://go-tru-hub-api.onrender.com/contract-plan/add-to-cart`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
                body:JSON.stringify({
                    subscriptionType: plan._id,
                    quantity,
                    organizationId:id
                })
            })
            const data = await res.json()
            if(res.ok){
                alert("Plan successfully added to cart")
            }
            console.log(data);
        }
    }

  return (
    <div>
        <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setConfirmSubModal(false)}></div>
        <div className="md:max-w-[550px] w-[90%] fixed top-[50%] left-[50%] z-[100]" style={{ transform: "translate(-50%, -50%)" }}>
            <div className='bg-[#2D3934] w-full py-[20px] px-[1rem]'>
                <div className='flex items-center justify-between'>
                    <p></p>
                    <IoCloseOutline fontSize={"24px"} color='white' cursor={"pointer"} onClick={() => setConfirmSubModal(false)}/>
                </div>
                <div className='w-[180px] mx-auto bg-white py-[7px] px-[10px] rounded-[4px]'>
                    <div className="flex items-center justify-between pb-[5px]">
                        <p className="text-[22px]"></p>
                    </div>
                    <div className='bg-[#EDEDED] h-[100px] flex items-center justify-center rounded-[4px] mb-2'>
                        <div className='p-3 inline-block text-[13px]'>
                            {/* <img src="./images/scan.svg" alt="" /> */}
                            <p>{plan?.name}</p>
                        </div>
                    </div>
                    <p className='text-[14px] mb-1 text-[#1C2320] font-[500]'>{plan?.feature?.map(f => f.name).join(', ')}/<span className='text-gray-400 font-[400] text-[12px]'>{plan.duration}</span> </p>
                    <p className='font-[500]'>₦{plan.amount}</p>
                </div>
            </div>
            <div className='bg-[#fff] w-full py-[30px] md:px-[2rem]'>
                <div className='w-full my-7 flex flex-col px-[30px]'>
                    <label className='block text-text-color text-left mb-2'>How many members will be using this feature?</label>
                    <div className='flex items-center justify-between px-4 py-3 border w-full rounded-[4px]'>
                        <input onChange={e => setQuantity(e.target.value)} type="text" placeholder='250' className='outline-none w-full rounded-[4px] bg-transparent text-[14px]'/>
                    </div>
                    <button className='bg-[#2D3934] rounded-[4px] py-3 mt-5 font-[600] text-white text-[14px]' onClick={handleSubConfirmation}>Confirm Subscription</button>
                </div>
            </div>
        </div>
        {/* {
            msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType} />
        } */}
    </div>
  )
}

export default ConfirmSubModal