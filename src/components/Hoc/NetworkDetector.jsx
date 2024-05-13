import React, { Component } from 'react';

export default function temp(ComposedComponent) {
  class NetworkDetector extends Component {
    state = {
      isDisconnected: false
    }

    componentDidMount() {
      this.handleConnectionChange();
      window.addEventListener('online', this.handleConnectionChange);
      window.addEventListener('offline', this.handleConnectionChange);
    }

    componentWillUnmount() {
      window.removeEventListener('online', this.handleConnectionChange);
      window.removeEventListener('offline', this.handleConnectionChange);
    }


    handleConnectionChange = () => {
      const condition = navigator.onLine ? 'online' : 'offline';
      if (condition === 'online') {
        const webPing = setInterval(
          () => {
            fetch('//google.com', {
              mode: 'no-cors',
              })
            .then(() => {
              this.setState({ isDisconnected: false }, () => {
                return clearInterval(webPing)
              });
            }).catch(() => this.setState({ isDisconnected: true }) )
          }, 2000);
        return;
      }

      return this.setState({ isDisconnected: true });
    }

    render() {
      const { isDisconnected } = this.state;
      console.log("isDisconnected  ",isDisconnected);
      return (
        <div>
          { isDisconnected && (<div className="internet-error">
              <p className="d-flex justify-content-center bg-danger text-light fw-bold py-2">No Internet Connectionn</p>
            </div>)
          }
          <ComposedComponent {...this.props} />
        </div>
      );
    }
  }

  return NetworkDetector;
}