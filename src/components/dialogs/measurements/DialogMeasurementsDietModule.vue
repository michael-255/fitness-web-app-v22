<script setup lang="ts">
import { MeasurementFieldEnum } from '@/shared/enums'
import { addNotesIcon, closeIcon, dietModuleIcon, openDialogIcon, saveIcon } from '@/shared/icons'
import { compactDateFromMs, timeAgo } from '@/shared/utils'
import { useSettingsStore } from '@/stores/settings'
import { useDialogPluginComponent } from 'quasar'

defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent()

const settingsStore = useSettingsStore()
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
                            <q-item>
                                <q-item-section>
                                    <q-item-label class="text-bold">Diet</q-item-label>

                                    <q-item-label v-if="!settingsStore.advancedMode">
                                        Update the three macronutrients below. You should only do
                                        this once a day.
                                    </q-item-label>
                                </q-item-section>
                            </q-item>

                            <q-item>
                                <q-item-section>
                                    <q-card flat bordered>
                                        <q-item class="q-mt-sm">
                                            <q-item-section top>
                                                <q-item-label class="text-body1 text-bold">
                                                    {{ MeasurementFieldEnum.CALORIES }}
                                                </q-item-label>

                                                <q-item-label class="text-h6 text-cyan">
                                                    3500
                                                </q-item-label>

                                                <q-item-label caption>
                                                    <div class="text-grey-5">
                                                        <span class="q-mr-xs">
                                                            {{ compactDateFromMs(Date.now()) }}
                                                        </span>
                                                        <q-badge
                                                            outline
                                                            :color="timeAgo(Date.now()).color"
                                                            class="q-mt-xs"
                                                        >
                                                            {{ timeAgo(Date.now()).message }}
                                                        </q-badge>
                                                    </div>
                                                </q-item-label>
                                            </q-item-section>

                                            <q-item-section top side>
                                                <q-btn
                                                    class="btn-translation"
                                                    flat
                                                    round
                                                    color="positive"
                                                    :icon="saveIcon"
                                                />
                                                <q-btn
                                                    class="btn-translation"
                                                    flat
                                                    round
                                                    color="primary"
                                                    :icon="addNotesIcon"
                                                />
                                            </q-item-section>
                                        </q-item>
                                    </q-card>
                                </q-item-section>
                            </q-item>

                            <q-item>
                                <q-item-section>
                                    <q-card flat bordered>
                                        <q-item class="q-mt-sm">
                                            <q-item-section top>
                                                <q-item-label class="text-h5">
                                                    {{ MeasurementFieldEnum.CALORIES }}
                                                </q-item-label>

                                                <q-item-label class="text-h5 text-cyan">
                                                    3500
                                                </q-item-label>

                                                <q-item-label caption>
                                                    <div class="text-grey-5">
                                                        <span class="q-mr-xs">
                                                            {{ compactDateFromMs(Date.now()) }}
                                                        </span>
                                                        <q-badge
                                                            outline
                                                            :color="timeAgo(Date.now()).color"
                                                            class="q-mt-xs"
                                                        >
                                                            {{ timeAgo(Date.now()).message }}
                                                        </q-badge>
                                                    </div>
                                                </q-item-label>
                                            </q-item-section>

                                            <q-item-section top side>
                                                <q-btn
                                                    class="btn-translation"
                                                    flat
                                                    dense
                                                    round
                                                    color="positive"
                                                    :icon="openDialogIcon"
                                                />
                                            </q-item-section>
                                        </q-item>
                                    </q-card>
                                </q-item-section>
                            </q-item>

                            <q-item>
                                <q-item-section>
                                    <q-card flat bordered>
                                        <q-item class="q-mt-sm">
                                            <q-item-section top>
                                                <q-item-label class="text-h5">
                                                    {{ MeasurementFieldEnum.CARBS }}
                                                </q-item-label>

                                                <q-item-label class="text-h5 text-cyan">
                                                    120
                                                </q-item-label>

                                                <q-item-label caption>
                                                    <div class="text-grey-5">
                                                        <span class="q-mr-xs">
                                                            {{ compactDateFromMs(Date.now()) }}
                                                        </span>
                                                        <q-badge
                                                            outline
                                                            :color="timeAgo(Date.now()).color"
                                                            class="q-mt-xs"
                                                        >
                                                            {{ timeAgo(Date.now()).message }}
                                                        </q-badge>
                                                    </div>
                                                </q-item-label>
                                            </q-item-section>

                                            <q-item-section top side>
                                                <q-btn
                                                    class="btn-translation"
                                                    flat
                                                    dense
                                                    round
                                                    color="positive"
                                                    :icon="openDialogIcon"
                                                />
                                            </q-item-section>
                                        </q-item>
                                    </q-card>
                                </q-item-section>
                            </q-item>

                            <q-item>
                                <q-item-section>
                                    <q-card flat bordered>
                                        <q-item class="q-mt-sm">
                                            <q-item-section top>
                                                <q-item-label class="text-h5">
                                                    {{ MeasurementFieldEnum.FAT }}
                                                </q-item-label>

                                                <q-item-label class="text-h5 text-cyan">
                                                    60
                                                </q-item-label>

                                                <q-item-label caption>
                                                    <div class="text-grey-5">
                                                        <span class="q-mr-xs">
                                                            {{ compactDateFromMs(Date.now()) }}
                                                        </span>
                                                        <q-badge
                                                            outline
                                                            :color="timeAgo(Date.now()).color"
                                                            class="q-mt-xs"
                                                        >
                                                            {{ timeAgo(Date.now()).message }}
                                                        </q-badge>
                                                    </div>
                                                </q-item-label>
                                            </q-item-section>

                                            <q-item-section top side>
                                                <q-btn
                                                    class="btn-translation"
                                                    flat
                                                    dense
                                                    round
                                                    color="positive"
                                                    :icon="openDialogIcon"
                                                />
                                            </q-item-section>
                                        </q-item>
                                    </q-card>
                                </q-item-section>
                            </q-item>

                            <q-item>
                                <q-item-section>
                                    <q-card flat bordered>
                                        <q-item class="q-mt-sm">
                                            <q-item-section top>
                                                <q-item-label class="text-h5">
                                                    {{ MeasurementFieldEnum.PROTEIN }}
                                                </q-item-label>

                                                <q-item-label class="text-h5 text-cyan">
                                                    85
                                                </q-item-label>

                                                <q-item-label caption>
                                                    <div class="text-grey-5">
                                                        <span class="q-mr-xs">
                                                            {{ compactDateFromMs(Date.now()) }}
                                                        </span>
                                                        <q-badge
                                                            outline
                                                            :color="timeAgo(Date.now()).color"
                                                            class="q-mt-xs"
                                                        >
                                                            {{ timeAgo(Date.now()).message }}
                                                        </q-badge>
                                                    </div>
                                                </q-item-label>
                                            </q-item-section>

                                            <q-item-section top side>
                                                <q-btn
                                                    class="btn-translation"
                                                    flat
                                                    dense
                                                    round
                                                    color="positive"
                                                    :icon="openDialogIcon"
                                                />
                                            </q-item-section>
                                        </q-item>
                                    </q-card>
                                </q-item-section>
                            </q-item>
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
