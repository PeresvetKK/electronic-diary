import React, { useState } from "react";
import s from './CellInput.module.scss';
import Input from "../../UI/input/Input/Input";

const CellInput = ({classNameElement, children,...props }) => {

    return (
        <div className={`${s.cell__input} ${classNameElement}`}>
            <Input {...props}/>
        </div>
    );
};

export default CellInput;
