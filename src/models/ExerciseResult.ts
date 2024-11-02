import { TableEnum } from '@/shared/enums'
import type {
    CardioSetType,
    ChecklistSetType,
    ClimbingSetType,
    IdType,
    SidedWeightSetType,
    StatusType,
    TextAreaType,
    TimestampType,
    WeightSetType,
} from '@/shared/types'
import { createId } from '@/shared/utils'

interface ExerciseResultParams {
    id?: IdType
    createdAt?: TimestampType
    status?: StatusType[]
    parentId: IdType // Parent reference required, never defaulted
    note?: TextAreaType
    checklistSets?: ChecklistSetType[]
    cardioSets?: CardioSetType[]
    weightSets?: WeightSetType[]
    sidedWeightSets?: SidedWeightSetType[]
    climbingSets?: ClimbingSetType[]
}

/**
 * `ExerciseResult` child model.
 *
 *  Represents the results of an exercise. This references the sets and their results.
 */
export class ExerciseResult {
    id: IdType
    createdAt: TimestampType
    status: StatusType[]
    parentId: IdType
    note: TextAreaType
    checklistSets?: ChecklistSetType[]
    cardioSets?: CardioSetType[]
    weightSets?: WeightSetType[]
    sidedWeightSets?: SidedWeightSetType[]
    climbingSets?: ClimbingSetType[]

    constructor(params: ExerciseResultParams) {
        this.id = params.id ?? createId(TableEnum.EXERCISE_RESULTS)
        this.createdAt = params.createdAt ?? Date.now()
        this.status = params.status ?? []
        this.parentId = params.parentId // Parent reference required, never defaulted
        this.note = params.note ?? ''
        this.checklistSets = params.checklistSets ?? undefined
        this.cardioSets = params.cardioSets ?? undefined
        this.weightSets = params.weightSets ?? undefined
        this.sidedWeightSets = params.sidedWeightSets ?? undefined
        this.climbingSets = params.climbingSets ?? undefined
    }
}
