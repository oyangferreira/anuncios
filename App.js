import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';

const App = () => {
  const produtos = [
    {
      id: 1,
      nome: 'Smartwatch',
      valor: 'R$ 1000,00',
      cor: 'Preto',
      imagem: require('./assets/img1.jpg'),
    },
    {
      id: 2,
      nome: 'Notebook',
      valor: 'R$ 4550,00',
      cor: 'Preto e Vermelho',
      imagem: require('./assets/img2.jpg'),
    },
    {
      id: 3,
      nome: 'Celular',
      valor: 'R$ 2000,00',
      cor: 'Azul',
      imagem: require('./assets/img3.jpg'),
    },
  ];

  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? produtos.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    scrollViewRef.current.scrollTo({ x: newIndex * 300, animated: true });
  };

  const handleNext = () => {
    const newIndex = currentIndex === produtos.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    scrollViewRef.current.scrollTo({ x: newIndex * 300, animated: true });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Anúncios</Text>
      <View style={styles.carrosselContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            const slide = Math.ceil(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
            if (slide !== currentIndex) {
              setCurrentIndex(slide);
            }
          }}
        >
          {produtos.map((produto, index) => (
            <View key={produto.id} style={styles.produtoContainer}>
              <Image source={produto.imagem} style={styles.imagemProduto} />
              <Text style={styles.nomeProduto}>{produto.nome}</Text>
              <Text style={styles.infoProduto}>{produto.valor}</Text>
              <Text style={styles.infoProduto}>{produto.cor}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.botaoContainer}>
        <TouchableOpacity onPress={handlePrevious} style={styles.botao}>
          <Text style={styles.botaoTexto}>{"< Anterior"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} style={styles.botao}>
          <Text style={styles.botaoTexto}>{"Próximo >"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    color: 'red',
    marginBottom: 20,
  },
  carrosselContainer: {
    width: '100%',
    height: 400,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',

  },
  produtoContainer: {
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  imagemProduto: {
    width: 250,
    height: 250,
    marginBottom: 10,
    borderRadius: 10,
  },
  nomeProduto: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoProduto: {
    fontSize: 16,
    marginBottom: 5,
  },
  botaoContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  botao: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 18,
  },
});

export default App;
