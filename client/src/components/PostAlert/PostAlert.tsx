import './PostAlert.css'

const PostAlert = ({ closeAlert, isVisible, status }: any) => {
    return (
        <div
            className={isVisible ? 'alert-backdrop' : 'alert-backdrop inactive'}
            onClick={closeAlert}
        >
            <div
                className={
                    isVisible
                        ? status
                            ? 'alert active good'
                            : 'alert active bad'
                        : 'alert inactive'
                }
            >
                <div className="alert-header">
                    {status ? (
                        <h3 className="text-center">
                            {' '}
                            Room reservation successful{' '}
                        </h3>
                    ) : (
                        <h3>Fail</h3>
                    )}
                </div>
                <div className="alert-body">
                    <div className="message">
                        {status ? (
                            <p className="lead text-center">
                                You will shortly receive an Email to confirm
                                your reservation
                            </p>
                        ) : (
                            <p>Room reservation unsuccessful</p>
                        )}
                    </div>
                    {status ? (
                        <div className="symbol-row">
                            <div className="symbol-container good">
                                <div className="symbol good">&#10004;</div>
                            </div>
                        </div>
                    ) : (
                        <div className="symbol-row">
                            <div className="symbol-container bad">
                                <div className="symbol bad">&#215;</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PostAlert
