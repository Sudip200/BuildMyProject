import React, { ReactElement } from "react";

const DarkModeLayout =({children}):ReactElement =>{
    return(
    <div className="bg-gradient-to-br from-violet-900 via-gray-900 to-100% via-black to-black  p-2 h-dvh">
        {children}
    </div>)
}

export default DarkModeLayout