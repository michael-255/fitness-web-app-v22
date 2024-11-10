<script setup lang="ts">
import useLogger from '@/composables/useLogger'
import { MeasurementServInst } from '@/services/MeasurementService'
import { MeasurementFieldEnum } from '@/shared/enums'
import { closeIcon, labWorkModuleIcon } from '@/shared/icons'
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

const finishedCholesterol = ref(false)
const finishedCholesterolHDL = ref(false)
const finishedCholesterolLDL = ref(false)
const finishedHemoglobinA1C = ref(false)

const liveCholesterol = ref<MeasurementType | undefined>(undefined)
const liveCholesterolHDL = ref<MeasurementType | undefined>(undefined)
const liveCholesterolLDL = ref<MeasurementType | undefined>(undefined)
const liveHemoglobinA1C = ref<MeasurementType | undefined>(undefined)

const cholesterolSubscription = createSubscription(
    MeasurementFieldEnum.CHOLESTEROL,
    liveCholesterol,
    finishedCholesterol,
)
const cholesterolHDLSubscription = createSubscription(
    MeasurementFieldEnum.CHOLESTEROL_HDL,
    liveCholesterolHDL,
    finishedCholesterolHDL,
)
const cholesterolLDLSubscription = createSubscription(
    MeasurementFieldEnum.CHOLESTEROL_LDL,
    liveCholesterolLDL,
    finishedCholesterolLDL,
)
const hemoglobinA1CSubscription = createSubscription(
    MeasurementFieldEnum.HEMOGLOBIN_A1C,
    liveHemoglobinA1C,
    finishedHemoglobinA1C,
)

onUnmounted(() => {
    cholesterolSubscription.unsubscribe()
    cholesterolHDLSubscription.unsubscribe()
    cholesterolLDLSubscription.unsubscribe()
    hemoglobinA1CSubscription.unsubscribe()
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
            <q-icon :name="labWorkModuleIcon" size="sm" class="q-mx-sm" />
            <q-toolbar-title>Lab Work Module</q-toolbar-title>
            <q-btn flat round :icon="closeIcon" @click="onDialogCancel" />
        </q-toolbar>

        <q-card class="q-dialog-plugin">
            <q-card-section>
                <div class="row justify-center">
                    <div class="responsive-container">
                        <q-list padding>
                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.CHOLESTEROL"
                                :measurement-field="MeasurementFieldEnum.CHOLESTEROL"
                                :previous-id="liveCholesterol?.id"
                                :previous-value="formatNumber(liveCholesterol?.cholesterol)"
                                :previous-created-at="liveCholesterol?.createdAt"
                                value-suffix="mg/dL"
                            />

                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.CHOLESTEROL_HDL"
                                :measurement-field="MeasurementFieldEnum.CHOLESTEROL_HDL"
                                :previous-id="liveCholesterolHDL?.id"
                                :previous-value="formatNumber(liveCholesterolHDL?.cholesterolHDL)"
                                :previous-created-at="liveCholesterolHDL?.createdAt"
                                value-suffix="mg/dL"
                            />

                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.CHOLESTEROL_LDL"
                                :measurement-field="MeasurementFieldEnum.CHOLESTEROL_LDL"
                                :previous-id="liveCholesterolLDL?.id"
                                :previous-value="formatNumber(liveCholesterolLDL?.cholesterolLDL)"
                                :previous-created-at="liveCholesterolLDL?.createdAt"
                                value-suffix="mg/dL"
                            />

                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.HEMOGLOBIN_A1C"
                                :measurement-field="MeasurementFieldEnum.HEMOGLOBIN_A1C"
                                :previous-id="liveHemoglobinA1C?.id"
                                :previous-value="formatNumber(liveHemoglobinA1C?.hemoglobinA1C, 1)"
                                :previous-created-at="liveHemoglobinA1C?.createdAt"
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
