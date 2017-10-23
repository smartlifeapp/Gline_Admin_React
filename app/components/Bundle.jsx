import { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'actions';

class Bundle extends Component {
  componentWillMount() {
    this.load(this.props);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }
  load(props) {
    this.props.deleteModule();
    props.load((mod) => {
      this.props.addModule(mod.default ? mod.default : mod);
    });
  }
  render() {
    return this.props.children(this.props.module);
  }
}

function mapStateToProps(state) {
  return {
    module: state.module,
  };
}

Bundle = connect(mapStateToProps, actions)(Bundle);

export default Bundle;
