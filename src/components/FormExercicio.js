import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { cores, estilosGlobais } from '../styles';
import Botao from './Botao';
import Campo from './Campo';
import SeletorCatalogo from './SeletorCatalogo';

export default function FormExercicio({ onAdicionar }) {
  const [nome, setNome] = useState('');
  const [series, setSeries] = useState('');
  const [reps, setReps] = useState('');
  const [carga, setCarga] = useState('');
  const [doCatalogo, setDoCatalogo] = useState(null);

  function selecionar(item) {
    setDoCatalogo(item);
    setNome(item.nome);
    setSeries(item.series);
    setReps(item.reps);
  }

  function mudarNome(texto) {
    setNome(texto);
    // Se o usuário editar o nome, deixa de ser o exercício do catálogo.
    if (doCatalogo && texto !== doCatalogo.nome) setDoCatalogo(null);
  }

  function adicionar() {
    if (!nome.trim()) {
      Alert.alert('Atenção', 'Informe o nome do exercício.');
      return;
    }
    onAdicionar({
      nome: nome.trim(),
      series: series || '-',
      reps: reps || '-',
      carga: carga || '-',
      imagem: doCatalogo?.imagem ?? null,
    });
    setNome('');
    setSeries('');
    setReps('');
    setCarga('');
    setDoCatalogo(null);
  }

  return (
    <View>
      <Text style={styles.rotulo}>Escolha do catálogo ou digite um exercício:</Text>
      <SeletorCatalogo selecionadoId={doCatalogo?.id} onSelecionar={selecionar} />
      <Campo placeholder="Exercício (ex: Supino reto)" value={nome} onChangeText={mudarNome} />
      <View style={estilosGlobais.linha}>
        <Campo style={{ flex: 1 }} placeholder="Séries" keyboardType="numeric" value={series} onChangeText={setSeries} />
        <Campo style={{ flex: 1 }} placeholder="Reps" keyboardType="numeric" value={reps} onChangeText={setReps} />
        <Campo style={{ flex: 1 }} placeholder="Carga (kg)" keyboardType="numeric" value={carga} onChangeText={setCarga} />
      </View>
      <Botao titulo="Adicionar exercício" onPress={adicionar} style={{ marginBottom: 16 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  rotulo: { color: cores.textoSecundario, marginBottom: 6 },
});
