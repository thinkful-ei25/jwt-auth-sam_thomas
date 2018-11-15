import React from 'react';
import {connect} from 'react-redux';

import {showDialog, hideDialog, setLogoutTime} from '../actions/activity';

import {clearAuth} from '../actions/auth';

export class ActivityDialog extends React.Component {

  componentWillReceiveProps(nextProps){
    if (!this.props.loggedIn && nextProps.loggedIn) {
      this.startCountdown();
    } else if (this.props.loggedIn && !nextProps.loggedIn) {
      this.stopCountdown();
    }
  }


  startCountdown(){
    //5 minute wait time, imported from app.js 
    const ms = this.props.minutes * 60 * 1000;
    //dialog should only show with a minute left, not 5
    this.props.dispatch(hideDialog());
    //take the current time
    this.props.dispatch(setLogoutTime(new Date().getTime()+ms));
    //logout after a 5 minute wait
    this.logoutTimeout = setTimeout(()=>this.logOut(), ms);
    //show the dialog when a minute out
    this.showTimeout = setTimeout(()=>this.show(), ms-60*1000);
  

    this.clickListener = () => this.restartCountdown();
    window.addEventListener('click', this.clickListener);

  }

  stopCountdown(){
    if(this.showTimeout){
      clearTimeout(this.showTimeout);
      this.showTimeout=null;
    }
    if(this.logoutTimeout){
      clearTimeout(this.logoutTimeout);
      this.logoutTimeout=null;
    }
    if(this.rerenderInterval){
      clearInterval(this.rerenderInterval);
      this.clearInterval = null;
    }
    if (this.clickListener) {
      window.removeEventListener('click', this.clickListener);
      this.clickListener = null;
    }

  }

  restartCountdown(){
    this.stopCountdown();
    this.startCountdown();
  }

  logOut(){
    //reset timeout stuff to null
    this.logoutTimeout = null;
    this.props.dispatch(clearAuth());
    this.props.dispatch(hideDialog());

  }

  show() {
    // We aren't waiting to show the dialog any more
    this.showTimeout = null;
    // Show the dialog
    this.props.dispatch(showDialog());
    // Rerender the dialog every second to update the countdown timer
    this.rerenderInterval = setInterval(() => this.forceUpdate(), 1000);
    // Clicks anywhere are no longer good enough to restart - you have to hit
    // the button
    window.removeEventListener('click', this.clickListener);
    this.clickListener = null;
  }

  render(){

    if (!this.props.showDialog) {
      return <div className="refresh-dialog hidden"/>;
    }


    const now = new Date().getTime();
    
    const timeRemaining =
            Math.floor((this.props.logoutTime - now) / 1000) + 1;
        const unit = timeRemaining > 1 ? 'seconds' : 'second';

    return (
      <div className="refresh-dialog">
        <div>
          You will be logged out in {timeRemaining} {unit}
        </div>
        <button onClick={() => this.restartCountdown()}>
          Keep me logged in
                </button>
      </div>
    );
  }
}

export const mapStateToProps = (state,props)=>({
  loggedIn: state.auth.currentUser !== null,
  showDialog: state.activity.showDialog,
  logoutTime: state.activity.logoutTime
});

export default connect(mapStateToProps)(ActivityDialog);