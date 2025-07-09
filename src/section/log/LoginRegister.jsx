import React from 'react';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';

const LoginRegister = () => {
  const navigate = useNavigate();

  return (
    <section className='bg-[#FFE9FE] flex items-center justify-center'>
      <div className='container flex flex-col justify-center py-[1rem]'>
        {/* Create Account Button */}
        <Link to="/register" className='no-underline'>
          <div className='md:text-[20px] text-[15px] flex justify-center uppercase mb-4'>
            <Button variant='outline' onClick={() => navigate('/register')}>
              Create Your Account
            </Button>
          </div>
        </Link>

        {/* OR Separator */}
        <div className='flex gap-4 items-center justify-center py-4'>
          <hr className='my-3 border w-11 border-black' />
          <span>OR</span>
          <hr className='my-3 border w-11 border-black' />
        </div>

        {/* Login Button */}
        <Link to="/login" className='no-underline'>
          <div className='flex md:text-[20px] text-[15px] justify-center pb-9'>
            <button
              className='bg-[#F36BF1] text-white/90 border-none hover:bg-[#EB10E8] px-10 md:px-24 rounded-full py-3 uppercase hover:scale-105 duration-100'
            >
              Login
            </button>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default LoginRegister;
