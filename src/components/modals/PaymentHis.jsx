import React from 'react'
import Top from '../header/Top'
import SideBar from '../sideBar/SideBar'
import { CiSearch } from 'react-icons/ci'


const PaymentHis = ({ toggleSideBar, isSideBarOpen }) => {
  return (
    <div>
       <div>
      <Top toggleSideBar={toggleSideBar}/>
      <SideBar isSideBarOpen={isSideBarOpen}/>
      <div className="md:p-8 p-4 bg-[#eff3f6] mt-10 pr-0 md:ml-64">
        <div className="bg-[#eff3f6] h-screen py-4 md:px-4 px-2">
          <div className='flex justify-between items-center pb-4'>
            <h1 className="text-gray-600 text-xl font-Poppins">
              Payment History
            </h1>
            <div className='relative'>
              <input className='text-sm w-full outline-none py-2 pr-4 pl-10 bg-white border border-[#FF99FC] text-black focus:border-[#FF99FC]' type="text" placeholder='Search Payment..'/>
                <CiSearch className='text-gray-600 absolute top-1/4 left-4 translate-y-1/3 text-sm' />
            </div>
          </div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 border">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Transaction Name 
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date & Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* {feedBackList
                  ?.filter(
                    (user) =>
                      user.name.includes(search) ||
                      user.phoneNo.includes(search) ||
                      user.feedback.includes(search)
                  )
                  ?.slice(0, expanded ? feedBackList.length : 3)
                  ?.map((user) => ( */}
                    <tr className="bg-white border-b">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                      </th>
                      <td className="px-6 py-4"></td>
                      <td className="px-6 py-4"></td>
                      <td className="px-6 py-4"></td>
                    </tr>
                  {/* ))} */}
              </tbody>
            </table>
          </div>
          {/* {feedBackList.length > 3 && (
            <div className="flex justify-center">
              <button
                className="text-green-500 underline text-2xl py-3 cursor-pointer"
                onClick={toggleExpanded}
              >
                {expanded ? "View Less" : "View All"}
              </button>
            </div>
          )} */}
          {/* <div className="flex justify-end mt-6">
            <button className="bg-green-600 rounded-md py-1 px-3 text-gray-100 hover:scale-110 duration-500">
              Send Email
            </button>
          </div> */}
        </div>
      </div>
    </div>
    </div>
  )
}

export default PaymentHis
