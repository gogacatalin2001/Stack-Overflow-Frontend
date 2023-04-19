import React from 'react'

export const Avatar = ({ children, backgroundColor, px, py, color, borderRadius, fontSize, textAling, cursor }) => {

    const style = {
        backgroundColor,
        padding: `${px} ${py}`,
        color: color || 'black',
        borderRadius: '4px',
        fontSize,
        textAling: 'center',
        cursor: cursor || null
    }

    return (
        <div style={style}>
            {children}
        </div>
    )
}
