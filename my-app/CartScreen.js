import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Button, ScrollView } from 'react-native';
import { CartContext } from './CartContext';

export default function CartScreen() {
  const { cart, removeFromCart } = useContext(CartContext);
  const [apiCart, setApiCart] = useState([]);

  useEffect(() => {
    // Fetch cart data from the API and set it to apiCart state
    fetch('https://fakestoreapi.com/carts')
      .then(res => res.json())
      .then(json => {
        // Assuming json is an array of carts and each cart has a products array
        const products = json.reduce((acc, cart) => [...acc, ...cart.products], []);
        setApiCart(products);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {cart.length === 0 && apiCart.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      ) : (
        <>
          {cart.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
                <Button title="Remove" onPress={() => removeFromCart(item.id)} />
              </View>
            </View>
          ))}
          {apiCart.map((item, index) => (
            <View key={index} style={styles.cartItem}>
              <Text style={styles.productTitle}>Product ID: {item.productId}</Text>
              <Text style={styles.productPrice}>Quantity: {item.quantity}</Text>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
    width: '100%',
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  productDetails: {
    marginLeft: 10,
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
    marginBottom: 10,
  },
});
