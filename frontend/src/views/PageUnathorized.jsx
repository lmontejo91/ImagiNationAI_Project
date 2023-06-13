import React from "react";
import { Link } from "react-router-dom";

const PageUnathorized = () => {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
      <main className="grid min-h-full place-items-center bg-dark-blue px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-neon-blue">401</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-muted sm:text-5xl">
            Unauthorized
          </h1>
          <p className="mt-6 text-base leading-7 text-muted">
            Sorry, you don´t have access to the page you are trying to open.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/" className="rounded-md bg-neon-blue px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-neon-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-blue">
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default PageUnathorized;
