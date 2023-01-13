import NewAddRoom from '../AddRoom/NewAddRoom';
import './UtilBar.css';

const UtilBar = ({ currentFilter, setFilter, handleSubmit }: any) => {
    return (
        <div className="util-bar">
            <div className="status-selector">
                <label htmlFor="statusFilter">Status</label>
                <select
                    name="statusFilter"
                    id="statusFilter"
                    value={currentFilter}
                    onChange={(e) => {
                        setFilter(e.target.value);
                    }}
                >
                    <option value="all">All</option>
                    <option value="operational">Operational</option>
                    <option value="unoperational">Not operational</option>
                </select>
            </div>

            <NewAddRoom handleSubmit={handleSubmit} />
        </div>
    );
};

export default UtilBar;
