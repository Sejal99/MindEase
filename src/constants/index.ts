/**
 * Centralized constants for the MindEase application
 * All hardcoded values should be imported from this file, not inline
 */

// ============================================================================
// APP CONFIGURATION
// ============================================================================

export const APP_CONFIG = {
  NAME: 'MindEase',
  VERSION: '1.0.0',
  BUILD_NUMBER: '1',
  MINIMUM_SUPPORTED_VERSION: '1.0.0',
  
  // API endpoints
  API_BASE_URL: __DEV__ ? 'http://localhost:3000/api' : 'https://api.mindease.app/api',
  API_TIMEOUT: 10000, // 10 seconds
  
  // Storage
  STORAGE_VERSION: 1,
  MAX_STORAGE_SIZE: 50 * 1024 * 1024, // 50MB
  
  // Performance
  MAX_CONCURRENT_REQUESTS: 3,
  CACHE_TTL: 5 * 60 * 1000, // 5 minutes
};

// ============================================================================
// EXERCISE CONFIGURATION
// ============================================================================

export const EXERCISE_CONFIG = {
  // Default durations (in seconds)
  DEFAULT_BREATHING_DURATION: 8,
  DEFAULT_GROUNDING_DURATION: 60,
  DEFAULT_MOVEMENT_DURATION: 120,
  DEFAULT_PMR_DURATION: 180,
  DEFAULT_BRAIN_DUMP_DURATION: 300,
  
  // Exercise limits
  MIN_EXERCISE_DURATION: 30,
  MAX_EXERCISE_DURATION: 600,
  EXERCISE_STEP_DURATION: 15,
  
  // Breathing cycle timing
  BREATHING_CYCLE: {
    INHALE: 4,
    HOLD: 4,
    EXHALE: 4,
    HOLD_EMPTY: 2,
  },
  
  // PMR muscle groups
  PMR_MUSCLE_GROUPS: [
    'face',
    'shoulders',
    'arms',
    'chest',
    'abdomen',
    'legs',
    'feet',
  ],
  
  // Movement exercises
  MOVEMENT_EXERCISES: {
    QUICK_WALK: {
      id: 'quick-walk',
      title: 'Quick Walk',
      description: 'Reset your nervous system with movement',
      duration: 120,
      tag: '2 min',
    },
    FULL_STRETCH: {
      id: 'full-stretch',
      title: 'Full Stretch',
      description: 'Open your chest, spine, and sides',
      duration: 120,
      tag: '2 min',
    },
    NECK_RELEASE: {
      id: 'neck-release',
      title: 'Neck Release',
      description: 'Melt the tension in your neck & jaw',
      duration: 60,
      tag: '1 min',
    },
    SHOULDER_ROLL: {
      id: 'shoulder-roll',
      title: 'Shoulder Roll',
      description: 'Release shoulder and upper back tension',
      duration: 60,
      tag: '1 min',
    },
    SPINAL_TWIST: {
      id: 'spinal-twist',
      title: 'Spinal Twist',
      description: 'Awaken your spine and release tension',
      duration: 60,
      tag: '1 min',
    },
    HIP_OPENER: {
      id: 'hip-opener',
      title: 'Hip Opener',
      description: 'Release tension from hips and lower back',
      duration: 60,
      tag: '1 min',
    },
  },
};

// ============================================================================
// USER INTERFACE CONFIGURATION
// ============================================================================

export const UI_CONFIG = {
  // Layout
  SCREEN_PADDING: 20,
  CARD_PADDING: 16,
  BUTTON_HEIGHT: 48,
  INPUT_HEIGHT: 48,
  ICON_SIZE: 24,
  
  // Typography
  FONT_SIZES: {
    XS: 12,
    SM: 14,
    MD: 16,
    LG: 18,
    XL: 20,
    XXL: 24,
    XXXL: 32,
    HUGE: 48,
  },
  
  FONT_WEIGHTS: {
    LIGHT: '300' as const,
    NORMAL: '400' as const,
    MEDIUM: '500' as const,
    SEMIBOLD: '600' as const,
    BOLD: '700' as const,
    EXTRABOLD: '800' as const,
  },
  
  // Spacing
  SPACING: {
    XS: 4,
    SM: 8,
    MD: 12,
    LG: 16,
    XL: 20,
    XXL: 24,
    XXXL: 32,
    HUGE: 48,
  },
  
  // Border radius
  BORDER_RADIUS: {
    SM: 4,
    MD: 8,
    LG: 12,
    XL: 16,
    XXL: 20,
    ROUND: 999,
  },
  
  // Animations
  ANIMATION_DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
    EXTRA_SLOW: 1000,
  },
  
  // Breakpoints
  BREAKPOINTS: {
    SM: 375,
    MD: 768,
    LG: 1024,
    XL: 1440,
  },
};

// ============================================================================
// SESSION AND TRACKING CONFIGURATION
// ============================================================================

export const SESSION_CONFIG = {
  // Intensity levels
  INTENSITY_LEVELS: {
    VERY_LOW: 1,
    LOW: 2,
    MODERATE: 3,
    HIGH: 4,
    VERY_HIGH: 5,
  },
  
  // Session limits
  MAX_SESSION_DURATION: 30 * 60, // 30 minutes
  MIN_SESSION_DURATION: 2 * 60, // 2 minutes
  MAX_EXERCISES_PER_SESSION: 10,
  
  // Streak configuration
  STREAK_RESET_HOURS: 48, // Reset streak after 48 hours of inactivity
  MAX_STREAK_LENGTH: 3650, // 10 years maximum
  
  // XP calculation
  XP_PER_EXERCISE: 10,
  XP_PER_SESSION: 50,
  XP_PER_STREAK_DAY: 5,
  XP_PER_ACHIEVEMENT: 100,
  
  // Level progression
  XP_PER_LEVEL: 100,
  MAX_LEVEL: 100,
  
  // Effectiveness ratings
  EFFECTIVENESS_WEIGHTS: {
    YES: 1.0,
    NEUTRAL: 0.5,
    NO: 0.0,
  },
};

// ============================================================================
// ACHIEVEMENT CONFIGURATION
// ============================================================================

export const ACHIEVEMENT_CONFIG = {
  // Streak achievements
  STREAK_ACHIEVEMENTS: [
    { days: 3, xp: 50, title: '3-Day Streak' },
    { days: 7, xp: 100, title: 'Week Warrior' },
    { days: 14, xp: 200, title: 'Two Week Triumph' },
    { days: 30, xp: 500, title: 'Monthly Master' },
    { days: 60, xp: 1000, title: '60-Day Champion' },
    { days: 90, xp: 1500, title: 'Quarterly Queen' },
    { days: 180, xp: 3000, title: 'Half-Year Hero' },
    { days: 365, xp: 5000, title: 'Yearly Legend' },
  ],
  
  // Exercise achievements
  EXERCISE_ACHIEVEMENTS: [
    { count: 1, xp: 10, title: 'First Steps' },
    { count: 10, xp: 50, title: 'Getting Started' },
    { count: 25, xp: 100, title: 'Regular Practitioner' },
    { count: 50, xp: 200, title: 'Dedicated User' },
    { count: 100, xp: 500, title: 'Exercise Expert' },
    { count: 250, xp: 1000, title: 'Master of Mindfulness' },
    { count: 500, xp: 2000, title: 'Zen Master' },
    { count: 1000, xp: 5000, title: 'Enlightened' },
  ],
  
  // Session achievements
  SESSION_ACHIEVEMENTS: [
    { count: 1, xp: 20, title: 'First Session' },
    { count: 5, xp: 50, title: 'Session Starter' },
    { count: 10, xp: 100, title: 'Regular Sessions' },
    { count: 25, xp: 250, title: 'Session Pro' },
    { count: 50, xp: 500, title: 'Session Master' },
    { count: 100, xp: 1000, title: 'Session Guru' },
  ],
  
  // XP achievements
  XP_ACHIEVEMENTS: [
    { xp: 100, title: 'Level 1: Beginner' },
    { xp: 500, title: 'Level 5: Novice' },
    { xp: 1000, title: 'Level 10: Apprentice' },
    { xp: 2500, title: 'Level 25: Practitioner' },
    { xp: 5000, title: 'Level 50: Expert' },
    { xp: 10000, title: 'Level 100: Master' },
  ],
};

// ============================================================================
// NOTIFICATION CONFIGURATION
// ============================================================================

export const NOTIFICATION_CONFIG = {
  // Default times
  DEFAULT_REMINDER_TIME: '09:00',
  DEFAULT_INSIGHTS_TIME: '18:00',
  
  // Notification channels
  CHANNELS: {
    DAILY_REMINDER: 'daily_reminder',
    WEEKLY_INSIGHTS: 'weekly_insights',
    ACHIEVEMENT_ALERTS: 'achievement_alerts',
    STREAK_REMINDERS: 'streak_reminders',
  },
  
  // Notification types
  TYPES: {
    REMINDER: 'reminder',
    INSIGHTS: 'insights',
    ACHIEVEMENT: 'achievement',
    STREAK: 'streak',
  },
  
  // Days of week
  DAYS_OF_WEEK: [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ],
  
  // Weekends
  WEEKEND_DAYS: ['saturday', 'sunday'],
  
  // Scheduling
  NOTIFICATION_WINDOW: {
    START: '08:00',
    END: '20:00',
  },
};

// ============================================================================
// VALIDATION CONFIGURATION
// ============================================================================

export const VALIDATION_CONFIG = {
  // Text input limits
  MAX_NOTE_LENGTH: 500,
  MAX_TITLE_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 200,
  
  // Numeric limits
  MIN_INTENSITY: 1,
  MAX_INTENSITY: 5,
  MIN_DURATION: 30,
  MAX_DURATION: 600,
  
  // Email validation
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  
  // Password requirements
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  PASSWORD_REQUIRE_UPPERCASE: true,
  PASSWORD_REQUIRE_LOWERCASE: true,
  PASSWORD_REQUIRE_NUMBERS: true,
  PASSWORD_REQUIRE_SYMBOLS: false,
};

// ============================================================================
// ANALYTICS AND TRACKING
// ============================================================================

export const ANALYTICS_CONFIG = {
  // Event names
  EVENTS: {
    APP_OPENED: 'app_opened',
    SESSION_STARTED: 'session_started',
    SESSION_COMPLETED: 'session_completed',
    EXERCISE_COMPLETED: 'exercise_completed',
    ACHIEVEMENT_UNLOCKED: 'achievement_unlocked',
    STREAK_MILESTONE: 'streak_milestone',
    SETTINGS_CHANGED: 'settings_changed',
    ONBOARDING_COMPLETED: 'onboarding_completed',
  },
  
  // Screen names
  SCREENS: {
    HOME: 'home',
    HISTORY: 'history',
    INSIGHTS: 'insights',
    ACHIEVEMENTS: 'achievements',
    SETTINGS: 'settings',
    STRESS_FLOW: 'stress_flow',
    EXERCISE: 'exercise',
    ONBOARDING: 'onboarding',
  },
  
  // User properties
  USER_PROPERTIES: {
    LEVEL: 'level',
    XP: 'xp',
    STREAK: 'streak',
    TOTAL_SESSIONS: 'total_sessions',
    TOTAL_EXERCISES: 'total_exercises',
    FAVORITE_EXERCISE: 'favorite_exercise',
    THEME: 'theme',
    NOTIFICATIONS_ENABLED: 'notifications_enabled',
  },
  
  // Batch settings
  BATCH_SIZE: 50,
  BATCH_INTERVAL: 30 * 1000, // 30 seconds
  MAX_BATCH_SIZE: 100,
};

// ============================================================================
// DEBUG AND DEVELOPMENT
// ============================================================================

export const DEBUG_CONFIG = {
  // Feature flags
  ENABLE_ANALYTICS: !__DEV__,
  ENABLE_CRASH_REPORTING: !__DEV__,
  ENABLE_PERFORMANCE_MONITORING: __DEV__,
  ENABLE_NETWORK_LOGGING: __DEV__,
  ENABLE_CONSOLE_LOGS: __DEV__,
  
  // Debug settings
  LOG_LEVEL: __DEV__ ? 'debug' : 'error',
  NETWORK_TIMEOUT: 15000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  
  // Performance monitoring
  PERFORMANCE_SAMPLE_RATE: 0.1, // 10%
  SLOW_RENDER_THRESHOLD: 16, // 16ms (60fps)
  MEMORY_WARNING_THRESHOLD: 100 * 1024 * 1024, // 100MB
};

// ============================================================================
// ENVIRONMENT SPECIFIC CONFIG
// ============================================================================

export const ENV_CONFIG = {
  isDevelopment: __DEV__,
  isProduction: !__DEV__,
  isTesting: false,
  
  // URLs
  WEBSITE_URL: 'https://mindease.app',
  SUPPORT_URL: 'https://support.mindease.app',
  PRIVACY_URL: 'https://mindease.app/privacy',
  TERMS_URL: 'https://mindease.app/terms',
  
  // Contact
  SUPPORT_EMAIL: 'support@mindease.app',
  FEEDBACK_EMAIL: 'feedback@mindease.app',
  
  // Social
  TWITTER_URL: 'https://twitter.com/mindease',
  INSTAGRAM_URL: 'https://instagram.com/mindease',
  
  // App Store
  APP_STORE_URL: 'https://apps.apple.com/app/mindease',
  PLAY_STORE_URL: 'https://play.google.com/store/apps/details?id=com.mindease',
};

// ============================================================================
// EXPORT ALL CONSTANTS
// ============================================================================

export default {
  APP_CONFIG,
  EXERCISE_CONFIG,
  UI_CONFIG,
  SESSION_CONFIG,
  ACHIEVEMENT_CONFIG,
  NOTIFICATION_CONFIG,
  VALIDATION_CONFIG,
  ANALYTICS_CONFIG,
  DEBUG_CONFIG,
  ENV_CONFIG,
};
