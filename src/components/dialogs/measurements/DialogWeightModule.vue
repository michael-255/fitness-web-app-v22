<script setup lang="ts">
import useLogger from '@/composables/useLogger'
import { MeasurementServInst } from '@/services/MeasurementService'
import { MeasurementFieldEnum } from '@/shared/enums'
import { closeIcon, weightModuleIcon } from '@/shared/icons'
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
    return MeasurementServInst.liveMeasurementField(field).subscribe({
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

const bodyWeightSubscriptionFinished = ref(false)
const bodyFatSubscriptionFinished = ref(false)

const liveBodyWeight: Ref<MeasurementType | undefined> = ref(undefined)
const liveBodyFat: Ref<MeasurementType | undefined> = ref(undefined)

const bodyWeightSubscription = createSubscription(
    MeasurementFieldEnum.BODY_WEIGHT,
    liveBodyWeight,
    bodyWeightSubscriptionFinished,
)
const bodyFatSubscription = createSubscription(
    MeasurementFieldEnum.BODY_FAT,
    liveBodyFat,
    bodyFatSubscriptionFinished,
)

onUnmounted(() => {
    bodyWeightSubscription.unsubscribe()
    bodyFatSubscription.unsubscribe()
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
            <q-icon :name="weightModuleIcon" size="sm" class="q-mx-sm" />
            <q-toolbar-title>Weight Module</q-toolbar-title>
            <q-btn flat round :icon="closeIcon" @click="onDialogCancel" />
        </q-toolbar>

        <q-card class="q-dialog-plugin">
            <q-card-section>
                <div class="row justify-center">
                    <div class="responsive-container">
                        <q-list padding>
                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.BODY_WEIGHT"
                                :measurement-field="MeasurementFieldEnum.BODY_WEIGHT"
                                :previous-id="liveBodyWeight?.id"
                                :previous-value="formatNumber(liveBodyWeight?.bodyWeight, 1)"
                                :previous-created-at="liveBodyWeight?.createdAt"
                                value-suffix="lbs"
                            />

                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.BODY_FAT"
                                :measurement-field="MeasurementFieldEnum.BODY_FAT"
                                :previous-id="liveBodyFat?.id"
                                :previous-value="formatNumber(liveBodyFat?.bodyFat, 1)"
                                :previous-created-at="liveBodyFat?.createdAt"
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
