import React from "react";
import { ReactToPrint } from "react-to-print";

const Fired = () => {
  const componentRef = React.useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print</button>}
        content={() => componentRef.current}
      />
      <div ref={componentRef}>
        <h1>This is page about fired people</h1>
      </div>
    </div>
  );
};

export default Fired;
