import { StyleSheet } from "react-native";
import { darkTheme } from "../../theme/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.background,
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  subtitle: {
    marginTop: 8,
    textAlign: 'center',
  },
  highlightCard: {
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: darkTheme.primary,
  },
  highlightTitle: {
    marginBottom: 8,
  },
  highlightAction: {
    fontSize: 28,
    fontWeight: '700',
    color: darkTheme.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  highlightSubtitle: {
    textAlign: 'center',
  },
  summaryCard: {
    marginBottom: 16,
  },
  summaryTitle: {
    marginBottom: 16,
  },
  exerciseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: darkTheme.divider,
  },
  exerciseInfo: {
    flex: 1,
  },
  effectivenessBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: darkTheme.card,
  },
  statsCard: {
    marginBottom: 24,
  },
  statsTitle: {
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: darkTheme.divider,
  },
  statValue: {
    fontWeight: '600',
  },
  homeButton: {
    marginTop: 16,
  },
});