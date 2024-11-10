/**
 * Defining in one file to reduce the likelyhood of circular dependencies.
 */

//
// Shared
//

/**
 * Route names used by the router for page selection.
 */
export enum RouteNameEnum {
    MENU_LAYOUT = 'MenuLayout',
    PLANS_DASHBOARD = 'PlansDashboard',
    WORKOUTS_DASHBOARD = 'WorkoutsDashboard',
    EXERCISES_DASHBOARD = 'ExercisesDashboard',
    MEASUREMENTS_DASHBOARD = 'MeasurementsDashboard',
    TABLE = 'Table',
    SETTINGS = 'Settings',
    ABOUT = 'About',
    DONATE = 'Donate',
    NOT_FOUND = 'NotFound',
}

/**
 * URL slug safe string representations of database table names.
 */
export enum TableEnum {
    SETTINGS = 'settings', // Standalone
    LOGS = 'logs', // Standalone
    PLANS = 'plans', // Standalone
    MEASUREMENTS = 'measurements', // Standalone
    WORKOUTS = 'workouts', // Parent
    WORKOUT_RESULTS = 'workout-results', // Child
    EXERCISES = 'exercises', // Parent
    EXERCISE_RESULTS = 'exercise-results', // Child
}

/**
 * Status indicators used to modify how the app treats a record with it.
 */
export enum StatusEnum {
    LOCKED = 'Locked', // Shared - No user interaction allowed
    HIDDEN = 'Hidden', // Parent
    FAVORITED = 'Favorited', // Parent
}

export enum LimitEnum {
    MAX_TEXT_AREA = 300,
    MAX_TEXT_LINE = 50,
    MAX_SETS = 30,
    MAX_WEIGHT = 9_999,
    MAX_REPS = 9_999,
    MAX_RPE = 10,
    MIN_REST_TIMER = 30, // 30 seconds
    MAX_REST_TIMER = 900, // 15 minutes
    MAX_DURATION_SEC = 359_999, // 99 hours 59 minutes 59 seconds
    MAX_CALORIES_BURNED = 9_999,
    MAX_CALORIES = 99_999,
    MAX_NUTRITION = 9_999,
    MAX_BODY_WEIGHT = 9_999,
    MIN_TEMPERATURE = 60,
    MAX_TEMPERATURE = 115,
    MAX_BODY_MEASUREMENT = 999,
    MIN_BLOOD_PRESSURE = 30,
    MAX_BLOOD_PRESSURE = 300,
    MAX_CHOLESTEROL = 999,
}

export enum DurationEnum {
    Now = 'Now',
    'One Second' = 'One Second',
    'One Minute' = 'One Minute',
    'One Hour' = 'One Hour',
    'One Day' = 'One Day',
    'One Week' = 'One Week',
    'One Month' = 'One Month',
    'Three Months' = 'Three Months',
    'Six Months' = 'Six Months',
    'One Year' = 'One Year',
    'Two Years' = 'Two Years',
    'Three Years' = 'Three Years',
    'All Time' = 'All Time',
    'Forever' = 'Forever',
}

export enum DurationMSEnum {
    Now = 1,
    'One Second' = 1_000,
    'One Minute' = 60_000,
    'One Hour' = 3_600_000,
    'One Day' = 86_400_000,
    'One Week' = 604_800_000,
    'One Month' = 2_592_000_000,
    'Three Months' = 7_776_000_000,
    'Six Months' = 15_552_000_000,
    'One Year' = 31_536_000_000,
    'Two Years' = 63_072_000_000,
    'Three Years' = 94_608_000_000,
    'All Time' = Number.MAX_SAFE_INTEGER - 1, // So it doesn't match 'Forever'
    'Forever' = Number.MAX_SAFE_INTEGER,
}

//
// Settings
//

/**
 * The only valid IDs for settings in the application.
 */
export enum SettingIdEnum {
    ADVANCED_MODE = 'Advanced Mode',
    INSTRUCTIONS_OVERLAY = 'Instructions Overlay',
    CONSOLE_LOGS = 'Console Logs',
    INFO_MESSAGES = 'Info Messages',
    LOG_RETENTION_DURATION = 'Log Rentention Duration',
}

//
// Logs
//

export enum LogLevelEnum {
    DEBUG = 'DEBUG',
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR',
}

//
// Measurements
//

export enum MeasurementFieldEnum {
    // Diet
    CALORIES = 'Calories',
    CARBS = 'Carbs',
    FAT = 'Fat',
    PROTEIN = 'Protein',
    // Weight
    BODY_WEIGHT = 'Body Weight',
    BODY_FAT = 'Body Fat', // %
    // Health
    TEMPERATURE = 'Temperature',
    BLOOD_PRESSURE = 'Blood Pressure', // Systolic/Diastolic
    BLOOD_OXYGEN = 'Blood Oxygen',
    // Body
    NECK = 'Neck',
    SHOULDERS = 'Shoulders',
    CHEST = 'Chest',
    WAIST = 'Waist',
    BICEPS = 'Biceps',
    FOREARMS = 'Forearms',
    THIGHS = 'Thighs',
    CALVES = 'Calves',
    // Lab Work
    CHOLESTEROL = 'Cholesterol', // mg/dL
    CHOLESTEROL_HDL = 'Cholesterol HDL', // mg/dL
    CHOLESTEROL_LDL = 'Cholesterol LDL', // mg/dL
    HEMOGLOBIN_A1C = 'Hemoglobin A1C', // %
}

//
// Plans
//

/**
 * The only valid IDs for plans in the application.
 */
export enum PlanIdEnum {
    // Specific weekday recurring
    MONDAY = 'Monday',
    TUESDAY = 'Tuesday',
    WEDNESDAY = 'Wednesday',
    THURSDAY = 'Thursday',
    FRIDAY = 'Friday',
    SATURDAY = 'Saturday',
    SUNDAY = 'Sunday',
    // Specific month recurring
    JANUARY = 'January',
    FEBRUARY = 'February',
    MARCH = 'March',
    APRIL = 'April',
    MAY = 'May',
    JUNE = 'June',
    JULY = 'July',
    AUGUST = 'August',
    SEPTEMBER = 'September',
    OCTOBER = 'October',
    NOVEMBER = 'November',
    DECEMBER = 'December',
    // Long term recurring
    MONTHLY = 'Monthly',
    YEARLY = 'Yearly',
}

//
// Exercises
//

/**
 * Used to determine the type of inputs available for an exercise.
 */
export enum ExerciseInputEnum {
    CHECKLIST = 'Checklist', // Check boxes, all optional
    CARDIO = 'Cardio Exercise', // Duration, Calories, RPE
    WEIGHT = 'Weight Exercise', // Reps, Weight, RPE
    SIDED_WEIGHT = 'Sided Weight Exercise', // Reps (R/L), Weight (R/L), RPE (R/L)
    CLIMBING_SESSION = 'Climbing Session',
}
