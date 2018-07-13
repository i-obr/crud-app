import React, { Component } from 'react';
import InputMask from "react-input-mask";

const isValidField = name => name === '';

const isValidSize = (name, size) => name.length > size;

class AdForm extends Component {
  state = {
    nameAd: '',
    description: '',
    phoneNumber: '',
    city: '',
    fail: {
      nameAd: [],
      description: '',
      phoneNumber: ''
    }
  }

  onNameAdHandler = (e) => {
    this.setState({
      nameAd: e.target.value
    })
  }

  onDescriptionHandler = (e) => {
    this.setState({
      description: e.target.value
    })
  }

  onPhoneNumberHandler = (e) => {
    this.setState({
      phoneNumber: e.target.value
    })
  }

  onCityHandler = (e) => {
    this.setState({
      city: e.target.value
    })
  }

  onSubmitHandler = (e) => {
    e.preventDefault();
    const errorMsgName = isValidField(this.state.nameAd) ? 'Поле не должно быть пустым' : '';
    const errorMsgNameSize = isValidSize(this.state.nameAd, 100) ? 'Длинна текста не должна превышать 100 символов' : '';
    const errorMsgDescriptionSize = isValidSize(this.state.description, 300) ? 'Длинна текста не должна превышать 300 символов' : '';
    const errorMsgPhoneNumber = isValidField(this.state.phoneNumber) ? 'Поле не должно быть пустым' : '';

    this.setState({
      fail: {
        nameAd: [errorMsgName, errorMsgNameSize].filter(elem => !!elem),
        description: errorMsgDescriptionSize,
        phoneNumber: errorMsgPhoneNumber
      }
    },
    () => {
      if (this.state.fail.nameAd.length === 0 &&
          this.state.fail.description === '' &&
          this.state.fail.phoneNumber === '') {
        const ads = [{
          name: this.state.nameAd,
          description: this.state.description,
          phoneNumber: this.state.phoneNumber,
          city: this.state.city
        }];

        window.ee.emit('ads.add', ads);

        this.setState({
          nameAd: '',
          description: '',
          phoneNumber: ''
        })
      }
    })
  }

  render() {
    const fails = this.state.fail;
    return (
      <div className="form-wrapper">
        <h1>Создать объявление</h1>
        <form className="form" onSubmit = {this.onSubmitHandler}>
          <label>
            Введите название объявления
            <input
              type="text"
              value = {this.state.nameAd}
              placeholder="Максимум 100 символов"
              maxLength="100"
              onChange = {this.onNameAdHandler} />
            {fails.nameAd.length ? fails.nameAd.map((fail, index) => <span className="error" key={index}>{fail}</span>) : ''}
          </label>
          <label>
            Добавьте описание
            <textarea
              rows="5"
              cols="28"
              value = {this.state.description}
              placeholder="Максимум 300 символов"
              maxLength="300"
              onChange = {this.onDescriptionHandler} />
            {fails.description !== '' ? <span className="error" >{fails.description}</span> : ''}
          </label>
          <label>
            Введите номер телефона
            <InputMask
              type="tel"
              value={this.state.phoneNumber}
              onChange={this.onPhoneNumberHandler}
              mask="+7 (999) 999-99-99"
              placeholder="+7 (___) ___-__-__"/>
            {fails.phoneNumber !== '' ? <span className="error" >{fails.phoneNumber}</span> : ''}
          </label>
          <select value = {this.state.city} onChange = {this.onCityHandler}>
            <option value="Moscow">Москва</option>
            <option value="Tver">Тверь</option>
            <option value="Khabarovsk">Хабаровск</option>
            <option value="Maiami">Майами</option>
          </select>
          <button type="submit">Добавить</button>
        </form>
      </div>
    )
  }
}

export default AdForm;
