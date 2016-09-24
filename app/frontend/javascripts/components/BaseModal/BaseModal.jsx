import React, {Component} from 'react';
import classNames from 'classnames';

class BaseModal extends Component {
  closeModal() {
    let {closeModal} = this.props;
    closeModal && closeModal();
  }

  render() {
    let {children, showModal, modalContainerClass, modalWrapperClass} = this.props;

    let modalClass = classNames('modal_component', {
      active: showModal
    });
    let containerClass = modalContainerClass ? `modal_container ${modalContainerClass}` : 'modal_container';
    modalClass = modalWrapperClass ? `${modalClass} ${modalWrapperClass}` : modalClass;
    return (
      <div className={modalClass}>
        <div className="modal_wrapper" onClick={this.closeModal.bind(this)}></div>
        <div className={containerClass}>
          {children}
        </div>
      </div>
    )
  }
}

export default BaseModal;
