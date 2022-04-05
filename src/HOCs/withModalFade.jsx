import { PureComponent } from 'react';
import PropTypes from 'prop-types';

export const withModalFade = (Component) => {
  class Wrapper extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        active: true,
      };
    }

    onClose = () => {
      const { disableModalMode } = this.props;
      this.setFade();
      disableModalMode();
    };

    setFade = () => {
      this.setState({ active: false });
    };

    render() {
      const { props, setFade, onClose } = this;
      const { active } = this.state;

      return <Component {...props} onClose={onClose} setFade={setFade} active={active} />;
    }
  }

  Wrapper.propTypes = {
    disableModalMode: PropTypes.func.isRequired,
  };

  return Wrapper;
};
