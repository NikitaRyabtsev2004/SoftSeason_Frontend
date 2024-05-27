import React, { Component } from 'react';
import color from "../source/ColorData.js";
import material from "../source/MaterialData.js";
import category from '../source/CategoryData.js';
export class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      img: '',
      imgMacro: '',
      desc: '',
      category: '',
      price: '',
      material: '',
      color: '',
    };
  }

  handleSubmitErase = () => {
    fetch(`https://${window.location.hostname}/api/erase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
   .then(response => response.json())
   .then(data => {
      if (data.message) {
        alert(data.message);
      }
    })
   .catch(error => {
      console.error('Ошибка:', error);
    });
  };

  handleDescChange = (e) => {

    const inputValue = e.target.value;
    const regex = /(\{[^}]+\})/g;
    let match;
    const inputValues = [];
  
    while ((match = regex.exec(inputValue))!== null) {
      inputValues.push(match[1]);
    }
    const values = {
      size: inputValues[0],
      length: inputValues[1],
      width: inputValues[2],
      sleeve: inputValues[3],
      weight: inputValues[4]
    };
    const descTemplate = `<div style={{ alignItems: 'center', textAlign: 'right', fontSize: '24px' }}><div>Категория: ${this.state.category}</div><div>Тип волокна: {${this.state.material}}</div><div>Размер: ${values.size}</div><div>Длина: ${values.length}</div><div>Ширина: ${values.width}</div><div>Рукав: ${values.sleeve}</div><div>Масса: ${values.weight}</div><div>{wash}</div></div>`;
    this.setState({ desc: descTemplate });
    console.log(this.state.desc);
  };
  

  handleImgChange = (e) => {
    const ImgName = e.target.value;
    this.setState({ img: `['${ImgName}']` });
    console.log(this.state.img)
  };
 
  handleImgMacroChange = (e) => {
    const ImgMacroName = e.target.value;
    this.setState({ imgMacro: `['${ImgMacroName}']` });
    console.log(this.state.imgMacro)
  };

  handleColorChange = (e) => {
    const colorName = e.target.value;
    const colorIndex = color.findIndex(c => c.includes(colorName));
    this.setState({ color: `color[${colorIndex}]` });
    console.log(this.state.color)
  };

  handleMaterialChange = (e) => {
    const materialName = e.target.value;
    const materialIndex = material.findIndex(m => m.includes(materialName));
    this.setState({ material: `material[${materialIndex}]` });
    console.log(this.state.material)
  };

  handleCategoryChange = (e) => {
    const categoryName = e.target.value;
    const categoryIndex = category.findIndex(cat => cat === categoryName);
    this.setState({ category: `category[${categoryIndex}]` });
    console.log(this.state.category)
  };

  handleAddImage = (type) => {
    const image = prompt('Введите имя файла изображения');
    if (image) {
      this.setState((prevState) => ({
        [type]: [...prevState[type], image]
      }));
    }
  };

  handleFileChange1 = (e) => {
    this.setState({ selectedFile1: e.target.files[0] });
  };

  handleFileUpload1 = () => {
    const formData = new FormData();
    formData.append('file', this.state.selectedFile1);

    fetch(`https://${window.location.hostname}/api/upload1`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        alert('Файл успешно загружен!');
        this.setState({ img: [...this.state.img, data.filePath1] }); 
      })
      .catch(error => {
        console.error('Ошибка при загрузке файла:', error);
      });
  };

  handleFileChange2 = (e) => {
    this.setState({ selectedFile2: e.target.files[0] });
  };

  handleFileUpload2 = () => {
    const formData = new FormData();
    formData.append('file', this.state.selectedFile2);

    fetch(`https://${window.location.hostname}/api/upload2`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        alert('Файл успешно загружен!');
        this.setState({ img: [...this.state.img, data.filePath2] });
      })
      .catch(error => {
        console.error('Ошибка при загрузке файла:', error);
      });
  };

  handleSubmit = () => {
    fetch(`https://${window.location.hostname}/api/insertDataBase`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.title,
        img: this.state.img,
        imgMacro: this.state.imgMacro,
        desc: this.state.desc,
        category: this.state.category,
        price: this.state.price,
        material: this.state.material,
        color: this.state.color
      }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          alert('Отзыв отправлен!');
        }
      })
      .catch((error) => {
          console.error('Ошибка:', error);
      });
  };
  

  render() {
    return (
      <div className="modal">
        <div className="modal-content">
          {/*-----------------------*/}
          <label className='address1' htmlFor="adress">id :
            </label>
            <input
              className='address'
              type="address"
              id="address"
              name="address"
              value={this.state.id}
              onChange={(e) => this.setState({ id: e.target.value })}
              required
          />
          {/*-----------------------*/}
          <label className='address1' htmlFor="adress">Название :
            </label>
            <input
              className='address'
              type="address"
              id="address"
              name="address"
              value={this.state.title}
              onChange={(e) => this.setState({ title: e.target.value })}
              required
          />
          {/*-----------------------*/}
          <label className='address1' htmlFor="adress">Фото :
            </label>
            <input
              className='address'
              type="address"
              id="address"
              name="address"
              onChange={this.handleImgChange}
              required
          />
          {/*-----------------------*/}
          <label className='address1'>Загрузить изображение:</label>
          <input type="file" onChange={this.handleFileChange1} />
          <button onClick={this.handleFileUpload1}>Загрузить файл</button>
          {/*-----------------------*/}
          <label className='address1' htmlFor="adress">Фото-макро :
            </label>
            <input
              className='address'
              type="address"
              id="address"
              name="address"z
              onChange={this.handleImgMacroChange}
              required
          />
          {/*-----------------------*/}
          <label className='address1'>Загрузить изображение:</label>
          <input type="file" onChange={this.handleFileChange2} />
          <button onClick={this.handleFileUpload2}>Загрузить файл</button>
          {/*-----------------------*/}
          <label className='address1' htmlFor="adress">Описание :
            </label>
            <input
              className='address'
              type="address"
              id="address"
              name="address"
              onChange={this.handleDescChange}
              required
          />
          {/*-----------------------*/}
          <label className='address1' htmlFor="adress">Категория :
            </label>
            <input
              className='address'
              type="address"
              id="address"
              name="address"
              onChange={this.handleCategoryChange}
              required
          />
          {/*-----------------------*/}
          <label className='address1' htmlFor="adress">Цена :
            </label>
            <input
              className='address'
              type="address"
              id="address"
              name="address"
              value={this.state.price}
              onChange={(e) => this.setState({ price: e.target.value })}
              required
          />
          {/*-----------------------*/}
          <label className='address1' htmlFor="adress">Материал :
            </label>
            <input
              className='address'
              type="address"
              id="address"
              name="address"
              onChange={this.handleMaterialChange}
              required
          />
          {/*-----------------------*/}
          <label className='address1' htmlFor="adress">Цвет :
            </label>
            <input
              className='address'
              type="address"
              id="address"
              name="address"
              onChange={this.handleColorChange}
              required
          />
          {/*-----------------------*/}
          <button onClick={this.handleSubmit}>Добавить товар</button>
          <button onClick={this.handleSubmitErase}>erase</button>
        </div>
      </div>
    );
  }
}

export default EditModal;
