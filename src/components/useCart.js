export default function useCart() {
  const getCart = () => {
    const CartString = localStorage.getItem('cart');
    const userCart = JSON.parse(CartString);
    return userCart;
  };

  const saveCart = userCart => {
    localStorage.setItem('cart', JSON.stringify(userCart));
  };

  const addGame = (id) => {
    let cart = getCart();
    let index = gameIndex(id);
    console.log(cart);
    console.log('index', index);
    if(cart === undefined || cart === null) cart = [];
    index !== -1 ? cart[index].quantity += 1 : cart.push({"game_id": id, "quantity": 1 });
    saveCart(cart);
    console.log("dodano gre", cart);
}

const delGame = (id) => {
    let cart = getCart();
    let index = gameIndex(id);
    if(index === -1 ) return;
    cart[index].quantity -= 1;
    if(cart[index].quantity === 0)
        cart.splice(index,1);
    saveCart(cart);
}

const setGame = (id, q) => {
    let cart = getCart();
    let index = gameIndex(id);
    if(index === -1 ) return;
    cart[index].quantity = q;
    saveCart(cart);
}

const gameIndex = (id) => {
    // -1 if not in cart
    const cart = getCart();
    if(cart === null || cart === undefined) return -1;
    return cart.map((i) => i.game_id).indexOf(id);
}

  return {
    getCart: getCart,
    addGame: addGame,
    delGame: delGame,
    gameIndex: gameIndex,
    setGame: setGame
  }
}