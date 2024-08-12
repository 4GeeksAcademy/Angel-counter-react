import React from "react";

export default function Counter({value}){
  const digits = value.toString().padStart(6,"0").split("")

  return(
    <div className="counter">
      {digits.map((digit, index) => (
        <div key={index} className="digit">
          {digit}
        </div>
      ))}
    </div>
  )
} 

  