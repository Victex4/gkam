import React from 'react'
import { FaCreditCard } from 'react-icons/fa';
import { MdOutlineAccountBalanceWallet, MdInfoOutline } from 'react-icons/md';
import { RiBankLine } from 'react-icons/ri';

const ProceedPayment = () => {
  return (
    <div>
       <div className="min-h-screen flex items-center justify-center bg-[#f5f9fc]">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-md p-6">
        <div className="text-center mb-4">
          <div className="text-sm text-green-600 font-semibold">🔒 Secured by <span className="text-gray-600"></span></div>
          <h2 className="text-xl font-semibold mt-4">How would you like to pay?</h2>
        </div>

        <div className="space-y-3 mt-6">
          {/* Option 1 */}
          <div className="flex justify-between items-center bg-[#FFE6FE] hover:bg-[#FF99FC] cursor-pointer rounded-lg px-4 py-3 transition">
            <div className="flex items-center gap-3">
              <FaCreditCard className="text-lg text-gray-600" />
              <span className="text-gray-800 font-medium">Pay with Debit Card</span>
            </div>
            <MdInfoOutline className="text-gray-500 text-xl" />
          </div>

          {/* Option 2 */}
          <div className="flex justify-between items-center bg-[#FFE6FE] hover:bg-[#FF99FC] cursor-pointer rounded-lg px-4 py-3 transition">
            <div className="flex items-center gap-3">
              <MdOutlineAccountBalanceWallet className="text-lg text-gray-600" />
              <span className="text-gray-800 font-medium">Pay with Bank Transfer</span>
            </div>
            <MdInfoOutline className="text-gray-500 text-xl" />
          </div>

          {/* Option 3 */}
          <div className="flex justify-between items-center bg-[#FFE6FE] hover:bg-[#FF99FC] cursor-pointer rounded-lg px-4 py-3 transition">
            <div className="flex items-center gap-3">
              <RiBankLine className="text-lg text-gray-600" />
              <span className="text-gray-800 font-medium">Pay with Bank</span>
            </div>
            <MdInfoOutline className="text-gray-500 text-xl" />
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ProceedPayment
