import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  offlineAccess: true,
  webClientId:
    '328289979648-b9h3b004i6rhqvsvr35gmrsk73hak23s.apps.googleusercontent.com',
});

export const googleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
  } catch (error: any) {
    console.error(error.code);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      throw new Error('User cancelled the login flow');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      throw new Error('Operation (e.g. sign in) is in progress already');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      throw new Error('Play Services not available or outdated');
    } else {
      throw new Error('Something went wrong');
    }
  }
};
