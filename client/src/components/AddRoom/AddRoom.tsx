import { useState } from 'react'
import './AddRoom.css'

const AddRoom = ({ isAddOpen, addRoom, submitRoom, closeAddRoom }: any) => {
    const [details, setDetails] = useState<any>({
        type: 'deluxe',
        bed: 0,
        status: 'operational',
        rate: '',
        shortDesc: '',
    })

    return (
        <>
            <div className="addRoom-container">
                <div className="actions">
                    <button className="btn-add" onClick={() => addRoom()}>
                        Add Room
                    </button>
                </div>
            </div>

            <div
                className={
                    isAddOpen
                        ? 'addRoom-modal-backdrop'
                        : 'addRoom-modal-backdrop inactive'
                }
                onClick={(e) => closeAddRoom(e)}
            >
                <div className="addRoom-modal">
                    <div className="modal-header">
                        <h3>Add Room</h3>
                    </div>
                    <div className="modal-content">
                        <form className="addRoom-form">
                            <div className="form-row">
                                <div className="form-item">
                                    <label htmlFor="type">Type</label>
                                    <br />
                                    <select
                                        name="type"
                                        id="type"
                                        value={details.type}
                                        onChange={(e) =>
                                            setDetails((details: any) => ({
                                                ...details,
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
                                            setDetails((details: any) => ({
                                                ...details,
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
                                            setDetails((details: any) => ({
                                                ...details,
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

                                <div className="form-item">
                                    <label htmlFor="price">Rate</label>
                                    <br />
                                    <input
                                        type="number"
                                        name="price"
                                        id="price"
                                        value={details.rate}
                                        onChange={(e) =>
                                            setDetails((details: any) => ({
                                                ...details,
                                                rate: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-item">
                                    <label htmlFor="desc">
                                        Short Description
                                    </label>
                                    <br />
                                    <textarea
                                        className="desc"
                                        name="desc"
                                        id="desc"
                                        value={details.shortDesc}
                                        onChange={(e) =>
                                            setDetails((details: any) => ({
                                                ...details,
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
                                            type="button"
                                            className="btn-submit"
                                            onClick={() => submitRoom(details)}
                                        >
                                            Add
                                        </button>
                                        <br />
                                        <button
                                            type="button"
                                            className="btn-cancel"
                                            onClick={(e) => {
                                                closeAddRoom(e)
                                            }}
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
        </>
    )
}

export default AddRoom
