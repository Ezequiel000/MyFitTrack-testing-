import AuthContent from "../components/Auth/AuthContent";
import { AuthContext } from "../store/auth-context";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { createUser } from "../util/auth";
import { useState, useContext } from "react";
import { Alert } from "react-native";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signUpHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentiction failed!",
        "Could not create user, please check your input and try again",
        [{ text: "Okay" }]
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message={"Creating Account..."} />;
  }

  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
