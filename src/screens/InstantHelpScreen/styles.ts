import { StyleSheet } from "react-native";
import { darkTheme } from "../../theme/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.background,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 40,
  },
  circleContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  circle: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: darkTheme.primary,
    opacity: 0.3,
  },
  phaseTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  phaseText: {
    color: darkTheme.primary,
  },
  instructionCard: {
    marginBottom: 32,
    width: '100%',
  },
  instruction: {
    textAlign: 'center',
  },
  doneButton: {
    width: '100%',
  },
});