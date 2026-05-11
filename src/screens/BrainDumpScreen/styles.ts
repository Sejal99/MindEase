import { StyleSheet } from "react-native";
import { darkTheme } from "../../theme/colors";

export const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: darkTheme.background },
  container: { flex: 1 },
  content: { padding: 24, paddingBottom: 60 },

  // Header
  label: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2.5,
    color: darkTheme.primary,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: darkTheme.text,
    lineHeight: 34,
    marginBottom: 8,
  },
  subtitle: { fontSize: 14, color: darkTheme.textSecondary, lineHeight: 20 },
  header: { marginBottom: 28 },

  // Timer row
  timerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 20,
  },
  statsColumn: { gap: 12 },
  statMini: {
    backgroundColor: darkTheme.card,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: darkTheme.border,
    alignItems: "center",
  },
  statMiniBottom: {},
  statMiniValue: { fontSize: 22, fontWeight: "800", color: darkTheme.text },
  statMiniLabel: {
    fontSize: 10,
    color: darkTheme.textSecondary,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  // Urgent
  urgentBanner: {
    backgroundColor: darkTheme.error + "20",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: darkTheme.error + "40",
    marginBottom: 12,
    alignItems: "center",
  },
  urgentText: { fontSize: 13, color: darkTheme.error, fontWeight: "600" },

  // Editor
  editorCard: {
    backgroundColor: darkTheme.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: darkTheme.border,
    padding: 16,
    minHeight: 220,
    marginBottom: 16,
  },
  editor: {
    flex: 1,
    minHeight: 200,
    color: darkTheme.text,
    fontSize: 16,
    lineHeight: 26,
  },

  // Skip
  skipBtn: { alignItems: "center", paddingVertical: 8 },
  skipText: { fontSize: 13, color: darkTheme.textSecondary, fontWeight: "600" },

  // Done screen
  doneScreen: {
    flex: 1,
    backgroundColor: darkTheme.background,
    alignItems: "center",
    padding: 24,
    paddingTop: 80,
  },
});