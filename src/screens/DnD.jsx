import React from 'react';

const DnD = () => {
    return (
        <div className="row" style={{ marginTop: '20px' }}>
            <div className="col-sm-4">
                <div className="card">
                    <div className="card-body card-body-dnd">
                        <h3>To Do</h3>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <strong className="text-secondary">Список пуст</strong>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-sm-4">
                <div className="card">
                    <div className="card-body card-body-dnd">
                        <h3>In progress</h3>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <strong className="text-secondary">Список пуст</strong>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-sm-4">
                <div className="card">
                    <div className="card-body card-body-dnd">
                        <h3>Done</h3>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <strong className="text-secondary">Список пуст</strong>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DnD;