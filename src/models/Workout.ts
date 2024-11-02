import { TableEnum } from '@/shared/enums'
import type {
    ExerciseGroupType,
    IdType,
    StatusType,
    TextAreaType,
    TextLineType,
    TimestampType,
    WorkoutResultType,
} from '@/shared/types'
import { createId } from '@/shared/utils'

interface WorkoutParams {
    id?: IdType
    createdAt?: TimestampType
    status?: StatusType[]
    name?: TextLineType
    desc?: TextAreaType
    lastChild?: WorkoutResultType
    warmupGroups?: ExerciseGroupType[]
    cooldownGroups?: ExerciseGroupType[]
    exerciseGroups?: ExerciseGroupType[]
    nextWorkoutIds?: IdType[]
}

/**
 * `Workout` parent model.
 *
 * Represents all relevant details of a workout session.
 */
export class Workout {
    id: IdType
    createdAt: TimestampType
    status: StatusType[]
    name: TextLineType
    desc: TextAreaType
    lastChild?: WorkoutResultType
    warmupGroups: ExerciseGroupType[]
    cooldownGroups: ExerciseGroupType[]
    exerciseGroups: ExerciseGroupType[]
    nextWorkoutIds: IdType[]

    constructor(params: WorkoutParams) {
        this.id = params.id ?? createId(TableEnum.WORKOUTS)
        this.createdAt = params.createdAt ?? Date.now()
        this.status = params.status ?? []
        this.name = params.name ?? 'My Workout'
        this.desc = params.desc ?? ''
        this.lastChild = params.lastChild ?? undefined
        this.warmupGroups = params.warmupGroups ?? []
        this.cooldownGroups = params.cooldownGroups ?? []
        this.exerciseGroups = params.exerciseGroups ?? []
        this.nextWorkoutIds = params.nextWorkoutIds ?? []
    }
}
