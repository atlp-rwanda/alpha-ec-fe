import React from 'react';
import { useState, useRef, useEffect } from 'react';

const CustomSelect = ({ options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const handleSelect = value => {
    onChange(value);
    setIsOpen(false);
  };

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      <div
        className="bg-[#a5c9ca00]  border-b-2 border-black rounded px-4 py-2 cursor-pointer text-black"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected ? (
          options.find(opt => opt.value === selected).label
        ) : (
          <span className="text-gray-500">Select a category</span>
        )}
      </div>
      {isOpen && (
        <ul className="absolute w-full bg-[#a5c9ca] border border-black mt-2 rounded shadow-lg max-h-60 overflow-y-auto z-10">
          {options.map(option => (
            <li
              key={option.value}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200 text-black"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
