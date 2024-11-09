<script setup lang="ts">
import useLogger from '@/composables/useLogger'
import { MeasurementServInst } from '@/services/MeasurementService'
import { MeasurementFieldEnum } from '@/shared/enums'
import { bodyModuleIcon, closeIcon } from '@/shared/icons'
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

const neckSubscriptionFinished = ref(false)
const shouldersSubscriptionFinished = ref(false)
const chestSubscriptionFinished = ref(false)
const waistSubscriptionFinished = ref(false)
const bicepsSubscriptionFinished = ref(false)
const forearmsSubscriptionFinished = ref(false)
const thighsSubscriptionFinished = ref(false)
const calvesSubscriptionFinished = ref(false)

const liveNeck: Ref<MeasurementType | undefined> = ref(undefined)
const liveShoulders: Ref<MeasurementType | undefined> = ref(undefined)
const liveChest: Ref<MeasurementType | undefined> = ref(undefined)
const liveWaist: Ref<MeasurementType | undefined> = ref(undefined)
const liveBiceps: Ref<MeasurementType | undefined> = ref(undefined)
const liveForearms: Ref<MeasurementType | undefined> = ref(undefined)
const liveThighs: Ref<MeasurementType | undefined> = ref(undefined)
const liveCalves: Ref<MeasurementType | undefined> = ref(undefined)

const neckSubscription = createSubscription(
    MeasurementFieldEnum.NECK,
    liveNeck,
    neckSubscriptionFinished,
)
const shouldersSubscription = createSubscription(
    MeasurementFieldEnum.SHOULDERS,
    liveShoulders,
    shouldersSubscriptionFinished,
)
const chestSubscription = createSubscription(
    MeasurementFieldEnum.CHEST,
    liveChest,
    chestSubscriptionFinished,
)
const waistSubscription = createSubscription(
    MeasurementFieldEnum.WAIST,
    liveWaist,
    waistSubscriptionFinished,
)

const bicepsSubscription = createSubscription(
    MeasurementFieldEnum.BICEPS,
    liveBiceps,
    bicepsSubscriptionFinished,
)

const forearmsSubscription = createSubscription(
    MeasurementFieldEnum.FOREARMS,
    liveForearms,
    forearmsSubscriptionFinished,
)

const thighsSubscription = createSubscription(
    MeasurementFieldEnum.THIGHS,
    liveThighs,
    thighsSubscriptionFinished,
)

const calvesSubscription = createSubscription(
    MeasurementFieldEnum.CALVES,
    liveCalves,
    calvesSubscriptionFinished,
)

onUnmounted(() => {
    neckSubscription.unsubscribe()
    shouldersSubscription.unsubscribe()
    chestSubscription.unsubscribe()
    waistSubscription.unsubscribe()
    bicepsSubscription.unsubscribe()
    forearmsSubscription.unsubscribe()
    thighsSubscription.unsubscribe()
    calvesSubscription.unsubscribe()
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
            <q-icon :name="bodyModuleIcon" size="sm" class="q-mx-sm" />
            <q-toolbar-title>Body Module</q-toolbar-title>
            <q-btn flat round :icon="closeIcon" @click="onDialogCancel" />
        </q-toolbar>

        <q-card class="q-dialog-plugin">
            <q-card-section>
                <div class="row justify-center">
                    <div class="responsive-container">
                        <q-list padding>
                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.NECK"
                                :measurement-field="MeasurementFieldEnum.NECK"
                                :previous-id="liveNeck?.id"
                                :previous-value="formatNumber(liveNeck?.neck, 2)"
                                :previous-created-at="liveNeck?.createdAt"
                                value-suffix="in"
                            />

                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.SHOULDERS"
                                :measurement-field="MeasurementFieldEnum.SHOULDERS"
                                :previous-id="liveShoulders?.id"
                                :previous-value="formatNumber(liveShoulders?.shoulders, 2)"
                                :previous-created-at="liveShoulders?.createdAt"
                                value-suffix="in"
                            />

                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.CHEST"
                                :measurement-field="MeasurementFieldEnum.CHEST"
                                :previous-id="liveChest?.id"
                                :previous-value="formatNumber(liveChest?.chest, 2)"
                                :previous-created-at="liveChest?.createdAt"
                                value-suffix="in"
                            />

                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.WAIST"
                                :measurement-field="MeasurementFieldEnum.WAIST"
                                :previous-id="liveWaist?.id"
                                :previous-value="formatNumber(liveWaist?.waist, 2)"
                                :previous-created-at="liveWaist?.createdAt"
                                value-suffix="in"
                            />

                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.BICEPS"
                                :measurement-field="MeasurementFieldEnum.BICEPS"
                                :previous-id="liveBiceps?.id"
                                :previous-value="`${formatNumber(liveBiceps?.leftBicep, 2)} / ${formatNumber(liveBiceps?.rightBicep, 2)}`"
                                :previous-created-at="liveBiceps?.createdAt"
                                value-suffix="in (l/r)"
                            />

                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.FOREARMS"
                                :measurement-field="MeasurementFieldEnum.FOREARMS"
                                :previous-id="liveForearms?.id"
                                :previous-value="`${formatNumber(liveForearms?.leftForearm, 2)} / ${formatNumber(liveForearms?.rightForearm, 2)}`"
                                :previous-created-at="liveForearms?.createdAt"
                                value-suffix="in (l/r)"
                            />

                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.THIGHS"
                                :measurement-field="MeasurementFieldEnum.THIGHS"
                                :previous-id="liveThighs?.id"
                                :previous-value="`${formatNumber(liveThighs?.leftThigh, 2)} / ${formatNumber(liveThighs?.rightThigh, 2)}`"
                                :previous-created-at="liveThighs?.createdAt"
                                value-suffix="in (l/r)"
                            />

                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.CALVES"
                                :measurement-field="MeasurementFieldEnum.CALVES"
                                :previous-id="liveCalves?.id"
                                :previous-value="`${formatNumber(liveCalves?.leftCalf, 2)} / ${formatNumber(liveCalves?.rightCalf, 2)}`"
                                :previous-created-at="liveCalves?.createdAt"
                                value-suffix="in (l/r)"
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
