import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import CardTreino from '../components/CardTreino';
import FormTreino from '../components/FormTreino';
import ModalEditarTreino from '../components/ModalEditarTreino';
import { estilosGlobais } from '../styles';

export default function TelaTreinos({ treinos, onAdicionar, onAbrir, onRenomear, onRemover }) {
  const [editando, setEditando] = useState(null);

  return (
    <View style={estilosGlobais.tela}>
      <Text style={estilosGlobais.titulo}>Meus Treinos</Text>
      <FormTreino onAdicionar={onAdicionar} />

      <FlatList
        data={treinos}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={estilosGlobais.vazio}>Nenhum treino cadastrado ainda.</Text>}
        renderItem={({ item }) => (
          <CardTreino
            treino={item}
            onAbrir={() => onAbrir(item.id)}
            onEditar={() => setEditando(item)}
            onRemover={() => onRemover(item.id)}
          />
        )}
      />
      <Text style={styles.dica}>Deslize um treino para a esquerda para configurar ou excluir.</Text>

      <ModalEditarTreino
        treino={editando}
        onFechar={() => setEditando(null)}
        onSalvar={(nome) => {
          onRenomear(editando.id, nome);
          setEditando(null);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dica: { color: '#666', textAlign: 'center', fontSize: 12, marginTop: 8 },
});
