import type { BaseService } from '@/services/BaseService'
import type { Component } from 'vue'
import { z } from 'zod'
import type {
    bloodPressureReadingSchema,
    bodyMeasurementSchema,
    bodyWeightSchema,
    caloriesSchema,
    cardioSetSchema,
    checklistSetSchema,
    cholesterolSchema,
    climbingSetSchema,
    exerciseGroupSchema,
    exerciseInputSchema,
    exerciseResultGroupSchema,
    exerciseResultSchema,
    exerciseSchema,
    idSchema,
    initialSetCountSchema,
    logDetailsSchema,
    logLabelSchema,
    logLevelSchema,
    logSchema,
    measurementFieldSchema,
    measurementSchema,
    nutritionSchema,
    percentSchema,
    planIdSchema,
    planSchema,
    restTimerSchema,
    routeNameSchema,
    setRpeSchema,
    settingIdSchema,
    settingSchema,
    settingValueSchema,
    sidedWeightSetSchema,
    statusSchema,
    tabataTimerSchema,
    tableSchema,
    temperatureSchema,
    textAreaSchema,
    textLineSchema,
    timestampSchema,
    weightSetSchema,
    workoutResultSchema,
    workoutSchema,
} from './schemas'

/**
 * Defining in one file to reduce the likelyhood of circular dependencies.
 */

//
// App
//

export type BackupType = {
    appName: string
    databaseVersion: string
    createdAt: TimestampType
    settings: SettingType[]
    logs: LogType[]
    plans: PlanType[]
    measurements: MeasurementType[]
    workouts: WorkoutType[]
    workoutResults: WorkoutResultType[]
    exercises: ExerciseType[]
    exerciseResults: ExerciseResultType[]
}

export type SelectOption = {
    value: IdType
    label: string
    disable: boolean
}

export type ComponentWithPropsType = {
    component: Component
    props?: Record<string, any>
}

//
// Shared
//

export type TableType = z.infer<typeof tableSchema>
export type RouteNameType = z.infer<typeof routeNameSchema>
export type ServiceType = InstanceType<new (...args: any[]) => BaseService>
export type IdType = z.infer<typeof idSchema>
export type TimestampType = z.infer<typeof timestampSchema>
export type TextLineType = z.infer<typeof textLineSchema>
export type TextAreaType = z.infer<typeof textAreaSchema>
export type StatusType = z.infer<typeof statusSchema>

//
// Settings
//

export type SettingIdType = z.infer<typeof settingIdSchema>
export type SettingValueType = z.infer<typeof settingValueSchema>
export type SettingType = z.infer<typeof settingSchema>

//
// Logs
//

export type LogLevelType = z.infer<typeof logLevelSchema>
export type LogLabelType = z.infer<typeof logLabelSchema>
export type LogDetailsType = z.infer<typeof logDetailsSchema>
export type LogType = z.infer<typeof logSchema>

//
// Measurements
//

export type MeasurementFieldType = z.infer<typeof measurementFieldSchema>
export type CaloriesType = z.infer<typeof caloriesSchema>
export type NutritionType = z.infer<typeof nutritionSchema>
export type BodyWeightType = z.infer<typeof bodyWeightSchema>
export type CholesterolType = z.infer<typeof cholesterolSchema>
export type PercentType = z.infer<typeof percentSchema>
export type TemperatureType = z.infer<typeof temperatureSchema>
export type BloodPressureReadingType = z.infer<typeof bloodPressureReadingSchema>
export type BodyMeasurementType = z.infer<typeof bodyMeasurementSchema>
export type MeasurementType = z.infer<typeof measurementSchema>

//
// Plans
//

export type PlanIdType = z.infer<typeof planIdSchema>
export type PlanType = z.infer<typeof planSchema>

//
// Exercise Results
//

export type SetRpeType = z.infer<typeof setRpeSchema>
export type ChecklistSetType = z.infer<typeof checklistSetSchema>
export type CardioSetType = z.infer<typeof cardioSetSchema>
export type WeightSetType = z.infer<typeof weightSetSchema>
export type SidedWeightSetType = z.infer<typeof sidedWeightSetSchema>
export type ClimbingSetType = z.infer<typeof climbingSetSchema>
export type ExerciseResultType = z.infer<typeof exerciseResultSchema>

//
// Exercises
//

export type ExerciseInputType = z.infer<typeof exerciseInputSchema>
export type InitialSetCountType = z.infer<typeof initialSetCountSchema>
export type RestTimerType = z.infer<typeof restTimerSchema>
export type TabataTimerType = z.infer<typeof tabataTimerSchema>
export type ExerciseType = z.infer<typeof exerciseSchema>

//
// Workout Results
//

export type ExerciseResultGroupType = z.infer<typeof exerciseResultGroupSchema>
export type WorkoutResultType = z.infer<typeof workoutResultSchema>

//
// Workouts
//

export type ExerciseGroupType = z.infer<typeof exerciseGroupSchema>
export type WorkoutType = z.infer<typeof workoutSchema>
