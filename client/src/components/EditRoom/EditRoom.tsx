import { useState } from 'react'
import './EditRoom.css'

const EditRoom = ({ isVisible, closeEdit, submitEdit }: any) => {
    const [details, setDetails] = useState<any>({
        type: 'deluxe',
        bed: 0,
        status: 'operational',
        shortDesc: '',
    })

    return (
        <div
            className={
                isVisible
                    ? 'editRoom-modal-container'
                    : 'editRoom-modal-container inactive'
            }
            onClick={(e) => closeEdit(e)}
        >
            <div className="editRoom-modal">
                <div className="modal-header">
                    <h3>Edit Room</h3>
                </div>
                <div className="modal-content">
                    <form>
                        <div className="form-row">
                            <div className="form-item">
                                <label htmlFor="type">Type</label>
                                <br />
                                <select
                                    name="type"
                                    id="type"
                                    value={details.type}
                                    onChange={(e) =>
                                        setDetails((prev: any) => ({
                                            ...prev,
                                            type: e.target.value,
                                        }))
                                    }
                                >
                                    <option value="deluxe">Deluxe</option>
                                    <option value="suite">Suite</option>
                                </select>
                            </div>
                            <div className="form-item">
                                <label htmlFor="beds">Beds</label>
                                <br />
                                <input
                                    type="number"
                                    name="beds"
                                    id="beds"
                                    value={details.bed}
                                    onChange={(e) =>
                                        setDetails((prev: any) => ({
                                            ...prev,
                                            bed: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-item">
                                <label htmlFor="status">Status</label>
                                <br />
                                <select
                                    name="status"
                                    id="status"
                                    value={details.status}
                                    onChange={(e) =>
                                        setDetails((prev: any) => ({
                                            ...prev,
                                            status: e.target.value,
                                        }))
                                    }
                                >
                                    <option value="operational">
                                        Operational
                                    </option>
                                    <option value="unoperational">
                                        Not operational
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-item">
                                <label htmlFor="desc">Short Description</label>
                                <br />
                                <textarea
                                    name="desc"
                                    id="desc"
                                    className="desc"
                                    value={details.shortDesc}
                                    onChange={(e) =>
                                        setDetails((prev: any) => ({
                                            ...prev,
                                            shortDesc: e.target.value,
                                        }))
                                    }
                                ></textarea>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-item">
                                <div className="form-actions">
                                    <button
                                        className="btn-submit"
                                        type="button"
                                        onClick={() => submitEdit(details)}
                                    >
                                        Save
                                    </button>
                                    <br />
                                    <button
                                        className="btn-cancel"
                                        type="button"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditRoom
