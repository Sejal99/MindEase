import { StyleSheet } from "react-native";
import { N } from "../../theme/warm-colors";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: N.bg },
  blobTopRight: {
    position: "absolute",
    top: -70,
    right: -70,
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: N.accentLight,
    opacity: 0.28,
  },
  blobBottomLeft: {
    position: "absolute",
    bottom: 150,
    left: -80,
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: N.tealDim,
    opacity: 0.42,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: N.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: N.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
  },
  circleContainer: {
    width: 220,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  circle: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: N.heroFill,
    borderWidth: 1,
    borderColor: N.heroBorder,
    opacity: 0.72,
  },
  phaseTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  phaseText: {
    color: N.accentDeep,
  },
  instructionCard: {
    backgroundColor: N.surface,
    borderColor: N.border,
    borderRadius: 22,
    marginBottom: 28,
    width: '100%',
    shadowColor: N.accentDeep,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  instruction: {
    color: N.textPrimary,
    textAlign: 'center',
    fontWeight: '700',
  },
  doneButton: {
    width: '100%',
    backgroundColor: N.accent,
    borderRadius: 18,
  },
  doneButtonText: {
    color: N.surface,
    fontWeight: '800',
  },
});
