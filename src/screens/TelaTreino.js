import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Botao from '../components/Botao';
import CardExercicio from '../components/CardExercicio';
import FormExercicio from '../components/FormExercicio';
import { cores, estilosGlobais } from '../styles';
import { novoId } from '../utils/id';

export default function TelaTreino({ treino, onVoltar, onAtualizar }) {
  const adicionar = (dados) =>
    onAtualizar((lista) => [...lista, { id: novoId(), feito: false, ...dados }]);

  const alternar = (id) =>
    onAtualizar((lista) => lista.map((e) => (e.id === id ? { ...e, feito: !e.feito } : e)));

  const remover = (id) => onAtualizar((lista) => lista.filter((e) => e.id !== id));

  const reiniciar = () => onAtualizar((lista) => lista.map((e) => ({ ...e, feito: false })));

  return (
    <View style={estilosGlobais.tela}>
      <TouchableOpacity onPress={onVoltar}>
        <Text style={styles.voltar}>‹ Voltar</Text>
      </TouchableOpacity>
      <Text style={estilosGlobais.titulo}>{treino.nome}</Text>

      <FormExercicio onAdicionar={adicionar} />

      <FlatList
        data={treino.exercicios}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={estilosGlobais.vazio}>Nenhum exercício ainda.</Text>}
        renderItem={({ item }) => (
          <CardExercicio
            exercicio={item}
            onAlternar={() => alternar(item.id)}
            onRemover={() => remover(item.id)}
          />
        )}
      />

      {treino.exercicios.length > 0 && (
        <Botao titulo="Reiniciar treino" variante="secundaria" onPress={reiniciar} style={{ marginTop: 8 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  voltar: { color: cores.primaria, fontSize: 16, marginBottom: 8 },
});
