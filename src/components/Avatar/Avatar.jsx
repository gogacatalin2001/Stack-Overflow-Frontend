import React from 'react'

export const Avatar = ({ children, backgroundColor, px, py, color, borderRadius, fontSize, textAling, cursor }) => {

    const style = {
        backgroundColor,
        padding: `${px} ${py}`,
        color: color || 'black',
        borderRadius,
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
