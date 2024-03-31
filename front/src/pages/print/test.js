import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';

const App = () => {
  const componentRef = useRef();

  return (
    <div>
      <div ref={componentRef}>This contains all the files you intend to export[download]</div>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
    </div>
  );
};
export default App;
