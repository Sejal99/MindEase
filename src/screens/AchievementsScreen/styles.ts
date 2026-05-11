import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import { UI_CONFIG } from "../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_DARK,
  },
  content: {
    padding: UI_CONFIG.SCREEN_PADDING,
  },
  header: {
    marginBottom: UI_CONFIG.SPACING.XXL,
  },
  subtitle: {
    marginTop: UI_CONFIG.SPACING.SM,
  },
  statsCard: {
    marginBottom: UI_CONFIG.SPACING.LG,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: UI_CONFIG.FONT_SIZES.HUGE,
    fontWeight: UI_CONFIG.FONT_WEIGHTS.BOLD,
    color: COLORS.PRIMARY,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.PROGRESS_TRACK,
  },
  xpCard: {
    marginBottom: UI_CONFIG.SPACING.LG,
  },
  xpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: UI_CONFIG.SPACING.MD,
  },
  xpBar: {
    height: 8,
    backgroundColor: COLORS.PROGRESS_TRACK,
    borderRadius: UI_CONFIG.BORDER_RADIUS.SM,
    overflow: 'hidden',
    marginBottom: UI_CONFIG.SPACING.SM,
  },
  xpFill: {
    height: '100%',
    backgroundColor: COLORS.PRIMARY,
  },
  xpText: {
    textAlign: 'center',
  },
  progressCard: {
    marginBottom: UI_CONFIG.SPACING.XXL,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: UI_CONFIG.SPACING.SM,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.PROGRESS_TRACK,
    borderRadius: UI_CONFIG.BORDER_RADIUS.SM,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.SUCCESS,
  },
  categorySection: {
    marginBottom: UI_CONFIG.SPACING.XXL,
  },
  categoryTitle: {
    marginBottom: UI_CONFIG.SPACING.MD,
  },
  achievementCard: {
    marginBottom: UI_CONFIG.SPACING.MD,
  },
  lockedCard: {
    opacity: 0.6,
  },
  achievementContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.PROGRESS_TRACK,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: UI_CONFIG.SPACING.LG,
  },
  achievementIcon: {
    fontSize: UI_CONFIG.FONT_SIZES.XXL,
  },
  achievementDetails: {
    flex: 1,
  },
  unlockedText: {
    marginTop: UI_CONFIG.SPACING.SM,
  },
});