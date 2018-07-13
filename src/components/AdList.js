import React, { Component } from 'react';
import Ad from './Ad';
import EventEmitter from 'EventEmitter';

window.ee = new EventEmitter();

class AdList extends Component {
  state = {
    ads: [],
    isloaded: true
  }

  componentDidMount() {
    if (this.state.isloaded && localStorage.getItem('ads')) {
      this.setState({
        ads: JSON.parse(localStorage.getItem('ads')),
        isloaded: false
      })
    }
    window.ee.on('ads.add', (ad) => {
      const nextAd = ad.concat(this.state.ads);
      this.setState({ads: nextAd});
      localStorage.setItem('ads', JSON.stringify(nextAd));
    });
  }

  componentWillUnmount() {
    window.ee.off('ads.add');
  }

  removeAd = index => {
    const allAds = this.state.ads;
    const updateAds = allAds.filter((item, i) => index !== i);
    this.setState({
      ads: updateAds
    })
    localStorage.setItem('ads', JSON.stringify(updateAds));
  }

  render () {
    if (this.state.ads.length > 0) {
      const adElements = this.state.ads.map((ad, index) => {
        return <li key={index}>
                 <Ad
                    ad = {ad}
                    onButtonClick = {this.removeAd.bind(this, index)} />
               </li>
        });
      return (
        <div className="wrapper-ad">
          <h2>Другие объявления</h2>
          <ul>
            {adElements}
          </ul>
        </div>
      );
    }

    return null;
  }
};

export default AdList;
