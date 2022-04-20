import { PureComponent } from 'react';
import { MODAL_MODES } from '../constants/libraries';

export const withModal = (Component) => {
  return class extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        mode: '',
        actionId: '',
      };
    }

    closeModal = () => {
      setTimeout(() => {
        this.setState({ mode: '', actionId: '' });
      }, 300);
    };

    openModal = (mode = MODAL_MODES.create, actionId = '') => {
      this.setState({ mode, actionId });
    };

    render() {
      const { mode, actionId } = this.state;

      return (
        <Component
          {...this.props}
          closeModal={this.closeModal}
          openModal={this.openModal}
          mode={mode}
          actionId={actionId}
        />
      );
    }
  };
};
