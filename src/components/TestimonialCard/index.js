import React from 'react';

const TestimonialCard = ({ link, img, name, username, text }) => {
    return (
      <a
        className="h-full text-center bg-base-700 border-2 border-base-400 p-6 rounded-md transform transition ease-in-out duration-500 hover:scale-95"
        href={link}
        rel="noopener"
        target="_blank"
      >
        <img
          alt="testimonial"
          className="w-20 h-20 mb-3 object-cover object-center rounded-full inline-block"
          src={img}
        />
        <h4 className="text-white font-bold text-xl mb-1">{name}</h4>
        <p className="text-white text-base mb-2">@{username}</p>
        <p className="text-base-50 text-center">{text}</p>
      </a>
    );
  };

  export default TestimonialCard;