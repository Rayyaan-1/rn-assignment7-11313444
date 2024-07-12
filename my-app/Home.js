import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity } from 'react-native'; // Make sure StyleSheet is imported
import axios from 'axios';

export default function Home({ navigation }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.productContainer}>
        {products.map(product => (
          <TouchableOpacity
            key={product.id}
            style={styles.productWrapper}
            onPress={() => navigation.navigate('ProductDetailScreen', { product })}
          >
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
            />
            <Text style={styles.productTitle}>{product.title}</Text>
            <Text style={styles.productPrice}>${product.price}</Text>
            <Image
              source={require('./assets/add.png')}
              style={styles.addImage}
            />
          </TouchableOpacity>
        ))}
      </View>
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
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    flexWrap: 'wrap',
  },
  productWrapper: {
    width: '45%',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  addImage: {
    width: 30,
    height: 30,
    marginTop: 10,
  },
  productTitle: {
    marginTop: 10,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Aptos',
    fontSize: 16,
  },
  productPrice: {
    marginTop: 5,
    textAlign: 'center',
    color: 'orange',
    fontFamily: 'Aptos',
    fontSize: 14,
  },
});
