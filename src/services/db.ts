import { Exercise } from '@/models/Exercise'
import { ExerciseResult } from '@/models/ExerciseResult'
import { Log } from '@/models/Log'
import { Measurement } from '@/models/Measurements'
import { Plan } from '@/models/Plan'
import { Setting } from '@/models/Setting'
import { Workout } from '@/models/Workout'
import { WorkoutResult } from '@/models/WorkoutResult'
import { appDatabaseVersion, appName } from '@/shared/constants'
import { TableEnum } from '@/shared/enums'
import Dexie, { type Table } from 'dexie'

/**
 * The database for the application defining the tables that are available and the models that are
 * mapped to those tables. An instance of this class is created and exported at the end of the file.
 */
export class Database extends Dexie {
    // Required for easier TypeScript usage
    [TableEnum.SETTINGS]!: Table<Setting>;
    [TableEnum.LOGS]!: Table<Log>;
    [TableEnum.PLANS]!: Table<Plan>;
    [TableEnum.MEASUREMENTS]!: Table<Measurement>;
    [TableEnum.WORKOUTS]!: Table<Workout>;
    [TableEnum.EXERCISES]!: Table<Exercise>;
    [TableEnum.WORKOUT_RESULTS]!: Table<WorkoutResult>;
    [TableEnum.EXERCISE_RESULTS]!: Table<ExerciseResult>

    constructor(name: string) {
        super(name)

        this.version(1).stores({
            [TableEnum.SETTINGS]: '&id',
            [TableEnum.LOGS]: '&id, createdAt',
            [TableEnum.PLANS]: '&id',
            [TableEnum.MEASUREMENTS]: '&id, field, createdAt',
            [TableEnum.WORKOUTS]: '&id, name, *status',
            [TableEnum.EXERCISES]: '&id, name, *status',
            [TableEnum.WORKOUT_RESULTS]: '&id, parentId, createdAt',
            [TableEnum.EXERCISE_RESULTS]: '&id, parentId, createdAt',
        })

        this[TableEnum.SETTINGS].mapToClass(Setting)
        this[TableEnum.LOGS].mapToClass(Log)
        this[TableEnum.PLANS].mapToClass(Plan)
        this[TableEnum.MEASUREMENTS].mapToClass(Measurement)
        this[TableEnum.WORKOUTS].mapToClass(Workout)
        this[TableEnum.EXERCISES].mapToClass(Exercise)
        this[TableEnum.WORKOUT_RESULTS].mapToClass(WorkoutResult)
        this[TableEnum.EXERCISE_RESULTS].mapToClass(ExerciseResult)
    }
}

/**
 * Pre-instantiated database instance that can be used throughout the application.
 */
export const DB = new Database(`${appName} v${appDatabaseVersion}`)
