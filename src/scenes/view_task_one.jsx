import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import ViewTaskModal from '../components/task/view_task';
import * as URL from '../router/url';

class ViewTaskOne extends React.Component {
    static propTypes = {
        taskList: PropTypes.array,
        children: PropTypes.object,
    };

    componentDidMount() {
        const { code: indexId } = this.props.match.params;
        console.log("this.props.history", this.props.history);
        if (!this.props.taskList.find(item => item.id === indexId)) {
            this.props.history.push('/404');
        }
    }

    render() {
        const { code: indexId } = this.props.match.params;
        const content = this.props.taskList ?
            this.props.taskList.find(item => item.id === indexId) : null;
        if (!content) {
            this.props.history.replace('sdfsdfkjh');
        }
        return (
            <div className="container">
                <div className='row'>
                    <div className='col-md-12'>
                        <br />
                        <h3>Просмотр задачи</h3>
                        <br />
                        {
                            content ? (<ViewTaskModal data={content} />) :
                                (<h2>Не удалось обнаружить задачу с номером {indexId}</h2>)
                        }
                    </div>
                </div>
                <div className="row">
                    <div className='col-md-12'><br />
                        <Link
                            to={URL.URL_TASK_FORM}
                            className='btn btn-outline-dark'
                        >
                            <FontAwesomeIcon icon={faAngleLeft} />&nbsp;
							список задач
						</Link>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = store => {
    return {
        taskList: store.app.taskList
    }
}


export default connect(mapStateToProps, null)(withRouter(ViewTaskOne));