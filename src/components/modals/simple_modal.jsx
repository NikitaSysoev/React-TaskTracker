import React from 'react';
import PropTypes from 'prop-types';


const Modal = (props) => {
	const {
		title,
		onActionClick: handleAction ,
		onCancelClick: handleCancel,
		children,
		cancelBtn = "Cancel",
		actionBtn = "Ok",
		display = false,
	} = props;
	console.log("Modal: ", display)
	return display && (
		<div id="modal1" className="modal" tabIndex="-1" role="dialog" style={ {display: "block"} }>
			<div className="modal-dialog modal-lg" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{ title }</h5>
						<button onClick={ handleCancel } type="button" className="close" data-dismiss="modal"
						        aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div id="modalContent" className="modal-body">
						{
							children
						}
					</div>
					<div className="modal-footer">
						<button
							onClick={ handleCancel }
							type="button"
							className="btn btn-secondary"
			        data-dismiss="modal"
						>
							{ cancelBtn }
						</button>
						<button
							onClick={ handleAction }
							type="button"
							className="btn btn-primary"
						>
							{ actionBtn }
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

Modal.propTypes = {
	title: PropTypes.string,
	onActionClick: PropTypes.func, // клик по кнопке действия (save / ok)
	onCancelClick: PropTypes.func, // клик по кнопке отмена
	children: PropTypes.any, // дети модалки, которые надо отобразить
	cancelBtn: PropTypes.string, // текст для кнопки отмена
	actionBtn: PropTypes.string, // текст для кнопки действия
	display: PropTypes.bool, // отображать или скрыть модалку
};

export default React.memo(Modal);