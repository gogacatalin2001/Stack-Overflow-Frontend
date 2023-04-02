import React from 'react';

function Header(props) {
    console.log(props)
    return <h1>Hello there, {props.name}, {props.color}</h1>
}

export default Header;