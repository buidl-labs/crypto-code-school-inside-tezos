import React from 'react';
import { Link } from 'gatsby';

const FeatureGrid = ({
  heading,
  subtext,
  buttontext,
  video,
  videoType,
  order,
  mobileOrder,
  padding,
  to,
  buttonHidden,
}) => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-6 ">
      <div
        className={`flex flex-col md:p${padding}-30 px-8 py-12 md:items-start items-center md:text-left text-center  justify-center order-${mobileOrder} md:order-${order}`}
      >
        <h1 className="sm:text-5xl text-3xl mb-3 font-black text-white heading-glow">
          {heading}
        </h1>
        <p className="text-base-50 text-base mb-6">{subtext}</p>

        <Link
          className={`py-3 px-9 text-xl border-primary-600 border-2 hover:border-primary-700 text-white font-bold rounded focus:outline-none ${buttonHidden}`}
          to={to}
        >
          {buttontext}
        </Link>
      </div>
      <div className="h-full w-full justify-items-center grid">
        <video
          className="object-contain object-center"
          loop
          autoPlay
          muted
          preload="auto"
          height={`80%`}
          width={`80%`}
        >
          <source src={video} type={`video/${videoType}`} />
        </video>
      </div>
    </div>
  );
};

export default FeatureGrid;
