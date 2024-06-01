import React from 'react'

function SubmitBtn(Props: {
  text: any
  borderclr: any
  hover_bg: any
  hover_text: any
  hover_border: any
  bg: any
  value: any
}) {
  return (
    <div>
      <button className={`px-8 py-2 w-full mb-4 rounded-md bg-${Props.bg} text-${Props.text} border-2 border-${Props.borderclr} font-bold transition duration-200 hover:bg-${Props.hover_bg} hover:text-${Props.hover_text} hover:border-2 hover:border-${Props.hover_border}`}>
        {Props.value}
      </button>
      
    </div>

  )
}

export default SubmitBtn



