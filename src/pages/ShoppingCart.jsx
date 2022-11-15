import React, { Component } from 'react';

export default class ShoppingCart extends Component {
  state = {
    data: [],
    empty: true,
  };

  componentDidMount() {
    const prevData = [];
    const newData = [];
    const cartData = JSON.parse(localStorage.getItem('dataCart'));

    if (cartData !== null) {
      const treatment = cartData.map((item) => item.name);
      treatment.forEach((item) => {
        if (!prevData.includes(item)) {
          prevData.push(item);
        }
      });
    }

    prevData.forEach((item) => {
      const value = cartData.find((item2) => item2.name === item);
      if (value) newData.push(value);
    });

    this.setState({ data: newData });
    const { data } = this.state;
    if (data.length === 0 && cartData === null) {
      this.setState({ empty: true });
    } else {
      this.setState({ empty: false });
    }
  }

  decreaseItem = ({ target }) => {
    const { id } = target;
    const { data } = this.state;
    const searchItem = data.findIndex((item) => item.name === id);
    if (data[searchItem].numero > 1) {
      data[searchItem].numero -= 1;
      if (data !== null) {
        this.setState({
          data,
        });
        localStorage.setItem('dataCart', JSON.stringify(data));
      }
    }
  };

  removeItem = ({ target }) => {
    const { id } = target;
    const { data } = this.state;
    const searchItem = data.filter((item) => item.name !== id);
    if (data !== null) {
      this.setState({
        data: searchItem,
      });
      localStorage.setItem('dataCart', JSON.stringify(data));
    }
  };

  increaseItem = ({ target }) => {
    const { data } = this.state;
    const { id } = target;
    const searchItem = data.findIndex((item) => item.name === id);
    if (data[searchItem].numero >= 1) {
      data[searchItem].numero += 1;
      if (data !== null) {
        this.setState({
          data,
        });
        localStorage.setItem('dataCart', JSON.stringify(data));
      }
    }
  };

  render() {
    const { data, empty } = this.state;
    return (
      <div>

        <h2>Shopping Cart</h2>
        {
          empty ? (
            <span data-testid="shopping-cart-empty-message">Seu carrinho está vazio</span>
          ) : (
            <div>
              {
                data.map((item, index) => (
                  <div id="sla" key={ index }>

                    <button
                      data-testid="remove-product"
                      id={ item.name }
                      type="button"
                      onClick={ this.removeItem }
                    >
                      x
                    </button>

                    <h3 data-testid="shopping-cart-product-name">{ item.name }</h3>
                    <img src={ item.image } alt={ item.name } />
                    <p>{ item.price }</p>

                    <button
                      data-testid="product-decrease-quantity"
                      id={ item.name }
                      type="button"
                      onClick={ this.decreaseItem }
                    >
                      -
                    </button>

                    <span
                      id={ item.name }
                      data-testid="shopping-cart-product-quantity"
                      // onChange={ }
                    >
                      { item.numero }

                    </span>

                    <button
                      data-testid="product-increase-quantity"
                      id={ item.name }
                      type="button"
                      onClick={ this.increaseItem }
                    >
                      +
                    </button>

                  </div>
                ))
              }
            </div>)
        }
      </div>
    );
  }
}
