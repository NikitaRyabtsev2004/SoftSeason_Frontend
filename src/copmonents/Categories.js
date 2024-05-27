import React, { Component } from 'react';
import Review from "./Review.js";
import category from '../source/CategoryData.js';
import material from '../source/MaterialData.js';
import color from '../source/ColorData.js';
import EditModal from './EditModal.js';


export class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isOpenReview: false,
            isOpenEdit: false,
            categoriesAll: [
                {
                    key: 'all',
                    name: 'Все'
                }
            ],
            categoriesCloth: [...category.slice(1, 11).map((cat, index) => ({
                key: cat,
                name: category[index + 1]
            }))],
            categoriesMaterial: [...material.slice(1, 11).map((dog, index) => ({
                key: dog,
                name: material[index + 1]
            }))],
            categoriesColor: [...color.slice(1, 14).map((cow, index) => ({
                key: cow,
                name: color[index + 1]
            }))],
            ip: '',
        };
    }


    handleFormOpen = () => {
        this.setState({ isOpen: true });
    };

    handleFormClose = () => {
        this.setState({ isOpen: false });
    };

    handleFormOpenReview = () => {
        this.setState({ isOpenReview: true });
    };

    handleFormCloseReview = () => {
        this.setState({ isOpenReview: false });
    };

    handleFormOpenEdit = () => {
        this.setState({ isOpenEdit: true });
    };

    handleFormCloseEdit = () => {
        this.setState({ isOpenEdit: false });
    };

    render() {
        const {isOpenEdit} = this.state;
        const { isOpen } = this.state;
        const { isOpenReview } = this.state;
        return (
            <>
                {isOpen && (
                    <div className="full-item">
                        <div className="modal-content">
                            <div className="categories">

                                {/*1*/}
                                <div className='liDiv'>
                                    <o style={{ position: "relative", display: "block", fontSize:"30px"}}>Категории товаров</o>
                                    {this.state.categoriesAll.map(el => (
                                        <li className="liAll" key={el.key} onClick={() => this.props.chooseCategory(el.key)}>
                                            {el.name}
                                        </li>
                                    ))}
                                </div>

                                {/*2*/}
                                <div className='liDiv'>
                                    <o style={{ position: "relative", display: "block" }}>Одежда</o>
                                    {this.state.categoriesCloth.map(el => (
                                        <li className="liCloth" key={el.key} onClick={() => this.props.chooseCategory(el.key)}>
                                            {el.name}
                                        </li>
                                    ))}
                                </div>

                                {/*3*/}
                                <div className='liDiv'>
                                    <o style={{ position: "relative", display: "block" }}>Материалы</o>
                                    {this.state.categoriesMaterial.map(el => (
                                        <li className="liMaterial" key={el.key} onClick={() => this.props.chooseCategory(el.key)}>
                                            {el.name}
                                        </li>
                                    ))}
                                </div>

                                {/*3*/}
                                <div className='liDiv'>
                                    <o style={{ position: "relative", display: "block" }}>Материалы</o>
                                    {this.state.categoriesColor.map(el => (
                                        <li className="liColor" key={el.key} onClick={() => this.props.chooseCategory(el.key)}>
                                            {el.name}
                                        </li>
                                    ))}
                                </div>
                                {/*-*/}
                            </div>
                            <div className='closeButton' onClick={this.handleFormClose}>✖</div>
                        </div>
                    </div>
                )}

                {isOpenReview && (
                    <div className="full-item">
                        <div className='review'>
                            <div className="modal-content">
                                <Review />
                                <div className='closeButton' onClick={this.handleFormCloseReview}>✖</div>
                            </div>
                        </div>
                    </div>
                )}
                {isOpenEdit && (
                    <div className="full-item">
                        <div className='review'>
                            <div className="modal-content">
                                <EditModal></EditModal>
                                <div className='closeButton' onClick={this.handleFormCloseEdit}>✖</div>
                            </div>
                        </div>
                    </div>
                )}
                <div className='trigger-background'>
                    <div className='trigger' onClick={this.handleFormOpen} >Отсортировать</div>
                    <div className='trigger' onClick={this.handleFormOpenReview}>Отзывы</div>
                    <a href="https://webmaster.yandex.ru/siteinfo/?site=softseason.ru"><img class="rounded-corner" width="72" height="26" alt="" border="0" src="https://yandex.ru/cycounter?softseason.ru&theme=light&lang=ru"/></a>
                    {localStorage.getItem('email') === 'nekit100118@gmail.com' && (
                        <div className='trigger' onClick={this.handleFormOpenEdit}>Редактировать</div>
                    )}
                </div >
            </>
        );
    }
}

export default Categories;
