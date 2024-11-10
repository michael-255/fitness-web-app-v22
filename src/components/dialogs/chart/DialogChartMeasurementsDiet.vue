<script setup lang="ts">
import { MeasurementServInst } from '@/services/MeasurementService'
import { MeasurementFieldEnum } from '@/shared/enums'
import { chartsIcon, closeIcon } from '@/shared/icons'
import type { MeasurementType } from '@/shared/types'
import { createTimelineChartOptions, getMeasurementTimelinedRecords } from '@/shared/utils'
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

const showOneYearCalories = ref(false)
const showAllTimeCalories = ref(false)

const showOneYearNutrition = ref(false)
const showAllTimeNutrition = ref(false)

const oneYearCaloriesData: Ref<{ x: any; y: any }[]> = ref([])
const allTimeCaloriesData: Ref<{ x: any; y: any }[]> = ref([])

const oneYearNutritionData: Ref<{ x: any; y: any }[]> = ref([])
const allTimeNutritionData: Ref<{ x: any; y: any }[]> = ref([])

const chartOptionsOneYearCalories: ChartOptions<'line'> =
    createTimelineChartOptions('Calories - Last Year')
const chartOptionsAllTimeCalories: ChartOptions<'line'> =
    createTimelineChartOptions('Calories - All Time')

const chartOptionsOneYearNutrition: ChartOptions<'line'> = createTimelineChartOptions(
    'Nutrition - Last Year',
    true,
)
const chartOptionsAllTimeNutrition: ChartOptions<'line'> = createTimelineChartOptions(
    'Nutrition - All Time',
    true,
)

const chartDatasetOneYearCalories: ComputedRef<ChartData<'line', { x: number; y: number }[]>> =
    computed(() => {
        return {
            datasets: [
                {
                    label: '',
                    data: oneYearCaloriesData.value,
                    borderColor: colors.getPaletteColor('cyan'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
            ],
        }
    })
const chartDatasetAllTimeCalories: ComputedRef<ChartData<'line', { x: number; y: number }[]>> =
    computed(() => {
        return {
            datasets: [
                {
                    label: '',
                    data: allTimeCaloriesData.value,
                    borderColor: colors.getPaletteColor('cyan'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
            ],
        }
    })

const chartDatasetOneYearNutrition: ComputedRef<ChartData<'line', { x: number; y: number }[]>> =
    computed(() => {
        return {
            datasets: [
                {
                    label: MeasurementFieldEnum.CARBS,
                    data: oneYearNutritionData.value,
                    borderColor: colors.getPaletteColor('negative'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
                {
                    label: MeasurementFieldEnum.FAT,
                    data: oneYearNutritionData.value,
                    borderColor: colors.getPaletteColor('amber'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
                {
                    label: MeasurementFieldEnum.PROTEIN,
                    data: oneYearNutritionData.value,
                    borderColor: colors.getPaletteColor('primary'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
            ],
        }
    })
const chartDatasetAllTimeNutrition: ComputedRef<ChartData<'line', { x: number; y: number }[]>> =
    computed(() => {
        return {
            datasets: [
                {
                    label: MeasurementFieldEnum.CARBS,
                    data: allTimeNutritionData.value,
                    borderColor: colors.getPaletteColor('negative'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
                {
                    label: MeasurementFieldEnum.FAT,
                    data: allTimeNutritionData.value,
                    borderColor: colors.getPaletteColor('amber'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
                {
                    label: MeasurementFieldEnum.PROTEIN,
                    data: allTimeNutritionData.value,
                    borderColor: colors.getPaletteColor('primary'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
            ],
        }
    })

onMounted(async () => {
    const allCalories = await MeasurementServInst.getRecordsByProperty<MeasurementType>(
        'field',
        MeasurementFieldEnum.CALORIES,
    )
    const allCarbs = await MeasurementServInst.getRecordsByProperty<MeasurementType>(
        'field',
        MeasurementFieldEnum.CARBS,
    )
    const allFat = await MeasurementServInst.getRecordsByProperty<MeasurementType>(
        'field',
        MeasurementFieldEnum.FAT,
    )
    const allProtein = await MeasurementServInst.getRecordsByProperty<MeasurementType>(
        'field',
        MeasurementFieldEnum.PROTEIN,
    )

    const timelinedCalories = getMeasurementTimelinedRecords(allCalories, 'calories')
    const timelinedCarbs = getMeasurementTimelinedRecords(allCarbs, 'carbs')
    const timelinedFat = getMeasurementTimelinedRecords(allFat, 'fat')
    const timelinedProtein = getMeasurementTimelinedRecords(allProtein, 'protein')

    showOneYearCalories.value = timelinedCalories.showOneYearChart
    showAllTimeCalories.value = timelinedCalories.showAllTimeChart

    showOneYearNutrition.value =
        timelinedCarbs.showOneYearChart ||
        timelinedFat.showOneYearChart ||
        timelinedProtein.showOneYearChart
    showAllTimeNutrition.value =
        timelinedCarbs.showAllTimeChart ||
        timelinedFat.showAllTimeChart ||
        timelinedProtein.showAllTimeChart

    oneYearCaloriesData.value = timelinedCalories.oneYearData
    allTimeCaloriesData.value = timelinedCalories.allTimeData

    oneYearNutritionData.value = timelinedCarbs.oneYearData
    allTimeNutritionData.value = timelinedCarbs.allTimeData
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
                    v-if="showOneYearCalories"
                    :options="chartOptionsOneYearCalories"
                    :data="chartDatasetOneYearCalories"
                    style="max-height: 500px"
                    class="q-mt-xl"
                />

                <Line
                    v-if="showOneYearNutrition"
                    :options="chartOptionsOneYearNutrition"
                    :data="chartDatasetOneYearNutrition"
                    style="max-height: 500px"
                    class="q-mt-xl"
                />

                <Line
                    v-if="showAllTimeCalories"
                    :options="chartOptionsAllTimeCalories"
                    :data="chartDatasetAllTimeCalories"
                    style="max-height: 500px"
                    class="q-mt-xl"
                />

                <Line
                    v-if="showAllTimeNutrition"
                    :options="chartOptionsAllTimeNutrition"
                    :data="chartDatasetAllTimeNutrition"
                    style="max-height: 500px"
                    class="q-mt-xl"
                />
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
