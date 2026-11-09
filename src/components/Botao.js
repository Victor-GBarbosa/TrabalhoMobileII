import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { cores } from '../styles';

export default function Botao({ titulo, onPress, variante = 'primaria', style }) {
  return (
    <TouchableOpacity
      style={[styles.botao, { backgroundColor: cores[variante] }, style]}
      onPress={onPress}
    >
      <Text style={styles.texto}>{titulo}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  texto: { color: cores.texto, fontWeight: 'bold', fontSize: 16 },
});
