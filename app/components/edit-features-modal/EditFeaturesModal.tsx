import React from 'react'
import { IoCloseOutline } from 'react-icons/io5'



const EditFeaturesModal = ({ setEditFeaturesModal, eidtFeatureModal } : any) => {
  return (
    <div>
        <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setEditFeaturesModal(false)}></div>
        <div className="bg-white w-[450px] fixed top-[50%] left-[50%] pt-[20px] px-[2rem] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
            <div className="flex items-center justify-between border-b pb-[5px]">
                <p className="text-[px]">Edit Feature</p>
                <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setEditFeaturesModal(false)}/>
            </div>
            <div className='text-center flex items-center justify-center flex-col'>
                <input type="text" value={eidtFeatureModal.name} className='border border-gray-300 w-full mt-5 px-3 py-2 rounded'/>
                <button className='mt-5 bg-secondary-color w-full text-white py-1 rounded'>Update</button>
            </div>
        </div>
    </div>
  )
}

export default EditFeaturesModal