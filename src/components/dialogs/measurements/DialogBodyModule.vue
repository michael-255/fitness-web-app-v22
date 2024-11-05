<script setup lang="ts">
import { MeasurementFieldEnum } from '@/shared/enums'
import { bodyModuleIcon, closeIcon } from '@/shared/icons'
import { useDialogPluginComponent } from 'quasar'
import MeasurementPreviousItem from './MeasurementPreviousItem.vue'

defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent()
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
                                previous-value="16"
                                :previous-created-at="Date.now() - 10000000000"
                                value-suffix="in"
                            />

                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.SHOULDERS"
                                previous-value="18"
                                :previous-created-at="Date.now() - 20000000000"
                                value-suffix="in"
                            />

                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.CHEST"
                                previous-value="42"
                                :previous-created-at="Date.now() - 30000000000"
                                value-suffix="in"
                            />

                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.WAIST"
                                previous-value="34"
                                :previous-created-at="Date.now() - 40000000000"
                                value-suffix="in"
                            />

                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.LEFT_BICEP"
                                previous-value="15"
                                :previous-created-at="Date.now() - 60000000000"
                                value-suffix="in"
                            />

                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.RIGHT_BICEP"
                                previous-value="15"
                                :previous-created-at="Date.now() - 70000000000"
                                value-suffix="in"
                            />

                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.LEFT_FOREARM"
                                previous-value="11"
                                :previous-created-at="Date.now() - 80000000000"
                                value-suffix="in"
                            />

                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.RIGHT_FOREARM"
                                previous-value="11"
                                :previous-created-at="Date.now() - 90000000000"
                                value-suffix="in"
                            />

                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.LEFT_THIGH"
                                previous-value="24"
                                :previous-created-at="Date.now() - 100000000000"
                                value-suffix="in"
                            />

                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.RIGHT_THIGH"
                                previous-value="24"
                                :previous-created-at="Date.now() - 110000000000"
                                value-suffix="in"
                            />

                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.LEFT_CALF"
                                previous-value="15"
                                :previous-created-at="Date.now() - 120000000000"
                                value-suffix="in"
                            />

                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.RIGHT_CALF"
                                previous-value="15"
                                :previous-created-at="Date.now() - 130000000000"
                                value-suffix="in"
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
