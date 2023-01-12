const AdminButton = ({ room, editRoom }: any) => {
    return (
        <>
            <button
                className="btn-reserve"
                onClick={() => {
                    editRoom(room.roomNumber)
                }}
            >
                Modify
            </button>
        </>
    )
}

export default AdminButton
