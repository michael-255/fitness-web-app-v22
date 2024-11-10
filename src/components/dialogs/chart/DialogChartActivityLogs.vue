<script setup lang="ts">
import useLogger from '@/composables/useLogger'
import { LogServInst } from '@/services/LogService'
import { LogLevelEnum } from '@/shared/enums'
import { chartsIcon, closeIcon } from '@/shared/icons'
import type { LogType } from '@/shared/types'
import { createActivityChartOptions } from '@/shared/utils'
import {
    Chart as ChartJS,
    Legend,
    LinearScale,
    PointElement,
    TimeScale,
    Title,
    Tooltip,
    type ChartData,
    type ChartOptions,
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import { colors, useDialogPluginComponent } from 'quasar'
import { computed, onUnmounted, ref, type ComputedRef, type Ref } from 'vue'
import { Scatter } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, LinearScale, PointElement, TimeScale)

defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent()

const { log } = useLogger()

const subscriptionFinished = ref(false)
const liveRecords: Ref<LogType[]> = ref([])
const hasRecords = ref(false)

const subscription = LogServInst.liveTable<LogType>().subscribe({
    next: (records) => {
        liveRecords.value = records
        subscriptionFinished.value = true
        if (liveRecords.value.length > 0) {
            hasRecords.value = true
        } else {
            hasRecords.value = false
        }
    },
    error: (error) => {
        log.error(`Error loading live ${LogServInst.labelPlural} data`, error as Error)
        subscriptionFinished.value = true
        hasRecords.value = false
    },
})

const chartOptions: ChartOptions<'scatter'> = createActivityChartOptions(
    `${LogServInst.labelSingular} Activity - Last 3 Months`,
)

const chartData: ComputedRef<ChartData<'scatter', { x: number; y: number }[]>> = computed(() => {
    const infoLogs = liveRecords.value.filter((record) => record.logLevel === LogLevelEnum.INFO)
    const warnLogs = liveRecords.value.filter((record) => record.logLevel === LogLevelEnum.WARN)
    const errorLogs = liveRecords.value.filter((record) => record.logLevel === LogLevelEnum.ERROR)
    return {
        datasets: [
            {
                label: 'Info',
                backgroundColor: colors.getPaletteColor('primary'),
                data: infoLogs.map((record) => ({
                    x: record.createdAt,
                    y: getTimeOfDay(record.createdAt),
                })),
            },
            {
                label: 'Warning',
                backgroundColor: colors.getPaletteColor('warning'),
                data: warnLogs.map((record) => ({
                    x: record.createdAt,
                    y: getTimeOfDay(record.createdAt),
                })),
            },
            {
                label: 'Error',
                backgroundColor: colors.getPaletteColor('negative'),
                data: errorLogs.map((record) => ({
                    x: record.createdAt,
                    y: getTimeOfDay(record.createdAt),
                })),
            },
        ],
    }
})

onUnmounted(() => {
    subscription.unsubscribe()
})

/**
 * Get the time of day in seconds from a given time in milliseconds. This is used to display the
 * time of day on the Y-axis.
 */
function getTimeOfDay(time: number) {
    return (
        new Date(time).getHours() * 3600 +
        new Date(time).getMinutes() * 60 +
        new Date(time).getSeconds()
    )
}
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
            <q-toolbar-title>Activity Charts</q-toolbar-title>
            <q-btn flat round :icon="closeIcon" @click="onDialogCancel" />
        </q-toolbar>

        <q-card class="q-dialog-plugin">
            <q-card-section>
                <Scatter
                    v-if="hasRecords"
                    :options="chartOptions"
                    :data="chartData"
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
</style>
