<script setup lang="ts">
import BaseFormItem from '@/components/dialogs/forms/BaseFormItem.vue'
import { LimitEnum, MeasurementFieldEnum } from '@/shared/enums'
import {
    bloodPressureReadingSchema,
    bodyMeasurementSchema,
    bodyWeightSchema,
    caloriesSchema,
    cholesterolSchema,
    measurementFieldSchema,
    nutritionSchema,
    percentSchema,
    temperatureSchema,
} from '@/shared/schemas'
import { useSelectedStore } from '@/stores/selected'
import { useQuasar } from 'quasar'
import { computed } from 'vue'

const $q = useQuasar()
const selectedStore = useSelectedStore()

const isDisabled = computed(() => $q.loading.isActive || selectedStore.lockedStatus)
const measurementField = computed(() => selectedStore.record?.field)

const options = Object.values(MeasurementFieldEnum).map((i) => ({
    value: i,
    label: i,
    disable: false,
}))
</script>

<template>
    <BaseFormItem label="Measurement Field" description="The type of measurement to record below.">
        <q-item-label caption>
            <q-select
                v-model="selectedStore.record.field"
                :rules="[
                    (val: string) => measurementFieldSchema.safeParse(val).success || 'Required',
                ]"
                :disable="isDisabled"
                :options="options"
                lazy-rules
                emit-value
                map-options
                options-dense
                dense
                outlined
                color="primary"
            />
        </q-item-label>
    </BaseFormItem>

    <BaseFormItem
        v-if="measurementField === MeasurementFieldEnum.CALORIES"
        label="Calories"
        description="Total calories consumed."
    >
        <q-item-label>
            <q-input
                v-model.number="selectedStore.record.calories"
                @blur="
                    selectedStore.record.calories =
                        measurementField === MeasurementFieldEnum.CALORIES
                            ? selectedStore.record.calories &&
                              parseInt(selectedStore.record.calories.toFixed(0))
                            : undefined
                "
                :rules="[
                    (val: number) =>
                        caloriesSchema.safeParse(val).success ||
                        `Calories must be a number between 1 and ${LimitEnum.MAX_CALORIES}.`,
                ]"
                :disable="isDisabled"
                lazy-rules
                dense
                outlined
                color="primary"
            />
        </q-item-label>
    </BaseFormItem>

    <BaseFormItem
        v-if="measurementField === MeasurementFieldEnum.CARBS"
        label="Carbs"
        description="Total carbohydrates consumed."
    >
        <q-item-label>
            <q-input
                v-model.number="selectedStore.record.carbs"
                @blur="
                    selectedStore.record.carbs =
                        measurementField === MeasurementFieldEnum.CARBS
                            ? selectedStore.record.carbs &&
                              parseInt(selectedStore.record.carbs.toFixed(0))
                            : undefined
                "
                :rules="[
                    (val: number) =>
                        nutritionSchema.safeParse(val).success ||
                        `Carbs must be a number between 1 and ${LimitEnum.MAX_NUTRITION}.`,
                ]"
                :disable="isDisabled"
                lazy-rules
                dense
                outlined
                color="primary"
            />
        </q-item-label>
    </BaseFormItem>

    <BaseFormItem
        v-if="measurementField === MeasurementFieldEnum.FAT"
        label="Fat"
        description="Total fat consumed."
    >
        <q-item-label>
            <q-input
                v-model.number="selectedStore.record.fat"
                @blur="
                    selectedStore.record.fat =
                        measurementField === MeasurementFieldEnum.FAT
                            ? selectedStore.record.fat &&
                              parseInt(selectedStore.record.fat.toFixed(0))
                            : undefined
                "
                :rules="[
                    (val: number) =>
                        nutritionSchema.safeParse(val).success ||
                        `Fat must be a number between 1 and ${LimitEnum.MAX_NUTRITION}.`,
                ]"
                :disable="isDisabled"
                lazy-rules
                dense
                outlined
                color="primary"
            />
        </q-item-label>
    </BaseFormItem>

    <BaseFormItem
        v-if="measurementField === MeasurementFieldEnum.PROTEIN"
        label="Protein"
        description="Total protein consumed."
    >
        <q-item-label>
            <q-input
                v-model.number="selectedStore.record.protein"
                @blur="
                    selectedStore.record.protein =
                        measurementField === MeasurementFieldEnum.PROTEIN
                            ? selectedStore.record.protein &&
                              parseInt(selectedStore.record.protein.toFixed(0))
                            : undefined
                "
                :rules="[
                    (val: number) =>
                        nutritionSchema.safeParse(val).success ||
                        `Protein must be a number between 1 and ${LimitEnum.MAX_NUTRITION}.`,
                ]"
                :disable="isDisabled"
                type="number"
                lazy-rules
                dense
                outlined
                color="primary"
            />
        </q-item-label>
    </BaseFormItem>

    <BaseFormItem
        v-if="measurementField === MeasurementFieldEnum.BODY_WEIGHT"
        label="Body Weight"
        description="Total body weight."
    >
        <q-item-label>
            <q-input
                v-model.number="selectedStore.record.bodyWeight"
                @blur="
                    selectedStore.record.bodyWeight =
                        measurementField === MeasurementFieldEnum.BODY_WEIGHT
                            ? selectedStore.record.bodyWeight &&
                              parseFloat(selectedStore.record.bodyWeight.toFixed(1))
                            : undefined
                "
                :rules="[
                    (val: number) =>
                        bodyWeightSchema.safeParse(val).success ||
                        `Body weight must be a number between 1 and ${LimitEnum.MAX_BODY_WEIGHT}.`,
                ]"
                :disable="isDisabled"
                lazy-rules
                dense
                outlined
                color="primary"
            />
        </q-item-label>
    </BaseFormItem>

    <BaseFormItem
        v-if="measurementField === MeasurementFieldEnum.BODY_FAT"
        label="Body Fat"
        description="Total body fat."
    >
        <q-item-label>
            <q-input
                v-model.number="selectedStore.record.bodyFat"
                @blur="
                    selectedStore.record.bodyFat =
                        measurementField === MeasurementFieldEnum.BODY_FAT
                            ? selectedStore.record.bodyFat &&
                              parseFloat(selectedStore.record.bodyFat.toFixed(1))
                            : undefined
                "
                :rules="[
                    (val: number) =>
                        percentSchema.safeParse(val).success ||
                        `Body fat must be a number between 1 and 100.`,
                ]"
                :disable="isDisabled"
                lazy-rules
                dense
                outlined
                color="primary"
            />
        </q-item-label>
    </BaseFormItem>

    <BaseFormItem
        v-if="measurementField === MeasurementFieldEnum.TEMPERATURE"
        label="Temperature"
        description="Body temperature in Fahrenheit."
    >
        <q-item-label>
            <q-input
                v-model.number="selectedStore.record.temperature"
                @blur="
                    selectedStore.record.temperature =
                        measurementField === MeasurementFieldEnum.TEMPERATURE
                            ? selectedStore.record.temperature &&
                              parseFloat(selectedStore.record.temperature.toFixed(1))
                            : undefined
                "
                :rules="[
                    (val: number) =>
                        temperatureSchema.safeParse(val).success ||
                        `Temperature must be a number between ${LimitEnum.MIN_TEMPERATURE} and ${LimitEnum.MAX_TEMPERATURE}.`,
                ]"
                :disable="isDisabled"
                lazy-rules
                dense
                outlined
                color="primary"
            />
        </q-item-label>
    </BaseFormItem>

    <BaseFormItem
        v-if="measurementField === MeasurementFieldEnum.BLOOD_PRESSURE"
        label="Blood Pressure"
        description="Blood pressure systolic/diastolic meansurements."
    >
        <q-item-label>
            <div class="row q-gutter-md">
                <q-input
                    v-model.number="selectedStore.record.bloodPressureSystolic"
                    @blur="
                        selectedStore.record.bloodPressureSystolic =
                            measurementField === MeasurementFieldEnum.BLOOD_PRESSURE
                                ? selectedStore.record.bloodPressureSystolic &&
                                  parseInt(selectedStore.record.bloodPressureSystolic.toFixed(0))
                                : undefined
                    "
                    :rules="[
                        (val: number) =>
                            bloodPressureReadingSchema.safeParse(val).success ||
                            `Blood pressure must be a number between ${LimitEnum.MIN_BLOOD_PRESSURE} and ${LimitEnum.MAX_BLOOD_PRESSURE}.`,
                    ]"
                    :disable="isDisabled"
                    label="Systolic"
                    type="number"
                    lazy-rules
                    dense
                    outlined
                    color="primary"
                    class="col"
                />
                <div class="text-h4">/</div>
                <q-input
                    v-model.number="selectedStore.record.bloodPressureDiastolic"
                    @blur="
                        selectedStore.record.bloodPressureDiastolic =
                            measurementField === MeasurementFieldEnum.BLOOD_PRESSURE
                                ? selectedStore.record.bloodPressureDiastolic &&
                                  parseInt(selectedStore.record.bloodPressureDiastolic.toFixed(0))
                                : undefined
                    "
                    :rules="[
                        (val: number) =>
                            bloodPressureReadingSchema.safeParse(val).success ||
                            `Blood pressure must be a number between ${LimitEnum.MIN_BLOOD_PRESSURE} and ${LimitEnum.MAX_BLOOD_PRESSURE}.`,
                    ]"
                    :disable="isDisabled"
                    type="number"
                    label="Diastolic"
                    lazy-rules
                    dense
                    outlined
                    color="primary"
                    class="col"
                />
            </div>
        </q-item-label>
    </BaseFormItem>

    <BaseFormItem
        v-if="measurementField === MeasurementFieldEnum.BLOOD_OXYGEN"
        label="Blood Oxygen"
        description="Blood oxygen saturation percentage."
    >
        <q-item-label>
            <q-input
                v-model.number="selectedStore.record.bloodOxygen"
                @blur="
                    selectedStore.record.bloodOxygen =
                        measurementField === MeasurementFieldEnum.BLOOD_OXYGEN
                            ? selectedStore.record.bloodOxygen &&
                              parseFloat(selectedStore.record.bloodOxygen.toFixed(1))
                            : undefined
                "
                :rules="[
                    (val: number) =>
                        percentSchema.safeParse(val).success ||
                        `Blood oxygen must be a number between 1 and 100.`,
                ]"
                :disable="isDisabled"
                lazy-rules
                dense
                outlined
                color="primary"
            />
        </q-item-label>
    </BaseFormItem>

    <BaseFormItem
        v-if="measurementField === MeasurementFieldEnum.NECK"
        label="Neck"
        description="Neck circumference."
    >
        <q-item-label>
            <q-input
                v-model.number="selectedStore.record.neck"
                @blur="
                    selectedStore.record.neck =
                        measurementField === MeasurementFieldEnum.NECK
                            ? selectedStore.record.neck &&
                              parseFloat(selectedStore.record.neck.toFixed(2))
                            : undefined
                "
                :rules="[
                    (val: number) =>
                        bodyMeasurementSchema.safeParse(val).success ||
                        `Neck must be a number between 1 and ${LimitEnum.MAX_BODY_MEASUREMENT}.`,
                ]"
                :disable="isDisabled"
                lazy-rules
                dense
                outlined
                color="primary"
            />
        </q-item-label>
    </BaseFormItem>

    <BaseFormItem
        v-if="measurementField === MeasurementFieldEnum.SHOULDERS"
        label="Shoulders"
        description="Shoulder circumference."
    >
        <q-item-label>
            <q-input
                v-model.number="selectedStore.record.shoulders"
                @blur="
                    selectedStore.record.shoulders =
                        measurementField === MeasurementFieldEnum.SHOULDERS
                            ? selectedStore.record.shoulders &&
                              parseFloat(selectedStore.record.shoulders.toFixed(2))
                            : undefined
                "
                :rules="[
                    (val: number) =>
                        bodyMeasurementSchema.safeParse(val).success ||
                        `Shoulders must be a number between 1 and ${LimitEnum.MAX_BODY_MEASUREMENT}.`,
                ]"
                :disable="isDisabled"
                lazy-rules
                dense
                outlined
                color="primary"
            />
        </q-item-label>
    </BaseFormItem>

    <BaseFormItem
        v-if="measurementField === MeasurementFieldEnum.CHEST"
        label="Chest"
        description="Chest circumference."
    >
        <q-item-label>
            <q-input
                v-model.number="selectedStore.record.chest"
                @blur="
                    selectedStore.record.chest =
                        measurementField === MeasurementFieldEnum.CHEST
                            ? selectedStore.record.chest &&
                              parseFloat(selectedStore.record.chest.toFixed(2))
                            : undefined
                "
                :rules="[
                    (val: number) =>
                        bodyMeasurementSchema.safeParse(val).success ||
                        `Chest must be a number between 1 and ${LimitEnum.MAX_BODY_MEASUREMENT}.`,
                ]"
                :disable="isDisabled"
                lazy-rules
                dense
                outlined
                color="primary"
            />
        </q-item-label>
    </BaseFormItem>

    <BaseFormItem
        v-if="measurementField === MeasurementFieldEnum.WAIST"
        label="Waist"
        description="Waist circumference."
    >
        <q-item-label>
            <q-input
                v-model.number="selectedStore.record.waist"
                @blur="
                    selectedStore.record.waist =
                        measurementField === MeasurementFieldEnum.WAIST
                            ? selectedStore.record.waist &&
                              parseFloat(selectedStore.record.waist.toFixed(2))
                            : undefined
                "
                :rules="[
                    (val: number) =>
                        bodyMeasurementSchema.safeParse(val).success ||
                        `Waist must be a number between 1 and ${LimitEnum.MAX_BODY_MEASUREMENT}.`,
                ]"
                :disable="isDisabled"
                lazy-rules
                dense
                outlined
                color="primary"
            />
        </q-item-label>
    </BaseFormItem>

    <BaseFormItem
        v-if="measurementField === MeasurementFieldEnum.BICEPS"
        label="Biceps"
        description="Bicep circumferences."
    >
        <q-item-label>
            <div class="row q-gutter-md">
                <q-input
                    v-model.number="selectedStore.record.leftBicep"
                    @blur="
                        selectedStore.record.leftBicep =
                            measurementField === MeasurementFieldEnum.BICEPS
                                ? selectedStore.record.leftBicep &&
                                  parseFloat(selectedStore.record.leftBicep.toFixed(2))
                                : undefined
                    "
                    :rules="[
                        (val: number) =>
                            bodyMeasurementSchema.safeParse(val).success ||
                            `Left bicep must be a number between 1 and ${LimitEnum.MAX_BODY_MEASUREMENT}.`,
                    ]"
                    :disable="isDisabled"
                    label="Left"
                    lazy-rules
                    dense
                    outlined
                    color="primary"
                    class="col"
                />
                <q-input
                    v-model.number="selectedStore.record.rightBicep"
                    @blur="
                        selectedStore.record.rightBicep =
                            measurementField === MeasurementFieldEnum.BICEPS
                                ? selectedStore.record.rightBicep &&
                                  parseFloat(selectedStore.record.rightBicep.toFixed(2))
                                : undefined
                    "
                    :rules="[
                        (val: number) =>
                            bodyMeasurementSchema.safeParse(val).success ||
                            `Right bicep must be a number between 1 and ${LimitEnum.MAX_BODY_MEASUREMENT}.`,
                    ]"
                    :disable="isDisabled"
                    label="Right"
                    lazy-rules
                    dense
                    outlined
                    color="primary"
                    class="col"
                />
            </div>
        </q-item-label>
    </BaseFormItem>

    <BaseFormItem
        v-if="measurementField === MeasurementFieldEnum.FOREARMS"
        label="Forearms"
        description="Forearm circumferences."
    >
        <q-item-label>
            <div class="row q-gutter-md">
                <q-input
                    v-model.number="selectedStore.record.leftForearm"
                    @blur="
                        selectedStore.record.leftForearm =
                            measurementField === MeasurementFieldEnum.FOREARMS
                                ? selectedStore.record.leftForearm &&
                                  parseFloat(selectedStore.record.leftForearm.toFixed(2))
                                : undefined
                    "
                    :rules="[
                        (val: number) =>
                            bodyMeasurementSchema.safeParse(val).success ||
                            `Left forearm must be a number between 1 and ${LimitEnum.MAX_BODY_MEASUREMENT}.`,
                    ]"
                    :disable="isDisabled"
                    label="Left"
                    lazy-rules
                    dense
                    outlined
                    color="primary"
                    class="col"
                />
                <q-input
                    v-model.number="selectedStore.record.rightForearm"
                    @blur="
                        selectedStore.record.rightForearm =
                            measurementField === MeasurementFieldEnum.FOREARMS
                                ? selectedStore.record.rightForearm &&
                                  parseFloat(selectedStore.record.rightForearm.toFixed(2))
                                : undefined
                    "
                    :rules="[
                        (val: number) =>
                            bodyMeasurementSchema.safeParse(val).success ||
                            `Right forearm must be a number between 1 and ${LimitEnum.MAX_BODY_MEASUREMENT}.`,
                    ]"
                    :disable="isDisabled"
                    label="Right"
                    lazy-rules
                    dense
                    outlined
                    color="primary"
                    class="col"
                />
            </div>
        </q-item-label>
    </BaseFormItem>

    <BaseFormItem
        v-if="measurementField === MeasurementFieldEnum.THIGHS"
        label="Thighs"
        description="Thigh circumferences."
    >
        <q-item-label>
            <div class="row q-gutter-md">
                <q-input
                    v-model.number="selectedStore.record.leftThigh"
                    @blur="
                        selectedStore.record.leftThigh =
                            measurementField === MeasurementFieldEnum.THIGHS
                                ? selectedStore.record.leftThigh &&
                                  parseFloat(selectedStore.record.leftThigh.toFixed(2))
                                : undefined
                    "
                    :rules="[
                        (val: number) =>
                            bodyMeasurementSchema.safeParse(val).success ||
                            `Left thigh must be a number between 1 and ${LimitEnum.MAX_BODY_MEASUREMENT}.`,
                    ]"
                    :disable="isDisabled"
                    label="Left"
                    lazy-rules
                    dense
                    outlined
                    color="primary"
                    class="col"
                />
                <q-input
                    v-model.number="selectedStore.record.rightThigh"
                    @blur="
                        selectedStore.record.rightThigh =
                            measurementField === MeasurementFieldEnum.THIGHS
                                ? selectedStore.record.rightThigh &&
                                  parseFloat(selectedStore.record.rightThigh.toFixed(2))
                                : undefined
                    "
                    :rules="[
                        (val: number) =>
                            bodyMeasurementSchema.safeParse(val).success ||
                            `Right thigh must be a number between 1 and ${LimitEnum.MAX_BODY_MEASUREMENT}.`,
                    ]"
                    :disable="isDisabled"
                    label="Right"
                    lazy-rules
                    dense
                    outlined
                    color="primary"
                    class="col"
                />
            </div>
        </q-item-label>
    </BaseFormItem>

    <BaseFormItem
        v-if="measurementField === MeasurementFieldEnum.CALVES"
        label="Calves"
        description="Calf circumferences."
    >
        <q-item-label>
            <div class="row q-gutter-md">
                <q-input
                    v-model.number="selectedStore.record.leftCalf"
                    @blur="
                        selectedStore.record.leftCalf =
                            measurementField === MeasurementFieldEnum.CALVES
                                ? selectedStore.record.leftCalf &&
                                  parseFloat(selectedStore.record.leftCalf.toFixed(2))
                                : undefined
                    "
                    :rules="[
                        (val: number) =>
                            bodyMeasurementSchema.safeParse(val).success ||
                            `Left calf must be a number between 1 and ${LimitEnum.MAX_BODY_MEASUREMENT}.`,
                    ]"
                    :disable="isDisabled"
                    label="Left"
                    lazy-rules
                    dense
                    outlined
                    color="primary"
                    class="col"
                />
                <q-input
                    v-model.number="selectedStore.record.rightCalf"
                    @blur="
                        selectedStore.record.rightCalf =
                            measurementField === MeasurementFieldEnum.CALVES
                                ? selectedStore.record.rightCalf &&
                                  parseFloat(selectedStore.record.rightCalf.toFixed(2))
                                : undefined
                    "
                    :rules="[
                        (val: number) =>
                            bodyMeasurementSchema.safeParse(val).success ||
                            `Right calf must be a number between 1 and ${LimitEnum.MAX_BODY_MEASUREMENT}.`,
                    ]"
                    :disable="isDisabled"
                    label="Right"
                    lazy-rules
                    dense
                    outlined
                    color="primary"
                    class="col"
                />
            </div>
        </q-item-label>
    </BaseFormItem>

    <BaseFormItem
        v-if="measurementField === MeasurementFieldEnum.CHOLESTEROL"
        label="Cholesterol"
        description="Total cholesterol in mg/dL."
    >
        <q-item-label>
            <q-input
                v-model.number="selectedStore.record.cholesterol"
                @blur="
                    selectedStore.record.cholesterol =
                        measurementField === MeasurementFieldEnum.CHOLESTEROL
                            ? parseInt(selectedStore.record.cholesterol.toFixed(0))
                            : undefined
                "
                :rules="[
                    (val: number) =>
                        cholesterolSchema.safeParse(val).success ||
                        `Cholesterol must be a number between 1 and ${LimitEnum.MAX_CHOLESTEROL}.`,
                ]"
                :disable="isDisabled"
                lazy-rules
                dense
                outlined
                color="primary"
            />
        </q-item-label>
    </BaseFormItem>

    <BaseFormItem
        v-if="measurementField === MeasurementFieldEnum.CHOLESTEROL_HDL"
        label="Cholesterol HDL"
        description="Cholesterol HDL in mg/dL."
    >
        <q-item-label>
            <q-input
                v-model.number="selectedStore.record.cholesterolHDL"
                @blur="
                    selectedStore.record.cholesterolHDL =
                        measurementField === MeasurementFieldEnum.CHOLESTEROL_HDL
                            ? parseInt(selectedStore.record.cholesterolHDL.toFixed(0))
                            : undefined
                "
                :rules="[
                    (val: number) =>
                        cholesterolSchema.safeParse(val).success ||
                        `Cholesterol HDL must be a number between 1 and ${LimitEnum.MAX_CHOLESTEROL}.`,
                ]"
                :disable="isDisabled"
                lazy-rules
                dense
                outlined
                color="primary"
            />
        </q-item-label>
    </BaseFormItem>

    <BaseFormItem
        v-if="measurementField === MeasurementFieldEnum.CHOLESTEROL_LDL"
        label="Cholesterol LDL"
        description="Cholesterol LDL in mg/dL."
    >
        <q-item-label>
            <q-input
                v-model.number="selectedStore.record.cholesterolLDL"
                @blur="
                    selectedStore.record.cholesterolLDL =
                        measurementField === MeasurementFieldEnum.CHOLESTEROL_LDL
                            ? parseInt(selectedStore.record.cholesterolLDL.toFixed(0))
                            : undefined
                "
                :rules="[
                    (val: number) =>
                        cholesterolSchema.safeParse(val).success ||
                        `Cholesterol LDL must be a number between 1 and ${LimitEnum.MAX_CHOLESTEROL}.`,
                ]"
                :disable="isDisabled"
                lazy-rules
                dense
                outlined
                color="primary"
            />
        </q-item-label>
    </BaseFormItem>

    <BaseFormItem
        v-if="measurementField === MeasurementFieldEnum.HEMOGLOBIN_A1C"
        label="Hemoglobin A1C"
        description="Hemoglobin A1C percentage."
    >
        <q-item-label>
            <q-input
                v-model.number="selectedStore.record.hemoglobinA1C"
                @blur="
                    selectedStore.record.hemoglobinA1C =
                        measurementField === MeasurementFieldEnum.HEMOGLOBIN_A1C
                            ? parseFloat(selectedStore.record.hemoglobinA1C.toFixed(1))
                            : undefined
                "
                :rules="[
                    (val: number) =>
                        percentSchema.safeParse(val).success ||
                        `Hemoglobin A1C must be a number between 1 and 100.`,
                ]"
                :disable="isDisabled"
                lazy-rules
                dense
                outlined
                color="primary"
            />
        </q-item-label>
    </BaseFormItem>
</template>
