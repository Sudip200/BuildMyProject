import React, { ReactElement } from 'react';
import { Bars } from 'react-loader-spinner';
function ReactLoader(): ReactElement {
  return (
    <div className="h-dvh bg-gradient-to-br from-violet-900 via-gray-900 to-100%  to-black flex justify-center items-center">
      <div className=''>
        <Bars color="white" height={100} width={100} />
      </div>
    </div>
  );
}
export default ReactLoader;