import React, { Component } from 'react';

export class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            categories: [
                {
                    key: 'all',
                    name: 'Все'
                },
                {
                    key: 'c1',
                    name: 'Категория-1'
                },
                {
                    key: 'c2',
                    name: 'Категория-2'
                },
                {
                    key: 'c3',
                    name: 'Категория-3'
                },
                {
                    key: 'c4',
                    name: 'Категория-4'
                },
            ],
            ip: '',
        };
    }

    handleFormOpen = () => {
        this.setState({ isOpen: true });
    };

    handleFormClose = () => {
        this.setState({ isOpen: false });
    };

    render() {
        const { isOpen } = this.state;
        return (
            <>
                {isOpen && (
                    <div className="full-item">
                        <div className="modal-content">
                            <div className="categories">
                                <o style={{ position: "relative", display: "block" }}>Категории товаров 1</o>
                                {this.state.categories.map(el => (

                                    <li key={el.key} onClick={() => this.props.chooseCategory(el.key)}>{el.name}</li>

                                ))}
                            </div>
                            <div className='closeButton' onClick={this.handleFormClose}>hide</div>
                        </div>
                    </div>
                )}
                <div className='trigger-background'>
                    <div className='trigger' onClick={this.handleFormOpen} >Отсортировать</div>
                </div >
            </>
        );
    }
}

export default Categories;
