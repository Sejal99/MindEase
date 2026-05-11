/**
 * Centralized string constants for the MindEase application
 * All hardcoded strings should be imported from this file, not inline
 */

// App information
export const APP_STRINGS = {
  NAME: 'MindEase',
  VERSION: '1.0.0',
};

// Navigation and screen titles
export const SCREEN_TITLES = {
  HOME: 'Home',
  HISTORY: 'History',
  INSIGHTS: 'Insights',
  ACHIEVEMENTS: 'Achievements',
  SETTINGS: 'Settings',
  NOTIFICATIONS: 'Notifications',
  ONBOARDING: 'Welcome',
  STRESS_FLOW: 'How are you feeling?',
  ACTION_SELECTION: 'Choose an action',
  INSTANT_HELP: 'Quick Relief',
  GROUNDING: 'Grounding Exercise',
  BRAIN_DUMP: 'Brain Dump',
  MOVEMENT: 'Movement Exercise',
  PMR: 'Progressive Muscle Relaxation',
  FEEDBACK: 'Session Feedback',
  SESSION_SUMMARY: 'Session Complete',
};

// Common UI text
export const UI_STRINGS = {
  BUTTONS: {
    CONTINUE: 'Continue',
    DONE: 'Done',
    CANCEL: 'Cancel',
    SAVE: 'Save',
    DELETE: 'Delete',
    EDIT: 'Edit',
    ADD: 'Add',
    REMOVE: 'Remove',
    SKIP: 'Skip',
    NEXT: 'Next',
    BACK: 'Back',
    CLOSE: 'Close',
    OK: 'OK',
    YES: 'Yes',
    NO: 'No',
    START: 'Start',
    PAUSE: 'Pause',
    RESUME: 'Resume',
    FINISH: 'Finish',
    SUBMIT: 'Submit',
    CLEAR: 'Clear',
    RESET: 'Reset',
    TRY_AGAIN: 'Try Again',
    LOADING: 'Loading...',
    ERROR: 'Error',
    SUCCESS: 'Success',
  },
  
  ACTIONS: {
    SEE_ALL: 'See All',
    VIEW_DETAILS: 'View Details',
    VIEW_PROGRESS: 'View Progress',
    ALL_HISTORY: 'All History',
    MANAGE: 'Manage',
    CONFIGURE: 'Configure',
    CUSTOMIZE: 'Customize',
    SHARE: 'Share',
    EXPORT: 'Export',
    IMPORT: 'Import',
  },

  STATUS: {
    COMPLETED: 'Completed',
    IN_PROGRESS: 'In Progress',
    PENDING: 'Pending',
    FAILED: 'Failed',
    SUCCESS: 'Success',
    ACTIVE: 'Active',
    INACTIVE: 'Inactive',
    LOCKED: 'Locked',
    UNLOCKED: 'Unlocked',
  },

  TIME: {
    SECONDS: 'seconds',
    MINUTES: 'minutes',
    HOURS: 'hours',
    DAYS: 'days',
    WEEKS: 'weeks',
    MONTHS: 'months',
    YEARS: 'years',
    AGO: 'ago',
    NOW: 'now',
    TODAY: 'Today',
    YESTERDAY: 'Yesterday',
    TOMORROW: 'Tomorrow',
  },

  QUANTITIES: {
    XP: 'XP',
    LEVEL: 'Level',
    STREAK: 'Streak',
    POINTS: 'Points',
    SCORE: 'Score',
    COUNT: 'Count',
    TOTAL: 'Total',
    REMAINING: 'Remaining',
    PROGRESS: 'Progress',
  },
};

// Exercise and activity strings
export const EXERCISE_STRINGS = {
  BREATHING: {
    TITLE: 'Breathing Exercise',
    DESCRIPTION: 'Follow the circle to calm your mind',
    INHALE: 'Inhale',
    EXHALE: 'Exhale',
    HOLD: 'Hold',
    INSTRUCTIONS: {
      STEP_1: 'Breathe in slowly through your nose',
      STEP_2: 'Hold your breath briefly',
      STEP_3: 'Exhale slowly through your mouth',
      STEP_4: 'Repeat the cycle',
    },
  },

  GROUNDING: {
    TITLE: 'Grounding Exercise',
    DESCRIPTION: 'Connect with your senses to reduce anxiety',
    STEPS: {
      SIGHT: 'Notice 5 things you can see',
      SOUND: 'Notice 4 things you can hear',
      TOUCH: 'Notice 3 things you can feel',
      SMELL: 'Notice 2 things you can smell',
      TASTE: 'Notice 1 thing you can taste',
    },
  },

  MOVEMENT: {
    QUICK_WALK: {
      TITLE: 'Quick Walk',
      DESCRIPTION: 'Reset your nervous system with movement',
      TAG: '2 min',
    },
    FULL_STRETCH: {
      TITLE: 'Full Stretch',
      DESCRIPTION: 'Open your chest, spine, and sides',
      TAG: '2 min',
    },
    NECK_RELEASE: {
      TITLE: 'Neck Release',
      DESCRIPTION: 'Melt the tension in your neck & jaw',
      TAG: '1 min',
    },
    SHOULDER_ROLL: {
      TITLE: 'Shoulder Roll',
      DESCRIPTION: 'Release shoulder and upper back tension',
      TAG: '1 min',
    },
    SPINAL_TWIST: {
      TITLE: 'Spinal Twist',
      DESCRIPTION: 'Awaken your spine and release tension',
      TAG: '1 min',
    },
    HIP_OPENER: {
      TITLE: 'Hip Opener',
      DESCRIPTION: 'Release tension from hips and lower back',
      TAG: '1 min',
    },
  },

  PMR: {
    TITLE: 'Progressive Muscle Relaxation',
    DESCRIPTION: 'Systematically tense and relax muscle groups',
    GROUPS: {
      FACE: 'Face and Jaw',
      SHOULDERS: 'Shoulders and Arms',
      CHEST: 'Chest and Back',
      ABDOMEN: 'Abdomen',
      LEGS: 'Legs and Feet',
    },
  },

  BRAIN_DUMP: {
    TITLE: 'Brain Dump',
    DESCRIPTION: 'Get thoughts out of your head and onto paper',
    PROMPT: 'What\'s on your mind right now?',
    PLACEHOLDER: 'Start writing whatever comes to mind...',
    CLEAR: 'Clear All',
    SAVE: 'Save Entry',
  },
};

// Mood and emotion strings
export const MOOD_STRINGS = {
  CALM: 'Calm',
  TENSE: 'Tense',
  ANXIOUS: 'Anxious',
  EXHAUSTED: 'Exhausted',
  OVERWHELMED: 'Overwhelmed',
  
  INTENSITY: {
    VERY_LOW: 'Very Low',
    LOW: 'Low',
    MODERATE: 'Moderate',
    HIGH: 'High',
    VERY_HIGH: 'Very High',
  },
  
  TRIGGERS: {
    WORK: 'Work',
    HEALTH: 'Health',
    FINANCE: 'Finance',
    RELATIONSHIPS: 'Relationships',
    OVERTHINKING: 'Overthinking',
    SOCIAL: 'Social',
    OTHER: 'Other',
  },
};

// Achievement strings
export const ACHIEVEMENT_STRINGS = {
  TITLE: 'Achievements',
  SUBTITLE: 'Track your progress and milestones',
  
  CATEGORIES: {
    STREAK: 'Streak Achievements',
    MILESTONE: 'Milestones',
    EXPLORER: 'Explorer',
    MASTER: 'Master',
  },
  
  STATS: {
    LEVEL: 'Level',
    DAY_STREAK: 'Day Streak',
    EXERCISES: 'Exercises',
    XP: 'XP',
  },
  
  XP: {
    TITLE: 'Experience Points',
    TO_NEXT_LEVEL: 'XP to Level',
  },
  
  PROGRESS: {
    TITLE: 'Overall Progress',
    UNLOCKED: 'Unlocked',
  },
  
  UNLOCKED: 'Unlocked',
  LOCKED: 'Locked',
  COMPLETED: 'Completed',
};

// Session and feedback strings
export const SESSION_STRINGS = {
  SUMMARY: {
    TITLE: 'Session Complete!',
    SUBTITLE: 'You\'ve completed all exercises',
    MOST_EFFECTIVE: 'Most Effective Exercise',
    HELPED_MOST: 'This exercise helped you the most',
    STATS: 'Session Stats',
  },
  
  FEEDBACK: {
    TITLE: 'Did this help?',
    SUBTITLE: 'Your feedback helps us understand what works best for you',
    OPTIONS: {
      YES: 'Yes, it helped',
      NEUTRAL: 'Somewhat',
      NO: 'No, it didn\'t help',
    },
  },
  
  STATS: {
    TRIGGER: 'Trigger',
    INTENSITY: 'Intensity',
    TOTAL_EXERCISES: 'Total Exercises',
    DURATION: 'Duration',
    EFFECTIVENESS: 'Effectiveness',
  },
};

// Settings and preferences strings
export const SETTINGS_STRINGS = {
  NOTIFICATIONS: {
    TITLE: 'Notifications',
    DESCRIPTION: 'Manage your reminder preferences',
    
    DAILY_REMINDER: 'Daily Reminder',
    WEEKLY_INSIGHTS: 'Weekly Insights',
    ACHIEVEMENT_ALERTS: 'Achievement Alerts',
    
    ENABLED: 'Enabled',
    DISABLED: 'Disabled',
    
    TIME: 'Time',
    DAYS: 'Days',
    
    CONFIRM: 'Confirm',
    CANCEL: 'Cancel',
  },
  
  APPEARANCE: {
    TITLE: 'Appearance',
    THEME: 'Theme',
    LIGHT: 'Light',
    DARK: 'Dark',
    SYSTEM: 'System',
  },
  
  PRIVACY: {
    TITLE: 'Privacy',
    DATA_COLLECTION: 'Data Collection',
    ANALYTICS: 'Analytics',
    PERSONALIZATION: 'Personalization',
  },
};

// Error and validation messages
export const ERROR_STRINGS = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  VALIDATION: 'Please check your input and try again.',
  AUTHENTICATION: 'Authentication required. Please log in.',
  PERMISSION: 'Permission denied.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  
  FORMS: {
    REQUIRED: 'This field is required.',
    INVALID_EMAIL: 'Please enter a valid email address.',
    INVALID_PHONE: 'Please enter a valid phone number.',
    PASSWORD_TOO_SHORT: 'Password must be at least 8 characters.',
    PASSWORDS_DONT_MATCH: 'Passwords do not match.',
  },
};

// Success and confirmation messages
export const SUCCESS_STRINGS = {
  SAVED: 'Saved successfully',
  UPDATED: 'Updated successfully',
  DELETED: 'Deleted successfully',
  COMPLETED: 'Completed successfully',
  SUBMITTED: 'Submitted successfully',
  COPIED: 'Copied to clipboard',
  UPLOADED: 'Uploaded successfully',
  DOWNLOADED: 'Downloaded successfully',
  
  SESSION: {
    STARTED: 'Session started',
    COMPLETED: 'Session completed successfully',
    PAUSED: 'Session paused',
    RESUMED: 'Session resumed',
  },
};

// Accessibility strings
export const ACCESSIBILITY_STRINGS = {
  VIEW_PROGRESS: 'View your progress',
  OPEN_MENU: 'Open menu',
  CLOSE_MENU: 'Close menu',
  NAVIGATE_BACK: 'Go back',
  SELECT_OPTION: 'Select option',
  PLAY_AUDIO: 'Play audio',
  PAUSE_AUDIO: 'Pause audio',
  ADJUST_VOLUME: 'Adjust volume',
  TOGGLE_THEME: 'Toggle theme',
  
  ROLES: {
    BUTTON: 'Button',
    LINK: 'Link',
    HEADING: 'Heading',
    LIST: 'List',
    LIST_ITEM: 'List item',
    NAVIGATION: 'Navigation',
    MAIN: 'Main content',
    HEADER: 'Header',
    FOOTER: 'Footer',
  },
};

// Placeholder text
export const PLACEHOLDER_STRINGS = {
  SEARCH: 'Search...',
  ENTER_TEXT: 'Enter text here...',
  SELECT_OPTION: 'Select an option...',
  CHOOSE_DATE: 'Choose a date...',
  CHOOSE_TIME: 'Choose a time...',
  ADD_NOTE: 'Add a note...',
  TYPE_MESSAGE: 'Type a message...',
};

export default {
  APP_STRINGS,
  SCREEN_TITLES,
  UI_STRINGS,
  EXERCISE_STRINGS,
  MOOD_STRINGS,
  ACHIEVEMENT_STRINGS,
  SESSION_STRINGS,
  SETTINGS_STRINGS,
  ERROR_STRINGS,
  SUCCESS_STRINGS,
  ACCESSIBILITY_STRINGS,
  PLACEHOLDER_STRINGS,
};
