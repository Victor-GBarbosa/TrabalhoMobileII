import { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cores, estilosGlobais } from '../styles';
import Botao from './Botao';
import Campo from './Campo';

export default function ModalEditarTreino({ treino, onSalvar, onFechar }) {
  const [nome, setNome] = useState('');

  useEffect(() => {
    if (treino) setNome(treino.nome);
  }, [treino]);

  function salvar() {
    if (!nome.trim()) return;
    onSalvar(nome.trim());
  }

  return (
    <Modal visible={!!treino} transparent animationType="slide" onRequestClose={onFechar}>
      <View style={styles.fundo}>
        {/* O Modal abre por cima de tudo, então protege a borda inferior de novo. */}
        <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.painel}>
          <Text style={estilosGlobais.titulo}>Configurar treino</Text>
          <Text style={styles.rotulo}>Nome do treino</Text>
          <Campo value={nome} onChangeText={setNome} onSubmitEditing={salvar} autoFocus />
          <View style={[estilosGlobais.linha, { marginTop: 8 }]}>
            <Botao titulo="Cancelar" variante="secundaria" onPress={onFechar} style={{ flex: 1 }} />
            <Botao titulo="Salvar" onPress={salvar} style={{ flex: 1 }} />
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fundo: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.6)' },
  painel: {
    backgroundColor: cores.fundo,
    padding: 20,
    paddingBottom: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  rotulo: { color: cores.textoSecundario, marginBottom: 6 },
});
