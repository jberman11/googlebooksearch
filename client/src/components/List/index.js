import React from "react";
import { FormBtn } from "../Form"
import "./style.css";

// This file exports both the List and ListItem components

export function List({ children }) {
  return (
    <div className="list-overflow-container">
      <ul className="list-group">{children}</ul>
    </div>
  );
}

export function ListItem(props) {
  return (
    <div className="card">
      <img alt={props.title} id={props.id} src={props.image}></img>
      <div>
        <h4> {props.title}</h4>
        <p>By: {props.author}</p>
        <p> {props.description}</p>
        <p><a href={props.link}>Link To Book</a></p>
        <FormBtn
          onClick={props.save}
          id={props.idx}
        > Save this book
    </FormBtn>
      </div>

    </div>);
}

export function SavedItem(props) {
  return (
    <div className="card">
      <img alt={props.title} id={props.id} src={props.image}></img>
      <div>
        <h4> {props.title}</h4>
        <p>By: {props.author}</p>
        <p> {props.description}</p>
        <p><a href={props.link}>Link To Book</a></p>
        <FormBtn
          onClick={props.delete}
          id = {props.id}
        > Delete this book
          </FormBtn>
      </div>

    </div>
  );
}
