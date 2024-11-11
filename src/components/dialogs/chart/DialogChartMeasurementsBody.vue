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

const showChart = ref(false)

const neckData: Ref<{ x: any; y: any }[]> = ref([])
const shouldersData: Ref<{ x: any; y: any }[]> = ref([])
const chestData: Ref<{ x: any; y: any }[]> = ref([])
const waistData: Ref<{ x: any; y: any }[]> = ref([])
const leftBicepData: Ref<{ x: any; y: any }[]> = ref([])
const rightBicepData: Ref<{ x: any; y: any }[]> = ref([])
const leftForearmData: Ref<{ x: any; y: any }[]> = ref([])
const rightForearmData: Ref<{ x: any; y: any }[]> = ref([])
const leftThighData: Ref<{ x: any; y: any }[]> = ref([])
const rightThighData: Ref<{ x: any; y: any }[]> = ref([])
const leftCalfData: Ref<{ x: any; y: any }[]> = ref([])
const rightCalfData: Ref<{ x: any; y: any }[]> = ref([])

const chartOptions: ChartOptions<'line'> = createTimelineChartOptions('Body Measurements', true)

const chartData: ComputedRef<ChartData<'line', { x: number; y: number }[]>> = computed(() => {
    return {
        datasets: [
            {
                label: MeasurementFieldEnum.NECK,
                data: neckData.value,
                borderColor: colors.getPaletteColor('primary'),
                backgroundColor: colors.getPaletteColor('white'),
            },
            {
                label: MeasurementFieldEnum.SHOULDERS,
                data: shouldersData.value,
                borderColor: colors.getPaletteColor('secondary'),
                backgroundColor: colors.getPaletteColor('white'),
            },
            {
                label: MeasurementFieldEnum.CHEST,
                data: chestData.value,
                borderColor: colors.getPaletteColor('accent'),
                backgroundColor: colors.getPaletteColor('white'),
            },
            {
                label: MeasurementFieldEnum.WAIST,
                data: waistData.value,
                borderColor: colors.getPaletteColor('positive'),
                backgroundColor: colors.getPaletteColor('white'),
            },
            {
                label: 'Left Bicep',
                data: leftBicepData.value,
                borderColor: colors.getPaletteColor('negative'),
                backgroundColor: colors.getPaletteColor('white'),
            },
            {
                label: 'Right Bicep',
                data: rightBicepData.value,
                borderColor: colors.getPaletteColor('info'),
                backgroundColor: colors.getPaletteColor('white'),
            },
            {
                label: 'Left Forearm',
                data: leftForearmData.value,
                borderColor: colors.getPaletteColor('warning'),
                backgroundColor: colors.getPaletteColor('white'),
            },
            {
                label: 'Right Forearm',
                data: rightForearmData.value,
                borderColor: colors.getPaletteColor('negative'),
                backgroundColor: colors.getPaletteColor('white'),
            },
            {
                label: 'Left Thigh',
                data: leftThighData.value,
                borderColor: colors.getPaletteColor('info'),
                backgroundColor: colors.getPaletteColor('white'),
            },
            {
                label: 'Right Thigh',
                data: rightThighData.value,
                borderColor: colors.getPaletteColor('warning'),
                backgroundColor: colors.getPaletteColor('white'),
            },
            {
                label: 'Left Calf',
                data: leftCalfData.value,
                borderColor: colors.getPaletteColor('negative'),
                backgroundColor: colors.getPaletteColor('white'),
            },
            {
                label: 'Right Calf',
                data: rightCalfData.value,
                borderColor: colors.getPaletteColor('info'),
                backgroundColor: colors.getPaletteColor('white'),
            },
        ],
    }
})

onMounted(async () => {
    const allNeck = await MeasurementServInst.getRecordsByProperty<MeasurementType>(
        'field',
        MeasurementFieldEnum.NECK,
    )
    const allShoulders = await MeasurementServInst.getRecordsByProperty<MeasurementType>(
        'field',
        MeasurementFieldEnum.SHOULDERS,
    )
    const allChest = await MeasurementServInst.getRecordsByProperty<MeasurementType>(
        'field',
        MeasurementFieldEnum.CHEST,
    )
    const allWaist = await MeasurementServInst.getRecordsByProperty<MeasurementType>(
        'field',
        MeasurementFieldEnum.WAIST,
    )
    const allBiceps = await MeasurementServInst.getRecordsByProperty<MeasurementType>(
        'field',
        MeasurementFieldEnum.BICEPS,
    )
    const allForearms = await MeasurementServInst.getRecordsByProperty<MeasurementType>(
        'field',
        MeasurementFieldEnum.FOREARMS,
    )
    const allThighs = await MeasurementServInst.getRecordsByProperty<MeasurementType>(
        'field',
        MeasurementFieldEnum.THIGHS,
    )
    const allCalves = await MeasurementServInst.getRecordsByProperty<MeasurementType>(
        'field',
        MeasurementFieldEnum.CALVES,
    )

    showChart.value =
        allNeck.length > 0 ||
        allShoulders.length > 0 ||
        allChest.length > 0 ||
        allWaist.length > 0 ||
        allBiceps.length > 0 ||
        allForearms.length > 0 ||
        allThighs.length > 0 ||
        allCalves.length > 0

    neckData.value = allNeck.map((record) => ({
        x: record.createdAt,
        y: record.neck,
    }))
    shouldersData.value = allShoulders.map((record) => ({
        x: record.createdAt,
        y: record.shoulders,
    }))
    chestData.value = allChest.map((record) => ({
        x: record.createdAt,
        y: record.chest,
    }))
    waistData.value = allWaist.map((record) => ({
        x: record.createdAt,
        y: record.waist,
    }))
    leftBicepData.value = allBiceps.map((record) => ({
        x: record.createdAt,
        y: record.leftBicep,
    }))
    rightBicepData.value = allBiceps.map((record) => ({
        x: record.createdAt,
        y: record.rightBicep,
    }))
    leftForearmData.value = allForearms.map((record) => ({
        x: record.createdAt,
        y: record.leftForearm,
    }))
    rightForearmData.value = allForearms.map((record) => ({
        x: record.createdAt,
        y: record.rightForearm,
    }))
    leftThighData.value = allThighs.map((record) => ({
        x: record.createdAt,
        y: record.leftThigh,
    }))
    rightThighData.value = allThighs.map((record) => ({
        x: record.createdAt,
        y: record.rightThigh,
    }))
    leftCalfData.value = allCalves.map((record) => ({
        x: record.createdAt,
        y: record.leftCalf,
    }))
    rightCalfData.value = allCalves.map((record) => ({
        x: record.createdAt,
        y: record.rightCalf,
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
                    v-if="showChart"
                    :options="chartOptions"
                    :data="chartData"
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
