import React from "react";

const PageHeader = ({ title, subtitle, children }) => {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold font-serif text-gray-800">{title}</h1>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default PageHeader;
