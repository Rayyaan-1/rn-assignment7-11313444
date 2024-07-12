import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import axios from 'axios';

export default function Home() {
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
      <View style={styles.menuContainer}>
        <Image
          source={require('./assets/Menu.png')}
          style={styles.menuImage}
        />
        <Image
          source={require('./assets/Logo.png')}
          style={styles.newLogoImage}
        />
        <Image
          source={require('./assets/Search.png')}
          style={styles.searchImage}
        />
        <Image
          source={require('./assets/shoppingBag.png')}
          style={styles.shoppingBagImage}
        />
      </View>
      <View style={styles.storyContainer}>
        <Text style={styles.storyText}>O U R  S T O R Y</Text>
        <Image
          source={require('./assets/Listview.png')}
          style={styles.listviewImage}
        />
        <Image
          source={require('./assets/Filter.png')}
          style={styles.filterImage}
        />
      </View>
      <View style={styles.productContainer}>
        {products.map(product => (
          <View key={product.id} style={styles.productWrapper}>
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
          </View>
        ))}
      </View>
      <View style={styles.spacer} />
      <View style={styles.centeredLogoContainer}>
        <Image
          source={require('./assets/Logo.png')}
          style={styles.centeredLogo}
        />
        <Image
          source={require('./assets/Search.png')}
          style={styles.searchImage}
        />
        <Text style={styles.checkoutText}>C H E C K O U T</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
  },
  menuContainer: {
    position: 'absolute',
    top: 44,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  newLogoImage: {
    width: 120,
    height: 50,
    marginLeft: 110,
  },
  searchImage: {
    width: 30,
    height: 30,
    marginLeft: 20,
  },
  shoppingBagImage: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  storyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 80,
  },
  storyText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#666',
    letterSpacing: 2,
    textShadowColor: '#666',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    textTransform: 'uppercase',
    fontFamily: 'Times New Roman',
    marginRight: 10,
  },
  listviewImage: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  filterImage: {
    width: 30,
    height: 30,
    marginLeft: 10,
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
  spacer: {
    height: 200,
  },
  centeredLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  centeredLogo: {
    width: 120,
    height: 50,
  },
  checkoutText: {
    marginTop: 10,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Aptos',
    fontSize: 16,
  },
});
