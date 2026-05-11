import { StyleSheet } from "react-native";
import { darkTheme } from "../../theme/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.background,
  },
  content: {
    padding: 24,
    paddingBottom: 48,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: darkTheme.text,
    marginBottom: 8,
  },
  subtitle: {
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
    color: darkTheme.text,
    marginBottom: 8,
  },
  exerciseSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  timerSection: {
    marginBottom: 32,
  },
  stepContainer: {
    backgroundColor: darkTheme.card,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: darkTheme.border,
    marginBottom: 24,
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
    backgroundColor: darkTheme.primary,
  },
  stepText: {
    fontSize: 18,
    lineHeight: 26,
    color: darkTheme.text,
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
    backgroundColor: darkTheme.divider,
  },
  startButton: {
    backgroundColor: darkTheme.primary,
  },
  pauseButton: {
    backgroundColor: darkTheme.warning,
  },
  nextButton: {
    backgroundColor: darkTheme.primary,
  },
  actionText: {
    color: darkTheme.text,
    fontSize: 16,
    fontWeight: "600",
  },
  doneSection: {
    alignItems: "center",
    padding: 32,
    backgroundColor: darkTheme.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: darkTheme.border,
    marginBottom: 24,
  },
  doneTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: darkTheme.text,
    marginBottom: 8,
    textAlign: "center",
  },
  doneText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 24,
    color: darkTheme.textSecondary,
  },
  continueButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
  },
  continueButtonText: {
    color: darkTheme.text,
    fontSize: 18,
    fontWeight: "700",
  },
});