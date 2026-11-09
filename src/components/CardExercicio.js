import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { cores, estilosGlobais } from '../styles';

export default function CardExercicio({ exercicio, onAlternar, onRemover }) {
  const { nome, series, reps, carga, feito, imagem } = exercicio;

  return (
    <View style={[estilosGlobais.card, feito && styles.cardFeito]}>
      <TouchableOpacity style={styles.conteudo} onPress={onAlternar}>
        {imagem ? (
          <Image source={{ uri: imagem }} style={styles.foto} resizeMode="contain" />
        ) : (
          <View style={[styles.foto, styles.semFoto]}>
            <Text style={styles.semFotoTexto}>🏋️</Text>
          </View>
        )}
        <View style={{ flex: 1 }}>
          <Text style={[estilosGlobais.cardTitulo, feito && styles.riscado]}>
            {feito ? '✓ ' : '○ '}
            {nome}
          </Text>
          <Text style={estilosGlobais.cardSub}>
            {series} x {reps} · {carga} kg
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onRemover}>
        <Text style={styles.excluir}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  conteudo: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  foto: { width: 64, height: 64, borderRadius: 6, backgroundColor: '#fff' },
  semFoto: { backgroundColor: '#2a2a2a', justifyContent: 'center', alignItems: 'center' },
  semFotoTexto: { fontSize: 28 },
  cardFeito: { backgroundColor: '#1b3a1d' },
  riscado: { textDecorationLine: 'line-through', color: '#8bc34a' },
  excluir: { color: cores.perigo, fontSize: 20, paddingHorizontal: 8 },
});
