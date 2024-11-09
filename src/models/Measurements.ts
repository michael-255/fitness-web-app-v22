import { TableEnum } from '@/shared/enums'
import type {
    BloodPressureReadingType,
    BodyMeasurementType,
    BodyWeightType,
    CaloriesType,
    CholesterolType,
    IdType,
    MeasurementFieldType,
    NutritionType,
    PercentType,
    TemperatureType,
    TextAreaType,
    TimestampType,
} from '@/shared/types'
import { createId } from '@/shared/utils'

interface MeasurementParams {
    id?: IdType
    createdAt?: TimestampType
    note?: TextAreaType
    field: MeasurementFieldType // Required, not defaulted
    // Diet
    calories?: CaloriesType
    carbs?: NutritionType
    fat?: NutritionType
    protein?: NutritionType
    // Weight
    weight?: BodyWeightType
    bodyFat?: PercentType
    // Health
    temperature?: TemperatureType
    bloodPressureSystolic?: BloodPressureReadingType
    bloodPressureDiastolic?: BloodPressureReadingType
    bloodOxygen?: PercentType
    // Body
    neck?: BodyMeasurementType
    shoulders?: BodyMeasurementType
    chest?: BodyMeasurementType
    waist?: BodyMeasurementType
    leftBicep?: BodyMeasurementType
    rightBicep?: BodyMeasurementType
    leftForearm?: BodyMeasurementType
    rightForearm?: BodyMeasurementType
    leftThigh?: BodyMeasurementType
    rightThigh?: BodyMeasurementType
    leftCalf?: BodyMeasurementType
    rightCalf?: BodyMeasurementType
    // Lab Work
    cholesterol?: CholesterolType
    cholesterolHDL?: CholesterolType
    cholesterolLDL?: CholesterolType
    hemoglobinA1C?: PercentType
}

/**
 * `Measurement` standalone model.
 *
 *  Represents the measurements used by the measurement modules. At least one of the measurement
 *  recording fields is expected to be present on the record.
 */
export class Measurement {
    id: IdType
    createdAt: TimestampType
    note: TextAreaType
    field: MeasurementFieldType
    // Diet
    calories?: CaloriesType
    carbs?: NutritionType
    fat?: NutritionType
    protein?: NutritionType
    // Weight
    weight?: BodyWeightType
    bodyFat?: PercentType
    // Health
    temperature?: TemperatureType
    bloodPressureSystolic?: BloodPressureReadingType
    bloodPressureDiastolic?: BloodPressureReadingType
    bloodOxygen?: PercentType
    // Body
    neck?: BodyMeasurementType
    shoulders?: BodyMeasurementType
    chest?: BodyMeasurementType
    waist?: BodyMeasurementType
    leftBicep?: BodyMeasurementType
    rightBicep?: BodyMeasurementType
    leftForearm?: BodyMeasurementType
    rightForearm?: BodyMeasurementType
    leftThigh?: BodyMeasurementType
    rightThigh?: BodyMeasurementType
    leftCalf?: BodyMeasurementType
    rightCalf?: BodyMeasurementType
    // Lab Work
    cholesterol?: CholesterolType
    cholesterolHDL?: CholesterolType
    cholesterolLDL?: CholesterolType
    hemoglobinA1C?: PercentType

    constructor(params: MeasurementParams) {
        this.id = params.id ?? createId(TableEnum.MEASUREMENTS)
        this.createdAt = params.createdAt ?? Date.now()
        this.note = params.note ?? ''
        this.field = params.field // Required, not defaulted
        // Diet
        this.calories = params.calories ?? undefined
        this.carbs = params.carbs ?? undefined
        this.fat = params.fat ?? undefined
        this.protein = params.protein ?? undefined
        // Weight
        this.weight = params.weight ?? undefined
        this.bodyFat = params.bodyFat ?? undefined
        // Health
        this.temperature = params.temperature ?? undefined
        this.bloodPressureSystolic = params.bloodPressureSystolic ?? undefined
        this.bloodPressureDiastolic = params.bloodPressureDiastolic ?? undefined
        this.bloodOxygen = params.bloodOxygen ?? undefined
        // Body
        this.neck = params.neck ?? undefined
        this.shoulders = params.shoulders ?? undefined
        this.chest = params.chest ?? undefined
        this.waist = params.waist ?? undefined
        this.leftBicep = params.leftBicep ?? undefined
        this.rightBicep = params.rightBicep ?? undefined
        this.leftForearm = params.leftForearm ?? undefined
        this.rightForearm = params.rightForearm ?? undefined
        this.leftThigh = params.leftThigh ?? undefined
        this.rightThigh = params.rightThigh ?? undefined
        this.leftCalf = params.leftCalf ?? undefined
        this.rightCalf = params.rightCalf ?? undefined
        // Lab Work
        this.cholesterol = params.cholesterol ?? undefined
        this.cholesterolHDL = params.cholesterolHDL ?? undefined
        this.cholesterolLDL = params.cholesterolLDL ?? undefined
        this.hemoglobinA1C = params.hemoglobinA1C ?? undefined
    }
}
