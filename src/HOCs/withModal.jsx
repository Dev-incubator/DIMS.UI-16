import { PureComponent } from 'react';
import { MODAL_MODES } from '../constants/libraries';

export const withModal = (Component) => {
  return class extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        mode: null,
        actionId: null,
      };
    }

    closeModal = () => {
      setTimeout(() => {
        this.setState({ mode: null, actionId: null });
      }, 300);
    };

    openModal = (mode = MODAL_MODES.create, actionId = null) => {
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
