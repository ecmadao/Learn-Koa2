import React, {Component} from 'react';
import BaseModal from '../BaseModal/index';

class LoadingModal extends Component {
  render() {
    let {showModal} = this.props;
    return (
      <BaseModal
        showModal={showModal}
        modalWrapperClass="loading_modal_container"
        >
        <div className="loading_bounce"></div>
        <div className="loading_bounce"></div>
      </BaseModal>
    )
  }
}

export default LoadingModal;
