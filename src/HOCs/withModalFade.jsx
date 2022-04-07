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
      const { onClose } = this.props;
      this.setFade();
      onClose();
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
    onClose: PropTypes.func.isRequired,
  };

  return Wrapper;
};
