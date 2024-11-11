<script setup lang="ts">
import { MeasurementServInst } from '@/services/MeasurementService'
import { MeasurementFieldEnum } from '@/shared/enums'
import { chartsIcon, closeIcon } from '@/shared/icons'
import type { MeasurementType } from '@/shared/types'
import { createTimelineChartOptions } from '@/shared/utils'
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

const showChartCalories = ref(false)
const showChartNutrition = ref(false)

const caloriesData: Ref<{ x: any; y: any }[]> = ref([])
const carbsData: Ref<{ x: any; y: any }[]> = ref([])
const fatData: Ref<{ x: any; y: any }[]> = ref([])
const proteinData: Ref<{ x: any; y: any }[]> = ref([])

const chartOptionsCalories: ChartOptions<'line'> = createTimelineChartOptions('Calories')
const chartOptionsNutrition: ChartOptions<'line'> = createTimelineChartOptions('Nutrition', true)

const chartDatasetCalories: ComputedRef<ChartData<'line', { x: number; y: number }[]>> = computed(
    () => {
        return {
            datasets: [
                {
                    label: '',
                    data: caloriesData.value,
                    borderColor: colors.getPaletteColor('cyan'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
            ],
        }
    },
)
const chartDatasetNutrition: ComputedRef<ChartData<'line', { x: number; y: number }[]>> = computed(
    () => {
        return {
            datasets: [
                {
                    label: MeasurementFieldEnum.CARBS,
                    data: carbsData.value,
                    borderColor: colors.getPaletteColor('negative'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
                {
                    label: MeasurementFieldEnum.FAT,
                    data: fatData.value,
                    borderColor: colors.getPaletteColor('amber'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
                {
                    label: MeasurementFieldEnum.PROTEIN,
                    data: proteinData.value,
                    borderColor: colors.getPaletteColor('primary'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
            ],
        }
    },
)

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

    showChartCalories.value = allCalories.length > 0
    showChartNutrition.value = allCarbs.length > 0 || allFat.length > 0 || allProtein.length > 0

    caloriesData.value = allCalories.map((record) => ({
        x: record.createdAt,
        y: record.calories,
    }))
    carbsData.value = allCarbs.map((record) => ({
        x: record.createdAt,
        y: record.carbs,
    }))
    fatData.value = allFat.map((record) => ({
        x: record.createdAt,
        y: record.fat,
    }))
    proteinData.value = allProtein.map((record) => ({
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
                    v-if="showChartCalories"
                    :options="chartOptionsCalories"
                    :data="chartDatasetCalories"
                    style="max-height: 500px"
                    class="q-mt-xl"
                />

                <Line
                    v-if="showChartNutrition"
                    :options="chartOptionsNutrition"
                    :data="chartDatasetNutrition"
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
