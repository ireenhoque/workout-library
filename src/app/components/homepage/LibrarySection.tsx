import { ILift } from '@/type/lift.type';
import React from 'react';

const getAllLifts = async (): Promise<ILift[]> => {
    const response = await fetch("https://api.abcz.workers.dev/api/fitlog");
    const data = await response.json();
    return data;
}

const LibrarySection = async () => {
   const data = await getAllLifts();
    console.log(data, "data from library section");
    return (
        <div className='my-[80px] container mx-auto'>
            <div className="flex flex-col gap-2 bg-[#0C0D10] py-10 px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold">
                THE LIBRARY
            </h2>
            <p className="text-sm text-[#D1D5DB]">
                Twelve lifts covering every major muscle group.
            </p>
            </div>

            {/* Data display via card */}
            <div>
                {data.map((lift: ILift, index:number) => {
                    return (
                        <div key={lift.id}>
                            <h3>{lift.name}</h3>
                        </div>
                    )
                })}
            </div>
        </div>

    );
};

export default LibrarySection;