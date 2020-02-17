
Iniciando o React Native:
```
./genymotion (na pasta genymotion)
yarn react-native start
ou
yarn react-native start --reset-cache
adb reverse tcp:9090 tcp:9090 ( redirecionar à porta do Reactotron)
yarn react-native run-android
```

3. ESLint, Prettier & EditorConfig
   1. Criar .editorconfig
   2. Add ESLint:
   ```
   yarn add eslint -D
   yarn eslint --init
   yarn add prettier eslint-config-prettier eslint-plugin-prettier babel-eslint -D
   ```
   .eslintrc.js
   ```
   module.exports = {
    env: {
    es6: true,
    },
    extends: [
      'plugin:react/recommended',
      'airbnb',
      'prettier',
      'prettier/react',
    ],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parser: 'babel-eslint',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    plugins: [
      'react',
      'prettier'
    ],
    rules: {
      'prettier/prettier': 'error',
      'react/jsx-filename-extension': [
        'warn',
        {
          extensions: ['.jsx', '.js']
        }
      ],
      'import/prefer-default-export':'off',
     },
   };
   ```
   2. .prettierrc
   ```
   "singleQuote": true,
   "trailingComma": 'es5';
   ```
   3. Reiniciar o bundle.
   ```
   yarn react-native start --reset-cache
   ```

4. Configurando o Reactotron
   1. Debugger pode causar problemas, portanto vamos usar o reactotron:
      1. Google: Reactotron
		  2. https://github.com/infinitered/reactotron/releases
		  3. Download and Install: reactotron-app_2.17.1_amd64.deb
      ```
      yarn add reactotron-react-native
      ```
    2. Criar src, src/index.js, src/config/ReactotronConfig.js
       1. Trasnfere todo o codigo do App.js para src/index.js e deleta App.js
       2. modulo06/index.js: import App from './src';
       3. Adicionar ao .eslintrc.js em globals:
          ```
          __DEV__: 'readonly'
          ```
       4. src/index.js: import './config/ReactotronConfig';
       5. Se não conectar o Reactotron:
          1. Se você tem o adb instalado na sua distro Linux provavelmente ele está diferente da versão do Genymotion.
             1. https://medium.com/@birobirobiro/erro-adb-devices-no-genymotion-react-native-735c15594ac6
          2.  Redirecionamento de porta: Terminal: adb reverse tcp:9090 tcp:9090
          3. yarn react-native start --reset-cache
          3. teste: src/index.js
          ```
          console.tron.log('Hello World');
          ```



5. React Navigation
   1. src/index.js: Deletar tudo e deixar:
   ```Javascript
   import React from 'react';
    import { View } from 'react-native';
    import './config/Reactotron';

   export default function App() {
    return <View />;
   }
   ```
   2. Criar a pasta src/pages e:
      1. pages/Main/index.js
      2. pages/User/index.js
      3.
   ```
   yarn add react-navigation
   yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
   ```
   obs. Ver a última vesão de instalação de dependencias React Native project.
   https://reactnavigation.org/docs/en/getting-started.html
   obs. Foi necessário instalar a nova versão de: yarn add @react-navigation/native https://reactnavigation.org/docs/pt-BR/getting-started.html

   3. Criar src/routes.js
      1. Vamos usar navigation by stack: https://reactnavigation.org/docs/en/hello-react-navigation.html
      ```
      yarn add react-navigation-stack
      ```
      2. Segue as instruções no link.
      3. Adicionar Main e User em routes via StackNavigator.
      4. index.js: import routes depois do import reactotron para entrar no debug reactotron (console.tron).

   4. Configurando o StatusBar
      ```Javascript
      import { StatusBar } from 'react-native';
       <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      ```

   5. Styled Components
      ```
      yarn add styled-components
      ```
      1. Criar Main/styles.js

   6. Estilizando formulário
      1. Main/index.js
      2.
         ```
         yarn add react-native-vector-icons
         ```
      2. https://github.com/oblador/react-native-vector-icons
         1. abrir pasta android/app/build.gradle
         ```
         project.ext.vectoricons = [
          iconFontNames: [ 'MaterialIcons.ttf' ] // Name of the font files you want to copy
         ]
         apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
         ```
      3. Main/index.js: import Icon from 'react-native-vector-icons/MaterialIcons'
         1. Google -> react native vector icons -> github -> site na 1a linha:
         2. https://oblador.github.io/react-native-vector-icons/

   7. Acessando API do Github
      1. Main/index.js
         1. Quando o usuario preencher os dados no placeholder e clicar no '+', vamos buscar os dados no github do usuario e adicionar num 'state'.
         2. Para isso, alteramos a function Main para class.
         3. obs. no Input: add value e onCHangeText. Add returnKeyType e onSubmitEditing.
         4. função handleAddUser. this.handleAddUser vai no SubmitButton e não no Form (React Native não tem Form).
       2. API:
       ```
       yarn add axios
       ```
          1. Criar src/services/api.js
          2. import ao handleAddUser.
       3. import { Keyboard } from 'react-native';
          1. Keyboard.dismiss();

   8. Estilizando a listagem
      1. List:
         1. React Native não tem ul, li e não tem .map. RN ja tem List padrão com barra de rolagem, etc.
         2. usar FlatList
      2. Main.index/js e Main/styles.js

   9. Loading e disabled
      1. Main/index.js: import { Keyboard, ActivityIndicator } from 'react-native';
      2. Incluir loading no state.
      3.

   10. Salvando no storage
       1. React Native não tem API para localstorage
       ```
       yarn add @react-native-community/async-storage
       yarn react-native run-android
       ```
       2. Main/index.js: import AsyncStorage from '@react-native-community/async-storage';
       3. Criar as funções async componentDidMount() e componentDidUpdate().

   11. Realizando Navegação
       1. Todos as paginas dentro do createStackNavigator vem com a propriedade Navigation (e dentro tem o metodo navigate). Vide: console.tron.log(this.props)
       2. Main/index.js
          1. criar handleNavigate
       3. Add prop-types para validar alguns erros de propriedades. Incluir static proptypes no Mai/index.js
          ```
          yarn add prop-types
          ```

   12. Buscando dados da API
       1. User/index.js
          1. Incluir component e transformar em class
          2. componentDidMount;
             1. Incluir console.tron.log(this.props)
             2. api.get(`/users/${user.login}/starred`).
             3. PropTypes para acabar com erros ESLint.

   13. Listando Favoritos
       1. User/index.js
          1. Criar COntainer, HEader, Avatar, Name, Bio. e estilizar.
          2. Criar Starts, OwnerAvatar, Info, Title, Author e estilizar.

