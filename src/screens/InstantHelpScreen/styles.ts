import { StyleSheet } from "react-native";
import { colors } from "../../theme/warm-colors";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  blobTopRight: {
    position: "absolute",
    top: -70,
    right: -70,
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: colors.accentLight,
    opacity: 0.28,
  },
  blobBottomLeft: {
    position: "absolute",
    bottom: 150,
    left: -80,
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: colors.tealDim,
    opacity: 0.42,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: colors.textSecondary,
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
    backgroundColor: colors.heroFill,
    borderWidth: 1,
    borderColor: colors.heroBorder,
    opacity: 0.72,
  },
  phaseTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  phaseText: {
    color: colors.accentDeep,
  },
  instructionCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 22,
    marginBottom: 28,
    width: '100%',
    shadowColor: colors.accentDeep,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  instruction: {
    color: colors.textPrimary,
    textAlign: 'center',
    fontWeight: '700',
  },
  doneButton: {
    width: '100%',
    backgroundColor: colors.accent,
    borderRadius: 18,
  },
  doneButtonText: {
    color: colors.surface,
    fontWeight: '800',
  },
});
