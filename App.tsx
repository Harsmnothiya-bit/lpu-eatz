import 'react-native-gesture-handler';
import * as React from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {PersistGate} from 'redux-persist/integration/react';

import store, {persistor} from './src/redux';
import {App as Screens} from './src/screens';
import {StatusBar} from 'react-native';

function App(): React.JSX.Element {
  React.useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('#fff');
  }, []);
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <GestureHandlerRootView style={{flex: 1}}>
          <Screens />
          <Toast position="top" topOffset={10} />
        </GestureHandlerRootView>
      </PersistGate>
    </ReduxProvider>
  );
}

export default App;
