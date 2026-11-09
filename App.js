import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TelaTreino from './src/screens/TelaTreino';
import TelaTreinos from './src/screens/TelaTreinos';
import { cores } from './src/styles';
import { novoId } from './src/utils/id';
import { treinosIniciais } from './src/data/exercicios';

const criarTreinosIniciais = () =>
  treinosIniciais.map((t) => ({
    id: novoId(),
    nome: t.nome,
    exercicios: t.exercicios.map((e) => ({ ...e, id: novoId(), feito: false })),
  }));

export default function App() {
  const [treinos, setTreinos] = useState(criarTreinosIniciais);
  const [treinoAtivoId, setTreinoAtivoId] = useState(null);

  const treinoAtivo = treinos.find((t) => t.id === treinoAtivoId);

  function adicionarTreino(nome) {
    setTreinos((atual) => [...atual, { id: novoId(), nome, exercicios: [] }]);
  }

  // A confirmação e a animação de saída ficam no CardTreino.
  function removerTreino(id) {
    setTreinos((atual) => atual.filter((t) => t.id !== id));
  }

  function renomearTreino(id, nome) {
    setTreinos((atual) => atual.map((t) => (t.id === id ? { ...t, nome } : t)));
  }

  function atualizarExercicios(treinoId, transformar) {
    setTreinos((atual) =>
      atual.map((t) => (t.id === treinoId ? { ...t, exercicios: transformar(t.exercicios) } : t)),
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
        <StatusBar style="light" />
        {treinoAtivo ? (
          <TelaTreino
            treino={treinoAtivo}
            onVoltar={() => setTreinoAtivoId(null)}
            onAtualizar={(fn) => atualizarExercicios(treinoAtivo.id, fn)}
          />
        ) : (
          <TelaTreinos
            treinos={treinos}
            onAdicionar={adicionarTreino}
            onAbrir={setTreinoAtivoId}
            onRenomear={renomearTreino}
            onRemover={removerTreino}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
});
