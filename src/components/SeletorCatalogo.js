import { FlatList, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { catalogoExercicios } from '../data/exercicios';
import { cores } from '../styles';

export default function SeletorCatalogo({ selecionadoId, onSelecionar }) {
  return (
    <FlatList
      horizontal
      data={catalogoExercicios}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      style={styles.lista}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[styles.item, item.id === selecionadoId && styles.itemSelecionado]}
          onPress={() => onSelecionar(item)}
        >
          <Image source={{ uri: item.imagem }} style={styles.foto} resizeMode="contain" />
          <Text style={styles.nome} numberOfLines={2}>
            {item.nome}
          </Text>
          <Text style={styles.grupo}>{item.grupo}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  lista: { flexGrow: 0, marginBottom: 8 },
  item: {
    width: 100,
    backgroundColor: cores.superficie,
    borderRadius: 8,
    padding: 6,
    marginRight: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  itemSelecionado: { borderColor: cores.primaria },
  foto: { width: '100%', height: 60, borderRadius: 4, backgroundColor: '#fff' },
  nome: { color: cores.texto, fontSize: 12, marginTop: 4 },
  grupo: { color: cores.textoSecundario, fontSize: 11 },
});
