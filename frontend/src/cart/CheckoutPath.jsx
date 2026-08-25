import { RiBankLine, RiCheckDoubleLine, RiTruckLine } from "@remixicon/react";
import React from "react";

const CheckoutPath = ({ activePath }) => {
  const path = [
    {
      label: "Shipping Details",
      icon: <RiTruckLine />,
    },
    {
      label: "Confirm Order",
      icon: <RiCheckDoubleLine />,
    },
    {
      label: "Payment",
      icon: <RiBankLine />,
    },
  ];

  return (
    <div className="bg-gray-50 py-8">
        <div className="mx-auto mt-8 mb-8 flex max-w-6xl items-center mr-10 justify-center px-4">
      {path.map((item, index) => (
        <div
          key={index}
          className="flex flex-1 items-center"
          active={activePath === index ? "true" : "false"}
          completed={activePath >= index ? "true" : "false"}
        >
          <div className="flex flex-col items-center">
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-full border-2 text-xl shadow-md
      ${
        activePath === index
          ? "border-black bg-black text-white"
          : activePath > index
            ? "border-black bg-black text-white"
            : "border-gray-300 bg-white text-gray-500"
      }`}
            >
              {item.icon}
            </div>

            <p
              className={`mt-3 text-center text-sm font-medium
      ${
        activePath === index
          ? "text-black"
          : activePath > index
            ? "text-black"
            : "text-gray-500"
      }`}
            >
              {item.label}
            </p>
          </div>

          {index !== path.length-1 && (
            <div
              className={`mx-4 h-1 flex-1 -translate-y-3 rounded-full ${
                activePath > index ? "bg-black" : "bg-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </div>
    </div>
  );
};

export default CheckoutPath;
