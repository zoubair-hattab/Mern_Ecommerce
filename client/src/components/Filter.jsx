import React from 'react';

const Filter = () => {
  return (
    <div className=" flex flex-col gap-3 sm:flex-row sm:gap-0  ">
      <select
        className="flex-2 bg-gray-50 border border-gray-300 
         text-gray-900 text-sm rounded-l-lg 
         focus:outline-none

         block  p-3"
      >
        <option defaultChecked>Choose a country</option>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="FR">France</option>
        <option value="DE">Germany</option>
      </select>

      <input
        type="search"
        className="bg-gray-50  flex-1 border  border-gray-400
         text-gray-900 text-sm
         focus:outline-none
           block  p-3 "
        placeholder="Search your product"
      />

      <select
        id="countries"
        className=" bg-gray-50 border flex-2 border-gray-400
        text-gray-900 text-sm rounded-r-lg 
        focus:outline-none

        block  p-3"
      >
        <option selected>Choose a country</option>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="FR">France</option>
        <option value="DE">Germany</option>
      </select>
    </div>
  );
};

export default Filter;
