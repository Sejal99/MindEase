import { StyleSheet } from "react-native";
import { natureColors as colors } from "../../theme/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    padding: 24,
    paddingBottom: 100,
  },
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
    backgroundColor: colors.amberDim,
    opacity: 0.44,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
  },
  exerciseHeader: {
    marginBottom: 32,
    alignItems: "center",
  },
  exerciseTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 8,
  },
  exerciseSubtitle: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  timerSection: {
    marginBottom: 32,
  },
  stepContainer: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 24,
    shadowColor: colors.accentDeep,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  stepHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
  stepMeta: {
    color: colors.textMuted,
    fontWeight: "700",
  },
  stepText: {
    fontSize: 18,
    lineHeight: 26,
    color: colors.textPrimary,
    marginBottom: 24,
  },
  stepActions: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 100,
    alignItems: "center",
  },
  backButton: {
    backgroundColor: colors.surfaceAlt,
  },
  backButtonText: {
    color: colors.textSecondary,
  },
  startButton: {
    backgroundColor: colors.accent,
  },
  pauseButton: {
    backgroundColor: colors.amber,
  },
  nextButton: {
    backgroundColor: colors.accent,
  },
  actionText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: "600",
  },
  doneSection: {
    alignItems: "center",
    padding: 32,
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 24,
  },
  doneTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: "center",
  },
  doneText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 24,
    color: colors.textSecondary,
  },
  continueButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
  },
  continueButtonText: {
    color: colors.surface,
    fontSize: 18,
    fontWeight: "700",
  },
});
