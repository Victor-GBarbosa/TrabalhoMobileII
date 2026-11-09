import { TextInput } from 'react-native';
import { cores, estilosGlobais } from '../styles';

export default function Campo({ style, ...props }) {
  return (
    <TextInput
      style={[estilosGlobais.input, style]}
      placeholderTextColor={cores.placeholder}
      {...props}
    />
  );
}
