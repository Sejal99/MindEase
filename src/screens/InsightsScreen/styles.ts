import { StyleSheet } from "react-native";
import { darkTheme, insightsPalette } from "../../theme/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.background,
  },

  content: {
    padding: 20,
    paddingBottom: 120,
  },

  loaderContainer: {
    flex: 1,
    backgroundColor: darkTheme.background,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 16,
    color: darkTheme.textSecondary,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    marginTop: 10,
  },

  title: {
    color: darkTheme.text,
    marginBottom: 6,
  },

  subtitle: {
    lineHeight: 22,
  },

  headerBadge: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: darkTheme.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  overviewCard: {
    width: '48%',
    borderRadius: 24,
    paddingVertical: 24,
    alignItems: 'center',
  },

  purpleCard: {
    backgroundColor: darkTheme.primary,
  },

  blueCard: {
    backgroundColor: insightsPalette.blue,
  },

  overviewNumber: {
    color: darkTheme.text,
    fontSize: 34,
    fontWeight: '800',
  },

  overviewLabel: {
    color: darkTheme.textSecondary,
    marginTop: 6,
  },

  sectionSpacing: {
    marginBottom: 18,
  },

  card: {
    backgroundColor: darkTheme.card,
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  cardTitle: {
    color: darkTheme.text,
  },

  triggerItem: {
    borderBottomWidth: 1,
    borderBottomColor: darkTheme.border,
    paddingBottom: 18,
    marginBottom: 18,
  },

  triggerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  triggerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  triggerTitle: {
    color: darkTheme.text,
    fontWeight: '600',
  },

  triggerSubtitle: {
    marginTop: 2,
  },

  triggerPercentage: {
    color: insightsPalette.accent,
    fontWeight: '700',
    fontSize: 16,
  },

  progressTrack: {
    width: '100%',
    height: 10,
    backgroundColor: darkTheme.border,
    borderRadius: 20,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: insightsPalette.accent,
    borderRadius: 20,
  },

  motivationCard: {
    backgroundColor: darkTheme.card,
    borderRadius: 24,
    padding: 20,
  },

  motivationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  motivationEmojiContainer: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: darkTheme.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },

  motivationTitle: {
    color: darkTheme.text,
    marginBottom: 6,
  },

  motivationText: {
    lineHeight: 22,
  },

  emptyCard: {
    backgroundColor: darkTheme.card,
    borderRadius: 28,
    padding: 32,
    alignItems: 'center',
    marginTop: 40,
  },

  emptyTitle: {
    color: darkTheme.text,
    marginBottom: 12,
  },

  emptyDescription: {
    textAlign: 'center',
    lineHeight: 24,
  },
});