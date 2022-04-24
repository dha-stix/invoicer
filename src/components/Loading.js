import React from 'react'
// import { css } from "@emotion/react";
import RingLoader from "react-spinners/RingLoader";

const Loading = () => {
  return (
    <main className="w-full min-h-screen bg-gray-200 flex flex-col items-center justify-center">
        <RingLoader/>
    </main>
  )
}

export default Loading