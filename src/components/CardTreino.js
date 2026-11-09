import { useRef } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  LayoutAnimation,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { cores, estilosGlobais } from '../styles';

const LARGURA_ACOES = 160;
const LARGURA_TELA = Dimensions.get('window').width;

export default function CardTreino({ treino, onAbrir, onEditar, onRemover }) {
  const posicao = useRef(new Animated.Value(0)).current;
  const opacidade = useRef(new Animated.Value(1)).current;
  const aberto = useRef(false);

  const feitos = treino.exercicios.filter((e) => e.feito).length;

  function moverPara(valor) {
    aberto.current = valor !== 0;
    Animated.spring(posicao, {
      toValue: valor,
      useNativeDriver: true,
      bounciness: 4,
    }).start();
  }

  const fechar = () => moverPara(0);

  const panResponder = useRef(
    PanResponder.create({
      // Só captura gestos horizontais, para não atrapalhar a rolagem da lista.
      onMoveShouldSetPanResponder: (_, g) =>
        Math.abs(g.dx) > 10 && Math.abs(g.dx) > Math.abs(g.dy),
      onPanResponderTerminationRequest: () => false,
      onPanResponderMove: (_, g) => {
        const inicio = aberto.current ? -LARGURA_ACOES : 0;
        const x = Math.min(0, Math.max(-LARGURA_ACOES - 40, inicio + g.dx));
        posicao.setValue(x);
      },
      onPanResponderRelease: (_, g) => {
        const inicio = aberto.current ? -LARGURA_ACOES : 0;
        const final = inicio + g.dx;
        moverPara(final < -LARGURA_ACOES / 2 || g.vx < -0.5 ? -LARGURA_ACOES : 0);
      },
      onPanResponderTerminate: () => moverPara(aberto.current ? -LARGURA_ACOES : 0),
    })
  ).current;

  function tocar() {
    if (aberto.current) fechar();
    else onAbrir();
  }

  function editar() {
    fechar();
    onEditar();
  }

  function excluir() {
    Alert.alert('Excluir treino', `Excluir "${treino.nome}"?`, [
      { text: 'Cancelar', style: 'cancel', onPress: fechar },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          // Desliza o card para fora da tela e depois remove da lista.
          Animated.parallel([
            Animated.timing(posicao, { toValue: -LARGURA_TELA, duration: 250, useNativeDriver: true }),
            Animated.timing(opacidade, { toValue: 0, duration: 250, useNativeDriver: true }),
          ]).start(() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            onRemover();
          });
        },
      },
    ]);
  }

  // As ações aparecem conforme o card desliza.
  const opacidadeAcoes = posicao.interpolate({
    inputRange: [-LARGURA_ACOES, -20, 0],
    outputRange: [1, 0.3, 0],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.container, { opacity: opacidade }]}>
      <Animated.View style={[styles.acoes, { opacity: opacidadeAcoes }]}>
        <TouchableOpacity style={[styles.acao, styles.acaoEditar]} onPress={editar}>
          <Text style={styles.acaoIcone}>⚙</Text>
          <Text style={styles.acaoTexto}>Configurar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.acao, styles.acaoExcluir]} onPress={excluir}>
          <Text style={styles.acaoIcone}>🗑</Text>
          <Text style={styles.acaoTexto}>Excluir</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        style={{ transform: [{ translateX: posicao }] }}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity activeOpacity={0.8} style={[estilosGlobais.card, styles.card]} onPress={tocar}>
          <View style={{ flex: 1 }}>
            <Text style={estilosGlobais.cardTitulo}>{treino.nome}</Text>
            <Text style={estilosGlobais.cardSub}>
              {feitos}/{treino.exercicios.length} exercícios concluídos
            </Text>
          </View>
          <Text style={styles.seta}>‹</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 8, borderRadius: 8, overflow: 'hidden' },
  card: { marginBottom: 0 },
  acoes: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: LARGURA_ACOES,
    flexDirection: 'row',
  },
  acao: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  acaoEditar: { backgroundColor: '#3f51b5' },
  acaoExcluir: { backgroundColor: cores.perigo },
  acaoIcone: { color: cores.texto, fontSize: 18 },
  acaoTexto: { color: cores.texto, fontSize: 12, fontWeight: 'bold', marginTop: 2 },
  seta: { color: '#555', fontSize: 22, paddingLeft: 8 },
});
