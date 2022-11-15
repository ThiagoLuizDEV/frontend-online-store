export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const promise = await fetch(url);
  const data = await promise.json();
  return data;
}

export async function getProductsFromCategoryAndQuery($CATEGORY_ID, $QUERY) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${$CATEGORY_ID}&q=${$QUERY}`;
  const promise = await fetch(url);
  const data = await promise.json();
  return data;
}

export async function getProductById(id) {
  const url = `https://api.mercadolibre.com/items/${id}`;
  const promise = await fetch(url);
  const data = await promise.json();
  return data;
}

// export function handleClick({ target }) {
//   const bag = {
//     name: target.title,
//     image: target.name,
//     price: target.id,
//     numero: 1,
//   };

//   const emptyStorage = JSON.parse(localStorage.getItem('dataCart')) === null;
//   const data = JSON.parse(localStorage.getItem('dataCart'));
//   if (emptyStorage) {
//     localStorage.setItem('dataCart', JSON.stringify([bag]));
//   } else {
//     JSON.parse(localStorage.getItem('dataCart'));
//     const dataProducts = [...data, bag];
//     localStorage.setItem('dataCart', JSON.stringify(dataProducts));
//   }
// }

export function checkStorage() {
  const emptyStorage = JSON.parse(localStorage.getItem('dataCart')) === null;
  if (emptyStorage) {
    localStorage.setItem('dataCart', JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem('dataCart'));
}

export function handleClick({ target }) {
  const data = checkStorage();
  const bag = {
    name: target.title,
    image: target.name,
    price: target.id,
    numero: 1,
  };
  const searchIndex = data.findIndex((item) => item.name === target.title);
  if (searchIndex >= 0) {
    data[searchIndex].numero += 1;
    localStorage.setItem('dataCart', JSON.stringify(data));
  } else {
    const dataProducts = [...data, bag];
    localStorage.setItem('dataCart', JSON.stringify(dataProducts));
  }
}

//   } else {
// const data = JSON.parse(localStorage.getItem('dataCart'));
// const dataProducts = [...data, bag];
// localStorage.setItem('dataCart', JSON.stringify(dataProducts));
//   }
// }
