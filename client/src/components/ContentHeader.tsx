import React from 'react'

const ContentHeader = ({ text }) => {
    return (
        <header className="content-header" style={styles}>
            <h1>{text}</h1>
        </header>
    )
}

const styles = {
    marginTop: '0.5em',
    borderBottom: '1px solid slategray',
}

export default ContentHeader
