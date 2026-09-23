import React from 'react';
import Logo from "@/assets/logo.png";
import Image from 'next/image';

const Navbar = () => {
    return (
        <div className='bg-[#0C0D10]'>
            <nav className='container mx-auto flex justify-between items-center py-6 px-6'>
                <div className='flex items-center gap-3 px-4'>
                    <Image src={Logo} className='h-[20px] w-[20px]' alt='Workout Library Logo'/>
                    <p className='text-white'>FITLOG</p>
                </div>

                <ul className='flex items-center gap-6'>
                    <li className='text-[#D1D5DB] hover:text-[#CCFF00]'>Workouts</li>
                    <li className='text-[#D1D5DB] hover:text-[#CCFF00]'>My Plan</li>
                </ul>
                <div className='flex items-center gap-6'>
                    <button className='text-[#D1D5DB] hover:text-[#CCFF00]'>
                        Plan
                    </button>
                    <button className='text-[#D1D5DB] hover:text-[#CCFF00]'>
                        Saved
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;