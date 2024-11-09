<script setup lang="ts">
import useLogger from '@/composables/useLogger'
import { MeasurementServInst } from '@/services/MeasurementService'
import { MeasurementFieldEnum } from '@/shared/enums'
import { closeIcon, dietModuleIcon } from '@/shared/icons'
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

const caloriesSubscriptionFinished = ref(false)
const carbsSubscriptionFinished = ref(false)
const fatSubscriptionFinished = ref(false)
const proteinSubscriptionFinished = ref(false)

const liveCalories: Ref<MeasurementType | undefined> = ref(undefined)
const liveCarbs: Ref<MeasurementType | undefined> = ref(undefined)
const liveFat: Ref<MeasurementType | undefined> = ref(undefined)
const liveProtein: Ref<MeasurementType | undefined> = ref(undefined)

const caloriesSubscription = createSubscription(
    MeasurementFieldEnum.CALORIES,
    liveCalories,
    caloriesSubscriptionFinished,
)
const carbsSubscription = createSubscription(
    MeasurementFieldEnum.CARBS,
    liveCarbs,
    carbsSubscriptionFinished,
)
const fatSubscription = createSubscription(
    MeasurementFieldEnum.FAT,
    liveFat,
    fatSubscriptionFinished,
)
const proteinSubscription = createSubscription(
    MeasurementFieldEnum.PROTEIN,
    liveProtein,
    proteinSubscriptionFinished,
)

onUnmounted(() => {
    caloriesSubscription.unsubscribe()
    carbsSubscription.unsubscribe()
    fatSubscription.unsubscribe()
    proteinSubscription.unsubscribe()
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
            <q-icon :name="dietModuleIcon" size="sm" class="q-mx-sm" />
            <q-toolbar-title>Diet Module</q-toolbar-title>
            <q-btn flat round :icon="closeIcon" @click="onDialogCancel" />
        </q-toolbar>

        <q-card class="q-dialog-plugin">
            <q-card-section>
                <div class="row justify-center">
                    <div class="responsive-container">
                        <q-list padding>
                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.CALORIES"
                                :measurementField="MeasurementFieldEnum.CALORIES"
                                :previous-id="liveCalories?.id"
                                :previous-value="formatNumber(liveCalories?.calories)"
                                :previous-created-at="liveCalories?.createdAt"
                                value-suffix="kcal"
                            />

                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.CARBS"
                                :measurementField="MeasurementFieldEnum.CARBS"
                                :previous-id="liveCarbs?.id"
                                :previous-value="formatNumber(liveCarbs?.carbs)"
                                :previous-created-at="liveCarbs?.createdAt"
                                value-suffix="grams"
                            />

                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.FAT"
                                :measurementField="MeasurementFieldEnum.FAT"
                                :previous-id="liveFat?.id"
                                :previous-value="formatNumber(liveFat?.fat)"
                                :previous-created-at="liveFat?.createdAt"
                                value-suffix="grams"
                            />

                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.PROTEIN"
                                :measurementField="MeasurementFieldEnum.PROTEIN"
                                :previous-id="liveProtein?.id"
                                :previous-value="formatNumber(liveProtein?.protein)"
                                :previous-created-at="liveProtein?.createdAt"
                                value-suffix="grams"
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
