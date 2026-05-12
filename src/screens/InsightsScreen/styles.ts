import { StyleSheet } from "react-native";
import { N } from "../../theme/warm-colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: N.bg,
  },

  content: {
    padding: 20,
    paddingBottom: 120,
  },

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

  loaderContainer: {
    flex: 1,
    backgroundColor: N.bg,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 16,
    color: N.textSecondary,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    marginTop: 10,
  },

  title: {
    color: N.textPrimary,
    marginBottom: 6,
    letterSpacing: -0.6,
  },

  subtitle: {
    lineHeight: 22,
  },

  headerBadge: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: N.surfaceAlt,
    borderWidth: 1,
    borderColor: N.border,
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
    borderRadius: 22,
    paddingVertical: 24,
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: N.accentDeep,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  purpleCard: {
    backgroundColor: N.heroFill,
    borderColor: N.heroBorder,
  },

  blueCard: {
    backgroundColor: N.tealDim,
    borderColor: N.border,
  },

  overviewNumber: {
    color: N.textPrimary,
    fontSize: 34,
    fontWeight: '800',
  },

  overviewLabel: {
    color: N.textSecondary,
    marginTop: 6,
    fontWeight: '600',
  },

  sectionSpacing: {
    marginBottom: 18,
  },

  card: {
    backgroundColor: N.surface,
    borderRadius: 22,
    padding: 20,
    marginBottom: 18,
    borderColor: N.border,
    shadowColor: N.accentDeep,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  cardTitle: {
    color: N.textPrimary,
  },

  triggerItem: {
    borderBottomWidth: 1,
    borderBottomColor: N.borderSoft,
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
    color: N.textPrimary,
    fontWeight: '600',
  },

  triggerSubtitle: {
    marginTop: 2,
  },

  triggerPercentage: {
    color: N.accentDeep,
    fontWeight: '700',
    fontSize: 16,
  },

  progressTrack: {
    width: '100%',
    height: 10,
    backgroundColor: N.surfaceAlt,
    borderRadius: 20,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: N.accent,
    borderRadius: 20,
  },

  motivationCard: {
    backgroundColor: N.accentDim,
    borderColor: N.accentLight,
    borderRadius: 22,
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
    backgroundColor: N.surface,
    borderWidth: 1,
    borderColor: N.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },

  motivationTitle: {
    color: N.textPrimary,
    marginBottom: 6,
  },

  motivationText: {
    lineHeight: 22,
  },

  emptyCard: {
    backgroundColor: N.surface,
    borderColor: N.border,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    marginTop: 40,
  },

  emptyTitle: {
    color: N.textPrimary,
    marginBottom: 12,
  },

  emptyDescription: {
    textAlign: 'center',
    lineHeight: 24,
  },
});
