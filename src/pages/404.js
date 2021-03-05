import React, { useState } from 'react';
import { Link } from 'gatsby';
import NavBar from 'src/components/NavBar';
import ErrorBot from 'src/images/error.png';

const Error404 = () => {
  return (
    <>
      <NavBar />
      <main
        className={`flex h-full w-full items-center justify-center bg-base-900 text-white`}
        style={{
          minHeight: `calc(100vh - 5rem)`,
        }}
      >
        <div
          className={`flex justify-center items-center flex-col -mt-16`}
          style={{
            maxWidth: '70vw',
          }}
        >
          <img src={ErrorBot} className={`h-64 w-64`} />
          <h3 className={`font-black text-4xl mt-4`}>Oops</h3>
          <p className={`text-center text-2xl mt-4`}>
            This cryptobot does not exists. Try exploring on Marketplace or
            build your own while learning in Academy
          </p>
          <div className={`mt-6 space-x-4`}>
            <Link
              to="/tezos"
              className={`py-3 px-9 text-xl bg-primary-600 hover:bg-primary-700 text-white font-bold rounded focus:outline-none`}
            >
              Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Error404;
