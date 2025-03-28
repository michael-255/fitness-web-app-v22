import { TableEnum } from '@/shared/enums'
import type {
    ExerciseResultGroupType,
    IdType,
    StatusType,
    TextAreaType,
    TimestampType,
} from '@/shared/types'
import { createId } from '@/shared/utils'

interface WorkoutResultParams {
    id?: IdType
    createdAt?: TimestampType
    status?: StatusType[]
    parentId: IdType // Parent reference required, never defaulted
    note?: TextAreaType
    finishedAt?: TimestampType
    warmupResultGroups?: ExerciseResultGroupType[]
    cooldownResultGroups?: ExerciseResultGroupType[]
    exerciseResultGroups?: ExerciseResultGroupType[]
}

/**
 * `WorkoutResult` child model.
 *
 *  Represents the results of a workout session. This references the exercises and their results.
 */
export class WorkoutResult {
    id: IdType
    createdAt: TimestampType
    status: StatusType[]
    parentId: IdType
    note: TextAreaType
    finishedAt?: TimestampType
    warmupResultGroups: ExerciseResultGroupType[]
    cooldownResultGroups: ExerciseResultGroupType[]
    exerciseResultGroups: ExerciseResultGroupType[]

    constructor(params: WorkoutResultParams) {
        this.id = params.id ?? createId(TableEnum.WORKOUT_RESULTS)
        this.createdAt = params.createdAt ?? Date.now()
        this.status = params.status ?? []
        this.parentId = params.parentId // Parent reference required, never defaulted
        this.note = params.note ?? ''
        this.finishedAt = params.finishedAt ?? undefined
        this.warmupResultGroups = params.warmupResultGroups ?? []
        this.cooldownResultGroups = params.cooldownResultGroups ?? []
        this.exerciseResultGroups = params.exerciseResultGroups ?? []
    }
}
