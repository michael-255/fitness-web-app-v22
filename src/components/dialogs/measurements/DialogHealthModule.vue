<script setup lang="ts">
import useLogger from '@/composables/useLogger'
import { MeasurementServInst } from '@/services/MeasurementService'
import { MeasurementFieldEnum } from '@/shared/enums'
import { closeIcon, healthModuleIcon } from '@/shared/icons'
import type { MeasurementType } from '@/shared/types'
import { formatNumber } from '@/shared/utils'
import { useDialogPluginComponent } from 'quasar'
import { onUnmounted, ref, type Ref } from 'vue'
import MeasurementPreviousItem from './MeasurementPreviousItem.vue'

defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent()

const { log } = useLogger()

const createSubscription = (
    field: MeasurementFieldEnum,
    liveRef: Ref<MeasurementType | undefined>,
    finishedRef: Ref<boolean>,
) => {
    return MeasurementServInst.liveMeasurement(field).subscribe({
        next: (record) => {
            liveRef.value = record
            finishedRef.value = true
        },
        error: (error) => {
            log.error(`Error loading live ${MeasurementServInst.labelPlural} data`, error as Error)
            finishedRef.value = true
        },
    })
}

const tempSubscriptionFinished = ref(false)
const bloodPressureSubscriptionFinished = ref(false)
const bloodOxygenSubscriptionFinished = ref(false)

const liveTemperature: Ref<MeasurementType | undefined> = ref(undefined)
const liveBloodPressure: Ref<MeasurementType | undefined> = ref(undefined)
const liveBloodOxygen: Ref<MeasurementType | undefined> = ref(undefined)

const tempSubscription = createSubscription(
    MeasurementFieldEnum.TEMPERATURE,
    liveTemperature,
    tempSubscriptionFinished,
)
const bloodPressureSubscription = createSubscription(
    MeasurementFieldEnum.BLOOD_PRESSURE,
    liveBloodPressure,
    bloodPressureSubscriptionFinished,
)
const bloodOxygenSubscription = createSubscription(
    MeasurementFieldEnum.BLOOD_OXYGEN,
    liveBloodOxygen,
    bloodOxygenSubscriptionFinished,
)

onUnmounted(() => {
    tempSubscription.unsubscribe()
    bloodPressureSubscription.unsubscribe()
    bloodOxygenSubscription.unsubscribe()
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
            <q-icon :name="healthModuleIcon" size="sm" class="q-mx-sm" />
            <q-toolbar-title>Health Module</q-toolbar-title>
            <q-btn flat round :icon="closeIcon" @click="onDialogCancel" />
        </q-toolbar>

        <q-card class="q-dialog-plugin">
            <q-card-section>
                <div class="row justify-center">
                    <div class="responsive-container">
                        <q-list padding>
                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.TEMPERATURE"
                                :measurement-field="MeasurementFieldEnum.TEMPERATURE"
                                :previous-id="liveTemperature?.id"
                                :previous-value="formatNumber(liveTemperature?.temperature, 1)"
                                :previous-created-at="liveTemperature?.createdAt"
                                value-suffix="°F"
                            />

                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.BLOOD_PRESSURE"
                                :measurement-field="MeasurementFieldEnum.BLOOD_PRESSURE"
                                :previous-id="liveBloodPressure?.id"
                                :previous-value="`${formatNumber(liveBloodPressure?.bloodPressureSystolic)}/${formatNumber(liveBloodPressure?.bloodPressureDiastolic)}`"
                                :previous-created-at="liveBloodPressure?.createdAt"
                                value-suffix="mm Hg"
                            />

                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.BLOOD_OXYGEN"
                                :measurement-field="MeasurementFieldEnum.BLOOD_OXYGEN"
                                :previous-id="liveBloodOxygen?.id"
                                :previous-value="formatNumber(liveBloodOxygen?.bloodOxygen, 1)"
                                :previous-created-at="liveBloodOxygen?.createdAt"
                                value-suffix="%"
                            />
                        </q-list>

                        <div class="q-mt-xl" />
                    </div>
                </div>
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
