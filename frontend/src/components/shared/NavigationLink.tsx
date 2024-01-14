import React from 'react'
import { Link } from 'react-router-dom';

type Props = {
    to: string;
    bg: string;
    text: string;
    textColor: string;
    onClick?: () => Promise<void>
}

function NavigationLink(props: Props) {
    return (
        <Link className='nav-link' to={props.to} style={{ color: props.textColor, background: props.bg }} onClick={props.onClick}>
            {props.text}
        </Link>
    )
}

export default NavigationLink