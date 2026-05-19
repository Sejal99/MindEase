import { StyleSheet } from "react-native";
import { warmColors } from "../../theme/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // ── Decorative blobs ─────────────────────────────────────────────────────
  blob: {
    position: "absolute",
    borderRadius: 999,
    opacity: 0.5,
  },
  blobTopRight: {
    top: -80,
    right: -60,
    width: 240,
    height: 240,
  },
  blobMidLeft: {
    top: 300,
    left: -80,
    width: 180,
    height: 180,
  },
  blobBottomRight: {
    bottom: 100,
    right: -60,
    width: 200,
    height: 200,
  },

  // ── Scroll ─────────────────────────────────────────────────────────────
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },

  // ── Header ───────────────────────────────────────────────────────────────
  headerSection: {
    marginBottom: 36,
  },
  headerGreeting: {
    fontSize: 13,
    fontWeight: "500",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "300",
    letterSpacing: -1.5,
    marginBottom: 20,
    lineHeight: 36,
  },

  // ── Stat pills ───────────────────────────────────────────────────────────
  statRow: {
    flexDirection: "row",
    gap: 10,
  },
  statPill: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "700",
  },
  statLabel: {
    fontSize: 13,
    fontWeight: "500",
  },

  // ── Empty state ──────────────────────────────────────────────────────────
  emptyState: {
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 28,
  },
  emptyButton: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 28,
  },
  emptyButtonText: {
    fontSize: 15,
    fontWeight: "600",
  },

  // ── Day group ────────────────────────────────────────────────────────────
  dayGroup: {
    marginBottom: 32,
  },
  dateHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  dateLine: {
    flex: 1,
    height: 1,
  },
  dateLabel: {
    paddingHorizontal: 16,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },

  // ── Cards ────────────────────────────────────────────────────────────────
  card: {
    borderRadius: 24,
    marginBottom: 12,
    flexDirection: "row",
    overflow: "hidden",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2,
  },
  cardAccent: {
    width: 5,
    alignSelf: "stretch",
  },
  cardBody: {
    flex: 1,
    padding: 18,
  },

  // Card top
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  triggerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  triggerName: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: -0.3,
  },
  timeLabel: {
    fontSize: 12,
    fontWeight: "500",
  },

  // Action
  actionRow: {
    marginBottom: 12,
  },
  actionBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  actionBadgeText: {
    fontSize: 12,
    fontWeight: "600",
  },

  // Card bottom
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  intensityWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dotsRow: {
    flexDirection: "row",
    gap: 4,
  },
  intensityDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  dotFilled: {},
  dotEmpty: {},
  intensityLabel: {
    fontSize: 11,
    fontWeight: "500",
  },

  // Effect badge
  effectBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  effectDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  effectText: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "capitalize",
  },
});