import { ExerciseInputEnum, TableEnum } from '@/shared/enums'
import type {
    ExerciseInputType,
    ExerciseResultType,
    IdType,
    InitialSetCountType,
    RestTimerType,
    StatusType,
    TabataTimerType,
    TextAreaType,
    TextLineType,
    TimestampType,
} from '@/shared/types'
import { createId } from '@/shared/utils'

interface ExerciseParams {
    id?: IdType
    createdAt?: TimestampType
    status?: StatusType[]
    name?: TextLineType
    desc?: TextAreaType
    lastChild?: ExerciseResultType
    inputs?: ExerciseInputType
    initialSetCount?: InitialSetCountType
    restTimer?: RestTimerType
    tabataTimer?: TabataTimerType
}

/**
 * `Exercise` parent model.
 *
 *  Represents all relevant details of an exercise.
 */
export class Exercise {
    id: IdType
    createdAt: TimestampType
    status: StatusType[]
    name: TextLineType
    desc: TextAreaType
    lastChild?: ExerciseResultType
    inputs: ExerciseInputType
    initialSetCount: InitialSetCountType
    restTimer?: RestTimerType
    tabataTimer?: TabataTimerType

    constructor(params: ExerciseParams) {
        this.id = params.id ?? createId(TableEnum.EXERCISES)
        this.createdAt = params.createdAt ?? Date.now()
        this.status = params.status ?? []
        this.name = params.name ?? 'My Exercise'
        this.desc = params.desc ?? ''
        this.lastChild = params.lastChild ?? undefined
        this.inputs = params.inputs ?? ExerciseInputEnum.CHECKLIST
        this.initialSetCount = params.initialSetCount ?? 1
        this.restTimer = params.restTimer ?? undefined
        this.tabataTimer = params.tabataTimer ?? undefined
    }
}
