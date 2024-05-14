import React, { Component } from 'react';

class Requisites extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Информация скопирована в буфер обмена!');
    } catch (err) {
      console.error('Ошибка копирования в буфер обмена:', err);
      alert('Не удалось скопировать информацию.');
    }
  }

  render() {
    return (
      <>
        <div className='conditions'>
          <p style={{borderBottom:"solid 2px #000000"}}>Раздел реквизиты</p>
          <div>{/*-----------------------*/}</div>
          <div style={{cursor:"pointer"}} onClick={() => this.copyToClipboard('SoftSeason©')}>Продавец: SoftSeason©</div>
          <div>{/*-----------------------*/}</div>
          <div style={{cursor:"pointer"}} onClick={() => this.copyToClipboard('Московская область, г. Люберцы, Комсомольский проспект, 18/1, кв.227')}>Адрес для возвратов: Московская область, г. Люберцы, Комсомольский проспект, 18/1, кв.227</div>
          <div>{/*-----------------------*/}</div>
          <div>Реквизиты счета</div>
          <div>{/*-----------------------*/}</div>
          <div>Получатель: Рябцев Никита Юрьевич</div>
          <div>{/*-----------------------*/}</div>
          <div style={{cursor:"pointer"}} onClick={() => this.copyToClipboard('40817810700032579761')}>Номер счета: 40817810700032579761</div>
          <div>{/*-----------------------*/}</div>
          <div style={{cursor:"pointer"}} onClick={() => this.copyToClipboard('044525974')}>БИК: 044525974</div>
          <div>{/*-----------------------*/}</div>
          <div style={{cursor:"pointer"}} onClick={() => this.copyToClipboard('АО «Тинькофф Банк»')}>Банк-получатель: АО «Тинькофф Банк»</div>
          <div>{/*-----------------------*/}</div>
          <div style={{cursor:"pointer"}} onClick={() => this.copyToClipboard('30101810145250000974')}>Корр. Счет: 30101810145250000974</div>
          <div>{/*-----------------------*/}</div>
          <div style={{cursor:"pointer"}} onClick={() => this.copyToClipboard('7710140679')}>ИНН при необходимости: 7710140679</div>
          <div>{/*-----------------------*/}</div>
          <div style={{cursor:"pointer"}} onClick={() => this.copyToClipboard('771301001')}>КПП при необходимости: 771301001</div>
          <div>{/*-----------------------*/}</div>
        </div>
      </>
    )
  }
}

export default Requisites;
