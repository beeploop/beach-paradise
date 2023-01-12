import './ComponentLoader.css'

const ComponenLoader = () => {
    return (
        <div className="component-loader-container">
            <div className="lds-grid">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <p>Please wait...</p>
        </div>
    )
}

export default ComponenLoader
