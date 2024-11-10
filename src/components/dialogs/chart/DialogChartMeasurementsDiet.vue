<script setup lang="ts">
import { MeasurementServInst } from '@/services/MeasurementService'
import { MeasurementFieldEnum } from '@/shared/enums'
import { chartsIcon, closeIcon } from '@/shared/icons'
import type { MeasurementType } from '@/shared/types'
import { createTimelineChartOptions, getTimelinedRecords } from '@/shared/utils'
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    TimeScale,
    Title,
    Tooltip,
    type ChartData,
    type ChartOptions,
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import { colors, useDialogPluginComponent } from 'quasar'
import { computed, onMounted, ref, type ComputedRef, type Ref } from 'vue'
import { Line } from 'vue-chartjs'

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LinearScale,
    PointElement,
    LineElement,
    CategoryScale,
    TimeScale,
)

defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent()

const hasRecordsCalories = ref(false)
const hasRecordsCaloriesBeyondThreeMonths = ref(false)
const hasRecordsCaloriesBeyondOneYear = ref(false)

const hasRecordsNutrition = ref(false)
const hasRecordsNutritionBeyondThreeMonths = ref(false)
const hasRecordsNutritionBeyondOneYear = ref(false)

const chartDatasetCaloriesThreeMonths: Ref<{ x: any; y: any }[]> = ref([])
const chartDatasetCaloriesOneYear: Ref<{ x: any; y: any }[]> = ref([])
const chartDatasetCaloriesAllTime: Ref<{ x: any; y: any }[]> = ref([])

const chartDatasetCarbsThreeMonths: Ref<{ x: any; y: any }[]> = ref([])
const chartDatasetCarbsOneYear: Ref<{ x: any; y: any }[]> = ref([])
const chartDatasetCarbsAllTime: Ref<{ x: any; y: any }[]> = ref([])

const chartDatasetFatThreeMonths: Ref<{ x: any; y: any }[]> = ref([])
const chartDatasetFatOneYear: Ref<{ x: any; y: any }[]> = ref([])
const chartDatasetFatAllTime: Ref<{ x: any; y: any }[]> = ref([])

const chartDatasetProteinThreeMonths: Ref<{ x: any; y: any }[]> = ref([])
const chartDatasetProteinOneYear: Ref<{ x: any; y: any }[]> = ref([])
const chartDatasetProteinAllTime: Ref<{ x: any; y: any }[]> = ref([])

const chartOptionsCaloriesThreeMonths: ChartOptions<'line'> = createTimelineChartOptions(
    'Calories - Last 3 Months',
)
const chartOptionsCaloriesOneYear: ChartOptions<'line'> =
    createTimelineChartOptions('Calories - Last Year')
const chartOptionsCaloriesAllTime: ChartOptions<'line'> =
    createTimelineChartOptions('Calories - All Time')

const chartOptionsNutritionThreeMonths: ChartOptions<'line'> = createTimelineChartOptions(
    'Nutrition - Last 3 Months',
    true,
)
const chartOptionsNutritionOneYear: ChartOptions<'line'> = createTimelineChartOptions(
    'Nutrition - Last Year',
    true,
)
const chartOptionsNutritionAllTime: ChartOptions<'line'> = createTimelineChartOptions(
    'Nutrition - All Time',
    true,
)

const chartDataCaloriesThreeMonths: ComputedRef<ChartData<'line', { x: number; y: number }[]>> =
    computed(() => {
        return {
            datasets: [
                {
                    label: '',
                    data: chartDatasetCaloriesThreeMonths.value,
                    borderColor: colors.getPaletteColor('cyan'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
            ],
        }
    })
const chartDataCaloriesOneYear: ComputedRef<ChartData<'line', { x: number; y: number }[]>> =
    computed(() => {
        return {
            datasets: [
                {
                    label: '',
                    data: chartDatasetCaloriesOneYear.value,
                    borderColor: colors.getPaletteColor('cyan'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
            ],
        }
    })
const chartDataCaloriesAllTime: ComputedRef<ChartData<'line', { x: number; y: number }[]>> =
    computed(() => {
        return {
            datasets: [
                {
                    label: '',
                    data: chartDatasetCaloriesAllTime.value,
                    borderColor: colors.getPaletteColor('cyan'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
            ],
        }
    })

const chartDataNutritionThreeMonths: ComputedRef<ChartData<'line', { x: number; y: number }[]>> =
    computed(() => {
        return {
            datasets: [
                {
                    label: MeasurementFieldEnum.CARBS,
                    data: chartDatasetCarbsThreeMonths.value,
                    borderColor: colors.getPaletteColor('negative'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
                {
                    label: MeasurementFieldEnum.FAT,
                    data: chartDatasetFatThreeMonths.value,
                    borderColor: colors.getPaletteColor('amber'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
                {
                    label: MeasurementFieldEnum.PROTEIN,
                    data: chartDatasetProteinThreeMonths.value,
                    borderColor: colors.getPaletteColor('primary'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
            ],
        }
    })
const chartDataNutritionOneYear: ComputedRef<ChartData<'line', { x: number; y: number }[]>> =
    computed(() => {
        return {
            datasets: [
                {
                    label: MeasurementFieldEnum.CARBS,
                    data: chartDatasetCarbsOneYear.value,
                    borderColor: colors.getPaletteColor('negative'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
                {
                    label: MeasurementFieldEnum.FAT,
                    data: chartDatasetFatOneYear.value,
                    borderColor: colors.getPaletteColor('amber'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
                {
                    label: MeasurementFieldEnum.PROTEIN,
                    data: chartDatasetProteinOneYear.value,
                    borderColor: colors.getPaletteColor('primary'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
            ],
        }
    })
const chartDataNutritionAllTime: ComputedRef<ChartData<'line', { x: number; y: number }[]>> =
    computed(() => {
        return {
            datasets: [
                {
                    label: MeasurementFieldEnum.CARBS,
                    data: chartDatasetCarbsAllTime.value,
                    borderColor: colors.getPaletteColor('negative'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
                {
                    label: MeasurementFieldEnum.FAT,
                    data: chartDatasetFatAllTime.value,
                    borderColor: colors.getPaletteColor('amber'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
                {
                    label: MeasurementFieldEnum.PROTEIN,
                    data: chartDatasetProteinAllTime.value,
                    borderColor: colors.getPaletteColor('primary'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
            ],
        }
    })

onMounted(async () => {
    const allCaloriesRecords = await MeasurementServInst.getRecordsByProperty<MeasurementType>(
        'field',
        MeasurementFieldEnum.CALORIES,
    )
    const allCarbsRecords = await MeasurementServInst.getRecordsByProperty<MeasurementType>(
        'field',
        MeasurementFieldEnum.CARBS,
    )
    const allFatRecords = await MeasurementServInst.getRecordsByProperty<MeasurementType>(
        'field',
        MeasurementFieldEnum.FAT,
    )
    const allProteinRecords = await MeasurementServInst.getRecordsByProperty<MeasurementType>(
        'field',
        MeasurementFieldEnum.PROTEIN,
    )

    const timelinedCaloriesRecords = getTimelinedRecords<MeasurementType>(allCaloriesRecords)
    const timelinedCarbsRecords = getTimelinedRecords<MeasurementType>(allCarbsRecords)
    const timelinedFatRecords = getTimelinedRecords<MeasurementType>(allFatRecords)
    const timelinedProteinRecords = getTimelinedRecords<MeasurementType>(allProteinRecords)

    hasRecordsCalories.value = timelinedCaloriesRecords.hasRecords
    hasRecordsCaloriesBeyondThreeMonths.value = timelinedCaloriesRecords.hasRecordsBeyondThreeMonths
    hasRecordsCaloriesBeyondOneYear.value = timelinedCaloriesRecords.hasRecordsBeyondOneYear

    hasRecordsNutrition.value =
        timelinedCarbsRecords.hasRecords ||
        timelinedFatRecords.hasRecords ||
        timelinedProteinRecords.hasRecords
    hasRecordsNutritionBeyondThreeMonths.value =
        timelinedCarbsRecords.hasRecordsBeyondThreeMonths ||
        timelinedFatRecords.hasRecordsBeyondThreeMonths ||
        timelinedProteinRecords.hasRecordsBeyondThreeMonths

    hasRecordsNutritionBeyondOneYear.value =
        timelinedCarbsRecords.hasRecordsBeyondOneYear ||
        timelinedFatRecords.hasRecordsBeyondOneYear ||
        timelinedProteinRecords.hasRecordsBeyondOneYear

    chartDatasetCaloriesThreeMonths.value = timelinedCaloriesRecords.threeMonths.map((record) => ({
        x: record.createdAt,
        y: record.calories,
    }))
    chartDatasetCaloriesOneYear.value = timelinedCaloriesRecords.oneYear.map((record) => ({
        x: record.createdAt,
        y: record.calories,
    }))
    chartDatasetCaloriesAllTime.value = timelinedCaloriesRecords.allTime.map((record) => ({
        x: record.createdAt,
        y: record.calories,
    }))

    chartDatasetCarbsThreeMonths.value = timelinedCarbsRecords.threeMonths.map((record) => ({
        x: record.createdAt,
        y: record.carbs,
    }))
    chartDatasetCarbsOneYear.value = timelinedCarbsRecords.oneYear.map((record) => ({
        x: record.createdAt,
        y: record.carbs,
    }))
    chartDatasetCarbsAllTime.value = timelinedCarbsRecords.allTime.map((record) => ({
        x: record.createdAt,
        y: record.carbs,
    }))

    chartDatasetFatThreeMonths.value = timelinedFatRecords.threeMonths.map((record) => ({
        x: record.createdAt,
        y: record.fat,
    }))
    chartDatasetFatOneYear.value = timelinedFatRecords.oneYear.map((record) => ({
        x: record.createdAt,
        y: record.fat,
    }))
    chartDatasetFatAllTime.value = timelinedFatRecords.allTime.map((record) => ({
        x: record.createdAt,
        y: record.fat,
    }))

    chartDatasetProteinThreeMonths.value = timelinedProteinRecords.threeMonths.map((record) => ({
        x: record.createdAt,
        y: record.protein,
    }))
    chartDatasetProteinOneYear.value = timelinedProteinRecords.oneYear.map((record) => ({
        x: record.createdAt,
        y: record.protein,
    }))
    chartDatasetProteinAllTime.value = timelinedProteinRecords.allTime.map((record) => ({
        x: record.createdAt,
        y: record.protein,
    }))
})
</script>

<template>
    <q-dialog
        ref="dialogRef"
        transition-show="slide-up"
        transition-hide="slide-down"
        maximized
        @hide="onDialogHide"
    >
        <q-toolbar class="bg-info text-white toolbar-height">
            <q-icon :name="chartsIcon" size="sm" class="q-mx-sm" />
            <q-toolbar-title>Diet Module Charts</q-toolbar-title>
            <q-btn flat round :icon="closeIcon" @click="onDialogCancel" />
        </q-toolbar>

        <q-card class="q-dialog-plugin">
            <q-card-section>
                <Line
                    v-if="hasRecordsCalories"
                    :options="chartOptionsCaloriesThreeMonths"
                    :data="chartDataCaloriesThreeMonths"
                    style="max-height: 500px"
                />
                <div class="q-mt-xl" />

                <Line
                    v-if="hasRecordsCaloriesBeyondThreeMonths"
                    :options="chartOptionsCaloriesOneYear"
                    :data="chartDataCaloriesOneYear"
                    style="max-height: 500px"
                />
                <div class="q-mt-xl" />

                <Line
                    v-if="hasRecordsCaloriesBeyondOneYear"
                    :options="chartOptionsCaloriesAllTime"
                    :data="chartDataCaloriesAllTime"
                    style="max-height: 500px"
                />
                <div class="q-mt-xl" />

                <Line
                    v-if="hasRecordsNutrition"
                    :options="chartOptionsNutritionThreeMonths"
                    :data="chartDataNutritionThreeMonths"
                    style="max-height: 500px"
                />
                <div class="q-mt-xl" />

                <Line
                    v-if="hasRecordsNutritionBeyondThreeMonths"
                    :options="chartOptionsNutritionOneYear"
                    :data="chartDataNutritionOneYear"
                    style="max-height: 500px"
                />
                <div class="q-mt-xl" />

                <Line
                    v-if="hasRecordsNutritionBeyondOneYear"
                    :options="chartOptionsNutritionAllTime"
                    :data="chartDataNutritionAllTime"
                    style="max-height: 500px"
                />
                <div class="q-mt-xl" />
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<style scoped>
.toolbar-height {
    max-height: 50px;
}
.responsive-container {
    width: 100%;
    max-width: 800px;
}
</style>
