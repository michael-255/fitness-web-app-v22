import { z } from 'zod'
import {
    DurationEnum,
    ExerciseInputEnum,
    LimitEnum,
    LogLevelEnum,
    MeasurementFieldEnum,
    PlanIdEnum,
    RouteNameEnum,
    SettingIdEnum,
    StatusEnum,
    TableEnum,
} from './enums'

/**
 * Defining in one file to reduce the likelyhood of circular dependencies.
 */

//
// Shared
//

export const tableSchema = z.nativeEnum(TableEnum)
export const routeNameSchema = z.nativeEnum(RouteNameEnum)
export const statusSchema = z.nativeEnum(StatusEnum)
export const idSchema = z.string().refine(
    (id) => {
        // Trim off prefix and check if uuid is valid
        // Does not validate if the prefix used is correct
        if (z.string().uuid().safeParse(id.substring(4)).success) {
            return true // uuid valid
        } else if (settingIdSchema.safeParse(id).success) {
            return true // setting id valid
        } else if (planIdSchema.safeParse(id).success) {
            return true // plan id valid
        } else {
            return false // invalid
        }
    },
    {
        message: 'Invalid Id',
    },
)
export const timestampSchema = z.number().int()
export const textLineSchema = z.string().min(1).max(LimitEnum.MAX_TEXT_LINE).trim()
export const textAreaSchema = z.string().max(LimitEnum.MAX_TEXT_AREA).trim() // desc, notes, etc.
export const statusListSchema = z
    .nativeEnum(StatusEnum)
    .array()
    .refine(
        (status) => {
            // Check for duplicates
            // Status not used by a record type will be ignored
            return new Set(status).size === status.length
        },
        {
            message: 'Cannot have duplicate status',
        },
    )

//
// Settings
//

export const settingIdSchema = z.nativeEnum(SettingIdEnum)
export const settingValueSchema = z.union([z.boolean(), z.nativeEnum(DurationEnum)])
export const settingSchema = z.object({
    id: settingIdSchema, // Instead of standard ID
    value: settingValueSchema,
})

//
// Logs
//

export const logLevelSchema = z.nativeEnum(LogLevelEnum)
export const logLabelSchema = z.string().trim()
export const logDetailsSchema = z.record(z.any()).or(z.instanceof(Error)).optional()
export const logSchema = z.object({
    id: idSchema,
    createdAt: timestampSchema,
    logLevel: logLevelSchema,
    label: logLabelSchema,
    details: logDetailsSchema,
})

//
// Measurements
//

export const measurementFieldSchema = z.nativeEnum(MeasurementFieldEnum)
export const caloriesSchema = z.number().int().min(0).max(LimitEnum.MAX_CALORIES)
export const nutritionSchema = z.number().int().min(0).max(LimitEnum.MAX_NUTRITION)
export const bodyWeightSchema = z.number().positive().max(LimitEnum.MAX_BODY_WEIGHT)
export const cholesterolSchema = z.number().int().min(0).max(LimitEnum.MAX_CHOLESTEROL)
export const percentSchema = z.number().min(0).max(100)
export const temperatureSchema = z
    .number()
    .min(LimitEnum.MIN_TEMPERATURE)
    .max(LimitEnum.MAX_TEMPERATURE)
export const bloodPressureReadingSchema = z
    .number()
    .int()
    .min(LimitEnum.MIN_BLOOD_PRESSURE)
    .max(LimitEnum.MAX_BLOOD_PRESSURE)
export const bodyMeasurementSchema = z.number().min(0).max(LimitEnum.MAX_BODY_MEASUREMENT)
export const measurementSchema = z.object({
    id: idSchema,
    createdAt: timestampSchema,
    note: textAreaSchema,
    field: measurementFieldSchema,
    // Diet & Weight
    calories: caloriesSchema.optional(),
    carbs: nutritionSchema.optional(),
    fat: nutritionSchema.optional(),
    protein: nutritionSchema.optional(),
    // Weight
    bodyWeight: bodyWeightSchema.optional(),
    bodyFat: percentSchema.optional(),
    // Health
    temperature: temperatureSchema.optional(),
    bloodPressureSystolic: bloodPressureReadingSchema.optional(),
    bloodPressureDiastolic: bloodPressureReadingSchema.optional(),
    bloodOxygen: percentSchema.optional(),
    // Body
    neck: bodyMeasurementSchema.optional(),
    shoulders: bodyMeasurementSchema.optional(),
    chest: bodyMeasurementSchema.optional(),
    waist: bodyMeasurementSchema.optional(),
    leftBicep: bodyMeasurementSchema.optional(),
    rightBicep: bodyMeasurementSchema.optional(),
    leftForearm: bodyMeasurementSchema.optional(),
    rightForearm: bodyMeasurementSchema.optional(),
    leftThigh: bodyMeasurementSchema.optional(),
    rightThigh: bodyMeasurementSchema.optional(),
    leftCalf: bodyMeasurementSchema.optional(),
    rightCalf: bodyMeasurementSchema.optional(),
    // Lab Work
    cholesterol: cholesterolSchema.optional(),
    cholesterolHDL: cholesterolSchema.optional(),
    cholesterolLDL: cholesterolSchema.optional(),
    hemoglobinA1C: percentSchema.optional(),
})

//
// Plans
//

export const planIdSchema = z.nativeEnum(PlanIdEnum)
export const planSchema = z.object({
    id: planIdSchema, // Instead of standard ID
    createdAt: timestampSchema,
    // TODO
})

//
// Exercise Results
//

export const setRpeSchema = z.number().int().min(0).max(LimitEnum.MAX_RPE)
export const checklistSetSchema = z.object({
    label: textLineSchema,
    checked: z.boolean(),
})
export const cardioSetSchema = z.object({
    durationSeconds: z.number().int().min(0).max(LimitEnum.MAX_DURATION_SEC),
    caloriesBurned: z.number().int().min(0).max(LimitEnum.MAX_CALORIES_BURNED),
    rpe: setRpeSchema,
})
export const weightSetSchema = z.object({
    weight: z.number().min(0).max(LimitEnum.MAX_WEIGHT), // Can be decimal
    reps: z.number().int().min(0).max(LimitEnum.MAX_REPS),
    rpe: setRpeSchema,
})
export const sidedWeightSetSchema = z.object({
    left: weightSetSchema,
    right: weightSetSchema,
})
// TODO: Still need to think about the design of this
export const climbingSetSchema = z.object({
    listedGrade: z.any(), // TODO
    myGrade: z.any(), // TODO
    styles: z.any(), // TODO
    image: z.any(), // TODO
    attempts: z.any(), // TODO
    topped: z.boolean(),
})
export const exerciseResultSchema = z.object({
    id: idSchema,
    createdAt: timestampSchema,
    status: statusListSchema,
    parentId: idSchema,
    note: textAreaSchema,
    checklistSets: z.array(checklistSetSchema).optional(),
    cardioSets: z.array(cardioSetSchema).optional(),
    weightSets: z.array(weightSetSchema).optional(),
    sidedWeightSets: z.array(sidedWeightSetSchema).optional(),
    climbingSets: z.array(climbingSetSchema).optional(),
})

//
// Exercises
//

export const exerciseInputSchema = z.nativeEnum(ExerciseInputEnum)
export const initialSetCountSchema = z.number().int().min(1).max(LimitEnum.MAX_SETS)
// Rest timer minimum is 30 seconds and maximum is 15 minutes.
// Timer should be incremented by 30 seconds.
export const restTimerSchema = z.object({
    defaultDurationSeconds: z
        .number()
        .int()
        .min(LimitEnum.MIN_REST_TIMER)
        .max(LimitEnum.MAX_REST_TIMER),
})
// TODO: Still need to think about the design of this
export const tabataTimerSchema = z.object({
    prepare: z.number().int(), // TODO
    work: z.number().int(), // TODO
    rest: z.number().int(), // TODO
    sets: z.number().int(), // TODO
    rounds: z.number().int(), // TODO
    restBetweenSets: z.number().int(), // TODO
    restBetweenRounds: z.number().int(), // TODO
})
export const exerciseSchema = z.object({
    id: idSchema,
    createdAt: timestampSchema,
    status: statusListSchema,
    name: textLineSchema,
    desc: textAreaSchema,
    lastChild: exerciseResultSchema.optional(),
    inputs: exerciseInputSchema,
    initialSetCount: initialSetCountSchema,
    restTimer: restTimerSchema.optional(),
    tabataTimer: tabataTimerSchema.optional(),
})

//
// Workout Results
//

export const exerciseResultGroupSchema = z.object({
    exerciseResultIds: z.array(idSchema.optional()), // undefined = exercise skipped or missing
})
export const workoutResultSchema = z.object({
    id: idSchema,
    createdAt: timestampSchema,
    status: statusListSchema,
    parentId: idSchema,
    note: textAreaSchema,
    finishedAt: timestampSchema.optional(),
    warmupResultGroups: z.array(exerciseResultGroupSchema),
    cooldownResultGroups: z.array(exerciseResultGroupSchema),
    exerciseResultGroups: z.array(exerciseResultGroupSchema),
})

//
// Workouts
//

export const exerciseGroupSchema = z.object({
    exerciseIds: z.array(idSchema), // 2+ means it's a superset
})
export const workoutSchema = z.object({
    id: idSchema,
    createdAt: timestampSchema,
    status: statusListSchema,
    name: textLineSchema,
    desc: textAreaSchema,
    lastChild: workoutResultSchema.optional(),
    warmupGroups: z.array(exerciseGroupSchema),
    cooldownGroups: z.array(exerciseGroupSchema),
    exerciseGroups: z.array(exerciseGroupSchema),
    nextWorkoutIds: z.array(idSchema),
})
