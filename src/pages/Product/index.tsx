import React, {  useEffect, useState, useContext } from 'react';
import {View, StyleSheet, Text,FlatList,StatusBar, Alert, ScrollView} from 'react-native';




import api from '../../services/api';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { useNavigation } from '@react-navigation/core'; 

import {ProductCard} from '../../components/ProductCard';
import {Header} from '../../components/Header';
import { ListButton } from '../../components/ListButton';
import Load from '../../components/Load';



interface Produto {
    ID:number;
    name: string;
    title: string;
    category:string;
    date: string; 
    image:string;
    meusProduto:string;

}
interface ProdutoSingle {
  ID:number;
  name: string;
  title: string;
  category:string;
  meusProduto:string;

}
interface DataCategory{
  ID:number;
  name: string;
  title: string;
  category:string;
  date: string;
  image: string;
  meusProduto:string;
}


interface User {
  name: string;
  
}

export default function Product ()  {

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtosInfo, setProdutosInfo] = useState<Produto[]>([]);
  const [category, setCategory] = useState<DataCategory[]>([]);
  const [meusProdutos, setMeusProdutos] = useState<DataCategory[]>([]);
  const [filteredProdutos, setFilteredProdutos] = useState<DataCategory[]>([]);
  const [categoryProdutos, setCategoryProdutos]  = useState('Todos');
  const [load, setLoad]  = useState(false);
 
  const navigation = useNavigation();

  function handleCategoryProdutos(produtoInfo:string) {
 

    setCategoryProdutos(produtoInfo);
  
  
    
    if (produtoInfo === 'Todos'){
    
     return  setFilteredProdutos(category);
    }
    if (produtoInfo === 'Meus Produtos'){
     
      return setFilteredProdutos(meusProdutos);

     }
    
    const filtered = category.filter(category => 
      category.category.includes(produtoInfo)
      
      );
      setFilteredProdutos(filtered);
      
  }

  useEffect(() => {

    async function categorySelct () {
  
      const { data } = await api.get('/wp-json/wp/v2/categoria_do_produto?_sort=title&_order=asc');
   
      setProdutosInfo([
        {
          id: 0,
          name:'Todos',
          category:'Todos',
        },
        {
          id: 1,
          name:'Meus Produtos',
          category:'Meus Produtos',
        },
        ... data
      ]);
  
      
      
       }
  
       
       categorySelct();
       
       
      
  },[]);
  


  useEffect(() => {

    async function getProduto() {
  
       await api.get('/wp-json/api/v1/produtos/')
       
       
       .then((res) => {

          

          if(res){
           setLoad(true);
           setProdutos(res.data?.produto);
           setCategory(res.data?.produto);
           setFilteredProdutos(res.data?.produto);
           
           
           
           function meusProdutosFilter (value:Produto) {
            
           return value.meusProduto;
          }
          const meusProd = res.data?.produto.filter(meusProdutosFilter);
          setMeusProdutos(meusProd);
          

          }

        
      })
      .catch((error) => {
        console.error('Não produtos para ser exibido!')
     
      })
    

       }
       
       
       getProduto();
       
      
},[]);

function handleProductSelect (produto:ProdutoSingle){
  
  navigation.navigate('Produto', {produto});
}

function handlePrevious () {
  navigation.goBack();
}

if(!load){
  return (
    <Load/>
  );
}
return (
    <View style={styles.container}>
    
   
      <View style={styles.topTitle}>
      <Text style={styles.title}>Produtos</Text>
      <Text  style={styles.subtitle}  onPress={handlePrevious} >Voltar</Text>
      </View>
      <View >
         <FlatList 
            data={produtosInfo}
            keyExtractor={(item) => {
              return item.name;
            }}
            renderItem={({item}) => (
              <ListButton 
              title={item.name } 
              active={item.name === categoryProdutos}
              onPress={()=> handleCategoryProdutos(item.name) }
          />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          
         />
      </View>
      <View style={styles.containerCard}>
      <FlatList
        data={filteredProdutos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item } ) => (
            
          <ProductCard  
          data={item}
          onPress={() => handleProductSelect(item)}
          
          />
           
        )}
        
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.1}
        numColumns={1}

      />
      </View>

      
    </View>
  );
}

const styles = StyleSheet.create ({
  container: {
    flex:1,
    justifyContent: 'flex-start',
    paddingHorizontal:20,
    paddingTop: StatusBar.currentHeight || 50,
    paddingBottom: StatusBar.currentHeight || 20,
    backgroundColor:colors.background,
  },
  header:{
    justifyContent: 'center',
   
  },
  subtitle:{
    fontSize:18,
    fontWeight:'400',
    textAlign:'left',
    color: colors.subtitle,
    marginBottom:20,
    fontFamily:fonts.text,
    maxWidth:330, 
  },
  title:{
    fontSize:18,
    fontWeight:'500',
    textAlign:'left',
    color: colors.title,
    marginBottom:10,
    fontFamily:fonts.heading,
  },
   topTitle:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-between',
    alignItems:'center',

  },

  containerCard: {
    flex: 1,
    maxWidth: '100%',
    paddingVertical: 20,
    paddingHorizontal:0,
    margin: 0,
  } 
})

