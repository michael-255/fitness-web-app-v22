<script setup lang="ts">
import { MeasurementFieldEnum } from '@/shared/enums'
import { closeIcon, labWorkModuleIcon } from '@/shared/icons'
import { formatNumber } from '@/shared/utils'
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
                                :previous-value="formatNumber(100)"
                                :previous-created-at="Date.now()"
                                value-suffix="mg/dL"
                            />

                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.CHOLESTEROL_HDL"
                                :previous-value="formatNumber(50)"
                                :previous-created-at="Date.now() - 10000000000"
                                value-suffix="mg/dL"
                            />

                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.CHOLESTEROL_LDL"
                                :previous-value="formatNumber(50)"
                                :previous-created-at="Date.now() - 20000000000"
                                value-suffix="mg/dL"
                            />

                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.HEMOGLOBIN_A1C"
                                :previous-value="formatNumber(5.7, 1)"
                                :previous-created-at="Date.now() - 30000000000"
                                value-suffix="Percent"
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
