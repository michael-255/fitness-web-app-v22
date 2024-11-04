<script setup lang="ts">
import { editIcon, openDialogIcon } from '@/shared/icons'
import type { TimestampType } from '@/shared/types'
import { compactDateFromMs, timeAgo } from '@/shared/utils'
import { useQuasar } from 'quasar'

defineProps<{
    title: string
    previousValue?: string
    previousCreatedAt?: TimestampType
    valueSuffix?: string
}>()

const $q = useQuasar()
</script>

<template>
    <q-item>
        <q-item-section>
            <q-card flat bordered>
                <q-item class="q-mt-sm">
                    <q-item-section top>
                        <q-item-label class="text-h5">{{ title }}</q-item-label>

                        <q-item-label v-if="previousValue" class="text-h5 text-cyan">
                            {{ previousValue }}
                            <span v-if="valueSuffix" class="text-caption">{{ valueSuffix }}</span>
                        </q-item-label>

                        <q-item-label v-else class="text-h5 text-cyan"> - </q-item-label>
                    </q-item-section>

                    <q-item-section top side>
                        <div class="row btn-translation">
                            <q-btn
                                :disable="!previousValue || $q.loading.isActive"
                                :icon="editIcon"
                                color="amber"
                                round
                                flat
                            />
                            <q-btn
                                :disable="$q.loading.isActive"
                                :icon="openDialogIcon"
                                color="positive"
                                round
                                flat
                            />
                        </div>
                    </q-item-section>
                </q-item>

                <q-item>
                    <q-item-section top>
                        <q-item-label v-if="previousCreatedAt" caption>
                            <div class="text-grey-5 row">
                                <q-badge
                                    :color="timeAgo(previousCreatedAt).color"
                                    class="q-mr-xs"
                                    outline
                                >
                                    {{ timeAgo(previousCreatedAt).message }}
                                </q-badge>
                                <span class="q-mt-xs">
                                    {{ compactDateFromMs(previousCreatedAt) }}
                                </span>
                            </div>
                        </q-item-label>

                        <q-item-label v-else caption> No previous records found </q-item-label>
                    </q-item-section>
                </q-item>
            </q-card>
        </q-item-section>
    </q-item>
</template>

<style scoped>
.btn-translation {
    transform: translateY(-12px) translateX(12px);
}
</style>
