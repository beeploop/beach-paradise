import { useEffect, useState } from 'react'
import './ReservationForm.css'

const ReservationForm = ({ closeModal, roomNumber, state, handleSubmit }) => {
    const [opened, setOpened] = useState({ state })
    const [details, setDetails] = useState({
        roomNumber: roomNumber,
        firstName: '',
        lastName: '',
        street: '',
        city: '',
        state: '',
        postal: '',
        phone: '',
        email: '',
        arriveDate: '',
        arriveTime: '',
        arriveAmPm: 'am',
        departDate: '',
        departTime: '',
        departAmPm: 'am',
        numOfAdults: '1',
        numOfKids: '0',
        roomRate: '0.00',
    })

    useEffect(() => {
        if (opened) {
            // fetch(`http://localhost:5000/api/rooms/${roomNumber}`)
            fetch(
                `https://beach-reservation.onrender.com/api/rooms/${roomNumber}`
            )
                .then((response) => response.json())
                .then((data) => {
                    setDetails((details) => ({
                        ...details,
                        roomRate: data.price,
                    }))
                })
        }
    }, [state])

    return (
        <div>
            <form className="reservation-form">
                <header className="form-header">
                    <h3 className="form-title">
                        Beach Paradise Reservation Form
                    </h3>
                    <p className="form-subTitle">
                        Please complete the form below.
                    </p>
                </header>
                <main className="form-body">
                    <div>
                        <p>
                            Your reservation will be verified prior to your
                            arrival
                        </p>
                    </div>

                    <div className="section">
                        <div className="section-label">
                            Room Number: {roomNumber}
                        </div>
                    </div>
                    <div className="section">
                        <div className="section-label">Full Name</div>
                        <div className="section-row">
                            <div>
                                <label htmlFor="firstName">First Name</label>
                                <br />
                                <input
                                    required
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    value={details.firstName}
                                    onChange={(e) => {
                                        setDetails((details) => ({
                                            ...details,
                                            firstName: e.target.value,
                                        }))
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName">Last Name</label>
                                <br />
                                <input
                                    required
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    value={details.lastName}
                                    onChange={(e) => {
                                        setDetails((details) => ({
                                            ...details,
                                            lastName: e.target.value,
                                        }))
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="section">
                        <div className="section-label">Address</div>
                        <label htmlFor="street">Street / House No.</label>
                        <div className="section-row">
                            <input
                                required
                                type="text"
                                name="street"
                                id="street"
                                className="full-width"
                                value={details.street}
                                onChange={(e) => {
                                    setDetails((details) => ({
                                        ...details,
                                        street: e.target.value,
                                    }))
                                }}
                            />
                        </div>
                        <div className="section-row">
                            <div>
                                <label htmlFor="city">City</label>
                                <br />
                                <input
                                    required
                                    type="text"
                                    name="city"
                                    id="city"
                                    value={details.city}
                                    onChange={(e) => {
                                        setDetails((details) => ({
                                            ...details,
                                            city: e.target.value,
                                        }))
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="state">State / Province</label>
                                <br />
                                <input
                                    required
                                    type="text"
                                    name="state"
                                    id="state"
                                    value={details.state}
                                    onChange={(e) => {
                                        setDetails((details) => ({
                                            ...details,
                                            state: e.target.value,
                                        }))
                                    }}
                                />
                            </div>
                        </div>
                        <label htmlFor="postal">Postal / Zip Code</label>
                        <div className="section-row">
                            <input
                                required
                                type="text"
                                name="postal"
                                id="postal"
                                className="full-width"
                                value={details.postal}
                                onChange={(e) => {
                                    setDetails((details) => ({
                                        ...details,
                                        postal: e.target.value,
                                    }))
                                }}
                            />
                        </div>
                    </div>

                    <div className="section">
                        <div className="section-label">Contact</div>
                        <div className="section-row">
                            <div>
                                <label htmlFor="phone">Phone Number</label>
                                <br />
                                <input
                                    required
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    value={details.phone}
                                    onChange={(e) => {
                                        setDetails((details) => ({
                                            ...details,
                                            phone: e.target.value,
                                        }))
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="email">E-mail</label>
                                <br />
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={details.email}
                                    onChange={(e) => {
                                        setDetails((details) => ({
                                            ...details,
                                            email: e.target.value,
                                        }))
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="section">
                        <div className="section-subLabel">
                            Arrival - Date and Time
                        </div>
                        <div className="section-row schedule">
                            <div>
                                <label htmlFor="arrivalDate">Date</label>
                                <br />
                                <input
                                    required
                                    type="text"
                                    name="arrivalDate"
                                    id="arrivalDate"
                                    placeholder="MM-DD-YYYY"
                                    value={details.arriveDate}
                                    onChange={(e) => {
                                        setDetails((details) => ({
                                            ...details,
                                            arriveDate: e.target.value,
                                        }))
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="arrivalTime">
                                    Hours Minutes
                                </label>
                                <br />
                                <input
                                    required
                                    type="text"
                                    name="arrivalTime"
                                    id="arrivalTime"
                                    placeholder="HH:MM"
                                    value={details.arriveTime}
                                    onChange={(e) => {
                                        setDetails((details) => ({
                                            ...details,
                                            arriveTime: e.target.value,
                                        }))
                                    }}
                                />
                            </div>
                            <div>
                                <br />
                                <select
                                    name="arrivalAmPm"
                                    id="arrivalAmPm"
                                    value={details.arriveAmPm}
                                    onChange={(e) => {
                                        setDetails((details) => ({
                                            ...details,
                                            arriveAmPm: e.target.value,
                                        }))
                                    }}
                                >
                                    <option value="am">AM</option>
                                    <option value="pm">PM</option>
                                </select>
                            </div>
                        </div>

                        <div className="section-subLabel">
                            Departure - Date and Time
                        </div>
                        <div className="section-row schedule">
                            <div>
                                <label htmlFor="departDate">Date</label>
                                <br />
                                <input
                                    required
                                    type="text"
                                    name="departDate"
                                    id="departDate"
                                    placeholder="MM-DD-YYYY"
                                    value={details.departDate}
                                    onChange={(e) => {
                                        setDetails((details) => ({
                                            ...details,
                                            departDate: e.target.value,
                                        }))
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="departTime">
                                    Hours Minutes
                                </label>
                                <br />
                                <input
                                    required
                                    type="text"
                                    name="departTime"
                                    id="departTime"
                                    placeholder="HH:MM"
                                    value={details.departTime}
                                    onChange={(e) => {
                                        setDetails((details) => ({
                                            ...details,
                                            departTime: e.target.value,
                                        }))
                                    }}
                                />
                            </div>
                            <div>
                                <br />
                                <select
                                    name="AmPm"
                                    id="AmPm"
                                    value={details.departAmPm}
                                    onChange={(e) => {
                                        setDetails((details) => ({
                                            ...details,
                                            departAmPm: e.target.value,
                                        }))
                                    }}
                                >
                                    <option value="am">AM</option>
                                    <option value="pm">PM</option>
                                </select>
                            </div>
                        </div>

                        <div className="section-row">
                            <div>
                                <label htmlFor="adults">Number of Adults</label>
                                <br />
                                <input
                                    required
                                    type="number"
                                    name="adults"
                                    id="adults"
                                    placeholder="ex: 23"
                                    value={details.numOfAdults}
                                    onChange={(e) => {
                                        setDetails((details) => ({
                                            ...details,
                                            numOfAdults: e.target.value,
                                        }))
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="kids">
                                    Number of Kids (If any)
                                </label>
                                <br />
                                <input
                                    required
                                    type="number"
                                    name="kids"
                                    id="kids"
                                    placeholder="ex: 23"
                                    value={details.numOfKids}
                                    onChange={(e) => {
                                        setDetails((details) => ({
                                            ...details,
                                            numOfKids: e.target.value,
                                        }))
                                    }}
                                />
                            </div>
                        </div>

                        <div className="section-row">
                            <div className="total">
                                <div className="total-label">Room Rate:</div>
                                <div className="total-fee">
                                    ₱ {details.roomRate}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="section">
                        <div className="section-row">
                            <button
                                className="btn-submit-reservation"
                                type="button"
                                onClick={() => {
                                    handleSubmit(details)
                                    closeModal()
                                }}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </main>
            </form>
        </div>
    )
}

export default ReservationForm
