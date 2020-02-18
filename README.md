### Conceitos abordados:
1. Iniciar um projeto React Native para mobile app.
2. Utilização de ambiente Android.
3. Incluir ESLint, Prettier & EditorConfig.
4. debug via Reactotron.
5. Navegação entre páginas: React Navigation.
6. Estilização via Styled Components.
7. Acessando dados de API do Github.
8. Acessando localstorage do Google Chrome.
___

### Desrição do projeto:

Um aplicativo mobile para a busca de usuário de Github e ver o perfil e uma lista de seus repositórios marcados com Star.

<div display="flex" flex-direction="row" justify-content= "space-between">
<img src="https://github.com/MaisDennis/GoStack10.0-Modulo-06/blob/master/src/assets/Main.png" alt="Main" width="300" height="auto">

<img src="https://github.com/MaisDennis/GoStack10.0-Modulo-06/blob/master/src/assets/Stars.png" alt="Stars" width="300" height="auto">
</div>

___

### Iniciando o React Native:

Esse projeto foi desenvolvido para o ambiente mobile.
No desenvolvimento do projeto foi usado o emulador mobile: Genymotion.
Instruções para a instalação do Genymotion:
https://docs.rocketseat.dev/ambiente-react-native/android/emulador
Iiniciar o GenyMotion:
```
./genymotion (na pasta genymotion)
```
Dentro da pasta do projeto, Para iniciar o bundle:
```
yarn react-native start
ou
yarn react-native start --reset-cache
```
Redirecionamento de porta para o uso do debugger: Reactotron.
```
adb reverse tcp:9090 tcp:9090 ( redirecionar à porta do Reactotron)
```
Iniciar o app:
```
yarn react-native run-android
```
obs. O aplicativo foi desenvolvido para o ambiente Android.
___

### Criando o projeto:

1. Ambiente de desenvolvimento:
   1. Instalar NodeJS, JDK e dependencias.
   2. Instalar SDK do Android.
   3. Instalar Genymotion (emulador de mobile Android).
   4. Guideline:
      1. http://docs.rocketseat.dev
      2. https://docs.rocketseat.dev/ambiente-react-native/android/linux

2. Iniciando o projeto:
   1. ```
      yarn react-native init modulo06
      ```
   2. App.js
      1. Remover comentarios, const, text que não seja "Welocme to React".
      2. obs. Todos os elementos ja tem display: flex do css.

3. ESLint, Prettier & EditorConfig
   1. Criar .editorconfig
   2. Add ESLint:
      ```
      yarn add eslint -D
      yarn eslint --init
      yarn add prettier eslint-config-prettier eslint-plugin-prettier babel-eslint -D
      ```
   3. Criar .eslintrc.js

   4. Criar .prettierrc

   5. Reiniciar o bundle.

4. Configurando o Reactotron
   1. Debugger pode causar problemas, portanto vamos usar o reactotron:
      1. Google: Reactotron
		  2. Link: https://github.com/infinitered/reactotron/releases
		  3. Download and Install: reactotron-app_2.17.1_amd64.deb
         ```
         yarn add reactotron-react-native
         ```
    2. Criar src, src/index.js, src/config/ReactotronConfig.js
       1. Transfere todo o codigo do App.js para src/index.js e deleta App.js
       2. modulo06/index.js: import App from './src';
       3. Adicionar ao .eslintrc.js em globals:
          ```
          __DEV__: 'readonly'
          ```
       4. src/index.js: import './config/ReactotronConfig';
       5. Se não conectar o Reactotron:
          1. Se você tem o adb instalado na sua distro Linux provavelmente ele está diferente da versão do Genymotion.
          2. Seguir o guideline:
             1. https://medium.com/@birobirobiro/erro-adb-devices-no-genymotion-react-native-735c15594ac6
          3. Redirecionamento de porta: Terminal:
             ```
             adb reverse tcp:9090 tcp:9090
             yarn react-native start --reset-cache
             ```
          4. teste: src/index.js
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
      3. ```
         yarn add react-navigation
         yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
         ```
   obs. Ver a última vesão de instalação de dependencias React Native project.
   https://reactnavigation.org/docs/en/getting-started.html.
   obs. Foi necessário instalar a nova versão de: yarn add @react-navigation/native https://reactnavigation.org/docs/pt-BR/getting-started.html.

   3. Criar src/routes.js
      1. Vamos usar navigation by stack: https://reactnavigation.org/docs/en/hello-react-navigation.html
         ```
         yarn add react-navigation/stack
         ```
      2. Segue as instruções no link.
      3. Adicionar Main e User em routes via StackNavigator. Os componentes devem ficar algo assim:
          ```html
            <Stack.Screen
              name="Main"
              component={Main}
              options={{
                title: 'Usuários',
                headerBackTitleVisible: false,
                headerTitleAlign: 'center',
                headerTintColor: '#FFF',
                headerStyle: {
                  backgroundColor: '#7159c1',
                },
              }}
            />
         ```

      4. index.js: import routes depois do import reactotron para entrar no debug reactotron (console.tron).

6. Configurando o StatusBar
   ```Javascript
   import { StatusBar } from 'react-native';

  <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
   ```

7. Styled Components
   ```
   yarn add styled-components
   ```
   1. Criar Main/styles.js

8. Estilizando formulário
    1. Main/index.js
    2. Acesso a MaterialIcons:
        ```
        yarn add react-native-vector-icons
        ```
    3. https://github.com/oblador/react-native-vector-icons
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

9. Acessando API do Github
   1. Main/index.js
      1. Quando o usuario preencher os dados no placeholder e clicar no '+', vamos buscar os dados no github do usuario e adicionar num 'state'.
      2. Para isso, alteramos a function Main para class.
      3. obs. no Input: add value e onChangeText. Add returnKeyType e onSubmitEditing.
      4. função handleAddUser. this.handleAddUser vai no SubmitButton e não no Form (React Native não tem Form).
    2. API (adicionar axios):
        ```
        yarn add axios
        ```
        1. Criar src/services/api.js
        2. import ao handleAddUser.
    3. import { Keyboard } from 'react-native';
        1. Keyboard.dismiss();

8. Estilizando a listagem
    1. List:
        1. React Native não tem ul, li e não tem .map. React Native ja tem List padrão com barra de rolagem, etc.
        2. usar FlatList
    2. Main.index/js e Main/styles.js

9. Loading e disabled
    1. Main/index.js:
        ```
        import { Keyboard, ActivityIndicator } from 'react-native';
        ```
    2. Incluir loading no state.
    3. Main/styles.js: Add opacity.

10. Salvando no storage
    1. React Native não tem API para localstorage.
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


