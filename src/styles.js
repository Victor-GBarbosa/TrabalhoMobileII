import { StyleSheet } from 'react-native';

export const cores = {
  fundo: '#121212',
  superficie: '#1e1e1e',
  primaria: '#4caf50',
  secundaria: '#555',
  texto: '#fff',
  textoSecundario: '#aaa',
  placeholder: '#888',
  perigo: '#e57373',
};

export const estilosGlobais = StyleSheet.create({
  tela: { flex: 1, padding: 16 },
  titulo: { color: cores.texto, fontSize: 26, fontWeight: 'bold', marginBottom: 16 },
  linha: { flexDirection: 'row', gap: 8 },
  input: {
    backgroundColor: cores.superficie,
    color: cores.texto,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
  },
  card: {
    backgroundColor: cores.superficie,
    borderRadius: 8,
    padding: 14,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitulo: { color: cores.texto, fontSize: 17, fontWeight: '600' },
  cardSub: { color: cores.textoSecundario, marginTop: 4 },
  vazio: { color: '#777', textAlign: 'center', marginTop: 24 },
});
