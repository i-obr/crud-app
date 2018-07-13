import React, { Component } from 'react';

class Ad extends Component {

  render() {
    const {ad, onButtonClick} = this.props;
    return (
      <div>
        <p className="title">{ad.name}</p>
        <p className="city">{ad.city}</p>
        <p className="desc">{ad.description}</p>
        <p className="phone">{ad.phoneNumber}</p>
        <button onClick={onButtonClick}>Удоли</button>
      </div>
    )
  }
}

export default Ad;
