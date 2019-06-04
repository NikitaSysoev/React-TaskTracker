import React from 'react';

const DnD = () => {
    return (
        <div className="row" style={{ marginTop: '20px' }}>
            <div class="col-sm-4">
                <div id="todoListCard" class="card">
                    <div class="card-body card-body-dnd">
                        <h3>To Do</h3>
                        <ul class="list-group">
                            <li class="list-group-item">
                                <strong class="text-secondary">Список пуст</strong>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div id="inprogressListCard" class="card">
                    <div class="card-body card-body-dnd">
                        <h3>In progress</h3>
                        <ul class="list-group" id="inprogresslist">
                            <li class="list-group-item">
                                <strong class="text-secondary">Список пуст</strong>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div id="doneListCard" class="card">
                    <div class="card-body card-body-dnd">
                        <h3>Done</h3>
                        <ul class="list-group" id="donelist">
                            <li class="list-group-item">
                                <strong class="text-secondary">Список пуст</strong>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DnD;