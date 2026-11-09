import { useState } from 'react';
import { View } from 'react-native';
import { estilosGlobais } from '../styles';
import Botao from './Botao';
import Campo from './Campo';

export default function FormTreino({ onAdicionar }) {
  const [nome, setNome] = useState('');

  function salvar() {
    if (!nome.trim()) return;
    onAdicionar(nome.trim());
    setNome('');
  }

  return (
    <View style={estilosGlobais.linha}>
      <Campo
        style={{ flex: 1 }}
        placeholder="Ex: Treino A - Peito"
        value={nome}
        onChangeText={setNome}
        onSubmitEditing={salvar}
      />
      <Botao titulo="+" onPress={salvar} style={{ paddingVertical: 0 }} />
    </View>
  );
}
