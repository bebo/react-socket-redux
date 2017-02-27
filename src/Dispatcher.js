/**
 * Created by jonas on 2/25/17.
 */
import React, { PropTypes } from 'react';
import {connect} from 'react-redux';

class Dispatcher extends React.Component{
  static displayName = 'SocketDispatcher';
  static contextTypes = {
    socket: PropTypes.shape({
      subscribe: PropTypes.func.isRequired,
      send: PropTypes.func.isRequired
    }).isRequired
  };
  static propTypes = {
    route: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ]).isRequired,
    type: PropTypes.string.isRequired
  };

  componentWillMount(){
    const {socket} = this.context;
    const {dispatch, route, type} = this.props;
    this.unsub = socket.subscribe(route, res => dispatch({type, payload: res}));
  }

  componentWillUnmount(){
    if(this.unsub){
      this.unsub()
    }
  }

  render(){
    return null;
  }
}

export default connect()(Dispatcher);