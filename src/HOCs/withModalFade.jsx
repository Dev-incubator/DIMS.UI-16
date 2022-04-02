import { PureComponent } from 'react';

export const withModalFade = (Component) => {
  return class extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        active: true,
      };
    }

    onClose = () => {
      // eslint-disable-next-line react/prop-types
      const { disableModalMode } = this.props;
      this.setState({ active: false });
      disableModalMode();
    };

    setFade = () => {
      this.setState({ active: false });
    };

    render() {
      const { props } = this;
      const { active } = this.state;

      return <Component {...props} onClose={this.onClose} setFade={this.setFade} active={active} />;
    }
  };
};
