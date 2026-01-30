import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-sqlite-storage', () => ({
  DEBUG: jest.fn(),
  enablePromise: jest.fn(),
  openDatabase: jest.fn(() => ({
    executeSql: jest.fn(),
    close: jest.fn(),
  })),
}));

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
    }),
    useFocusEffect: jest.fn(),
  };
});

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: jest.fn(),
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: jest.fn(),
}));
