import React from 'react';
import Button from './Button';

const EmptyState = ({setIsGenerateModelOpen}) => {
  return (
    // Parent container (full screen center)
    <div className="w-full min-h-screen flex py-5 justify-center">
      
      {/* Box */}
      <div className=" h-1/2  flex flex-col items-center justify-center border border-dashed rounded-lg p-6">
        
        {/* Icon */}
        <div className="text-6xl mb-4">📭</div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-700">
          No Quiz Found
        </h2>

        {/* Description */}
        <p className="text-gray-500 mt-2 text-center max-w-md">
          Looks like there is nothing here yet. Start by adding some data to see it appear here.
        </p>

        {/* Button */}
        <Button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition" onClick={() => setIsGenerateModelOpen(true)}>
          <span className='font-bold'>+</span> Generate
        </Button>

      </div>
    </div>
  );
};

export default EmptyState;