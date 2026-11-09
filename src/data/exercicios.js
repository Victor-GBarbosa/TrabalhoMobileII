// Catálogo de exercícios de exemplo.
// Imagens do wger.de (licença CC-BY-SA), carregadas pela internet.
const BASE = 'https://wger.de/media/exercise-images';

export const catalogoExercicios = [
  { id: 'supino-reto', nome: 'Supino reto', grupo: 'Peito', series: '4', reps: '10', imagem: `${BASE}/192/Bench-press-1.png` },
  { id: 'supino-inclinado-halteres', nome: 'Supino inclinado com halteres', grupo: 'Peito', series: '3', reps: '12', imagem: `${BASE}/16/Incline-press-1.png` },
  { id: 'crucifixo-polia', nome: 'Crossover na polia', grupo: 'Peito', series: '3', reps: '12', imagem: `${BASE}/71/Cable-crossover-2.png` },
  { id: 'remada-curvada', nome: 'Remada curvada', grupo: 'Costas', series: '4', reps: '10', imagem: `${BASE}/109/Barbell-rear-delt-row-1.png` },
  { id: 'barra-fixa', nome: 'Barra fixa supinada', grupo: 'Costas', series: '3', reps: '8', imagem: `${BASE}/152/6c1a7459-266d-491a-bd50-7cbaea2bc771.png` },
  { id: 'rosca-direta', nome: 'Rosca direta com barra', grupo: 'Bíceps', series: '3', reps: '12', imagem: `${BASE}/74/Bicep-curls-1.png` },
  { id: 'triceps-testa', nome: 'Tríceps testa', grupo: 'Tríceps', series: '3', reps: '12', imagem: `${BASE}/84/Lying-close-grip-triceps-press-to-chin-1.png` },
  { id: 'desenvolvimento-halteres', nome: 'Desenvolvimento com halteres', grupo: 'Ombros', series: '3', reps: '10', imagem: `${BASE}/123/dumbbell-shoulder-press-large-1.png` },
  { id: 'agachamento-frontal', nome: 'Agachamento frontal', grupo: 'Pernas', series: '4', reps: '8', imagem: `${BASE}/191/Front-squat-1-857x1024.png` },
  { id: 'cadeira-extensora', nome: 'Cadeira extensora', grupo: 'Pernas', series: '3', reps: '15', imagem: `${BASE}/369/78c915d1-e46d-4d30-8124-65d68664c3ef.png` },
];

const doCatalogo = (id, carga) => {
  const { nome, series, reps, imagem } = catalogoExercicios.find((e) => e.id === id);
  return { nome, series, reps, carga, imagem };
};

// Treinos que já aparecem ao abrir o app.
export const treinosIniciais = [
  {
    nome: 'Treino A - Peito e Tríceps',
    exercicios: [
      doCatalogo('supino-reto', '40'),
      doCatalogo('supino-inclinado-halteres', '16'),
      doCatalogo('crucifixo-polia', '10'),
      doCatalogo('triceps-testa', '20'),
    ],
  },
  {
    nome: 'Treino B - Costas e Bíceps',
    exercicios: [
      doCatalogo('remada-curvada', '30'),
      doCatalogo('barra-fixa', '-'),
      doCatalogo('rosca-direta', '20'),
    ],
  },
  {
    nome: 'Treino C - Pernas e Ombros',
    exercicios: [
      doCatalogo('agachamento-frontal', '40'),
      doCatalogo('cadeira-extensora', '35'),
      doCatalogo('desenvolvimento-halteres', '12'),
    ],
  },
];
