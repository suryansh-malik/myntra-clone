import { useState } from "react";

const Validation = (validator) => {
  const [inputvalue, setinputvalue] = useState("");
  const [touched, settouched] = useState(false);
    const inputisvalid = validator(inputvalue) && touched;
    let classname="";

  const inputvalueentered = (event) => {
    setinputvalue(event.target.value);
    settouched(true);
  };
  const inputblur = () => {
    settouched(true);
    // feedback();
    };
    const formsubmit = () => {
        settouched(true)
        
    }
    const reset =() => {
        settouched(false)
        setinputvalue('')
    }
    if (!inputisvalid&&touched) {
        classname="invalid-input"
    } else {
        classname="valid-input"
    }


  return {
    touched,
    inputvalue,
    inputisvalid,
    inputvalueentered,
      inputblur,
      formsubmit,
      reset,
    classname,
  };
};

export default Validation;
