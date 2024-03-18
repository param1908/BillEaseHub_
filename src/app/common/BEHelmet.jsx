import React from "react";
import { Helmet } from "react-helmet";

const BEHelmet = ({ title }) => {
  return (
    <div>
      <Helmet>
        <title>{`${title} | Bill Ease Hub`}</title>
      </Helmet>
    </div>
  );
};

export default BEHelmet;
