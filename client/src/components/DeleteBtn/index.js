import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
export function DeleteBtn(props) {
  return (
    <FormBtn
       onClick = {props.save}
       id = {props.idx}
    > Save this book
    </FormBtn>
  );
}

export default DeleteBtn;
