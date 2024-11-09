<script setup lang="ts">
import { StatusEnum } from '@/shared/enums'
import {
    addEntryIcon,
    chartsIcon,
    deleteIcon,
    editIcon,
    favoriteOffIcon,
    favoriteOnIcon,
    inspectIcon,
    verticalDotMenuIcon,
} from '@/shared/icons'
import type { ServiceType } from '@/shared/types'
import { compactDateFromMs, timeAgo } from '@/shared/utils'
import { useQuasar } from 'quasar'
import NewlinedTextArea from './NewlinedTextArea.vue'

defineProps<{
    record: Record<string, any>
    service: ServiceType
    childService: ServiceType
}>()

const $q = useQuasar()
</script>

<template>
    <q-item>
        <q-item-section>
            <q-card flat bordered>
                <q-item class="q-mt-sm">
                    <q-item-section top>
                        <q-item-label class="text-body1">{{ record?.name }}</q-item-label>

                        <q-item-label v-if="record?.lastChild?.createdAt" caption>
                            <div class="text-grey-5 row">
                                <q-badge
                                    outline
                                    :color="timeAgo(record.lastChild.createdAt).color"
                                    class="q-mr-xs"
                                >
                                    {{ timeAgo(record.lastChild.createdAt).message }}
                                </q-badge>
                                <span class="q-mt-xs">
                                    {{ compactDateFromMs(record.lastChild.createdAt) }}
                                </span>
                            </div>
                        </q-item-label>

                        <q-item-label v-else caption> No previous records found </q-item-label>
                    </q-item-section>

                    <q-item-section top side>
                        <div class="row btn-translation">
                            <q-btn
                                :disable="$q.loading.isActive"
                                :icon="
                                    record?.status.includes(StatusEnum.FAVORITED)
                                        ? favoriteOnIcon
                                        : favoriteOffIcon
                                "
                                :color="
                                    record?.status.includes(StatusEnum.FAVORITED) ? 'amber' : 'grey'
                                "
                                flat
                                dense
                                round
                                @click="
                                    () => $q.dialog(service.toggleFavoriteDialogOptions(record?.id))
                                "
                            />
                            <q-btn
                                :disable="$q.loading.isActive"
                                :icon="verticalDotMenuIcon"
                                flat
                                dense
                                round
                            >
                                <q-menu
                                    auto-close
                                    anchor="top right"
                                    transition-show="flip-right"
                                    transition-hide="flip-left"
                                >
                                    <q-list>
                                        <q-item
                                            v-if="service.supportsCharts"
                                            :disable="
                                                !record?.lastChild?.createdAt || $q.loading.isActive
                                            "
                                            clickable
                                            @click="
                                                () =>
                                                    $q.dialog(
                                                        service.chartsDialogOptions(record?.id),
                                                    )
                                            "
                                        >
                                            <q-item-section avatar>
                                                <q-icon
                                                    :color="
                                                        !record?.lastChild?.createdAt ||
                                                        $q.loading.isActive
                                                            ? 'grey'
                                                            : 'cyan'
                                                    "
                                                    :name="chartsIcon"
                                                />
                                            </q-item-section>

                                            <q-item-section>Charts</q-item-section>
                                        </q-item>

                                        <q-item
                                            v-if="service.supportsInspect"
                                            :disable="$q.loading.isActive"
                                            clickable
                                            @click="
                                                () =>
                                                    $q.dialog(
                                                        service.inspectDialogOptions(record?.id),
                                                    )
                                            "
                                        >
                                            <q-item-section avatar>
                                                <q-icon
                                                    :color="
                                                        $q.loading.isActive ? 'grey' : 'primary'
                                                    "
                                                    :name="inspectIcon"
                                                />
                                            </q-item-section>

                                            <q-item-section>Inspect</q-item-section>
                                        </q-item>

                                        <q-item
                                            v-if="service.supportsEdit"
                                            :disable="
                                                record?.status.includes(StatusEnum.LOCKED) ||
                                                $q.loading.isActive
                                            "
                                            clickable
                                            @click="
                                                () =>
                                                    $q.dialog(service.editDialogOptions(record?.id))
                                            "
                                        >
                                            <q-item-section avatar>
                                                <q-icon
                                                    :color="
                                                        record?.status.includes(
                                                            StatusEnum.LOCKED,
                                                        ) || $q.loading.isActive
                                                            ? 'grey'
                                                            : 'amber'
                                                    "
                                                    :name="editIcon"
                                                />
                                            </q-item-section>

                                            <q-item-section>Edit</q-item-section>
                                        </q-item>

                                        <q-item
                                            v-if="service.supportsDelete"
                                            :disable="
                                                record?.status.includes(StatusEnum.LOCKED) ||
                                                $q.loading.isActive
                                            "
                                            clickable
                                            @click="
                                                () =>
                                                    $q.dialog(
                                                        service.deleteDialogOptions(record?.id),
                                                    )
                                            "
                                        >
                                            <q-item-section avatar>
                                                <q-icon
                                                    :color="
                                                        record?.status.includes(
                                                            StatusEnum.LOCKED,
                                                        ) || $q.loading.isActive
                                                            ? 'grey'
                                                            : 'negative'
                                                    "
                                                    :name="deleteIcon"
                                                />
                                            </q-item-section>

                                            <q-item-section>Delete</q-item-section>
                                        </q-item>
                                    </q-list>
                                </q-menu>
                            </q-btn>
                        </div>
                    </q-item-section>
                </q-item>

                <q-item v-if="record?.desc">
                    <q-item-section>
                        <q-item-label>
                            <NewlinedTextArea :text="record.desc" />
                        </q-item-label>
                    </q-item-section>
                </q-item>

                <q-item v-if="record?.lastChild?.note">
                    <q-item-section>
                        <q-item-label class="text-grey-5">
                            <div>Previous Note:</div>
                            <NewlinedTextArea :text="record.lastChild.note" />
                        </q-item-label>
                    </q-item-section>
                </q-item>

                <q-card-actions>
                    <q-btn
                        :disable="record?.status.includes(StatusEnum.LOCKED) || $q.loading.isActive"
                        color="primary"
                        :label="`Add ${childService.labelSingular}`"
                        class="full-width"
                        :icon="addEntryIcon"
                        @click="() => $q.dialog(childService.createDialogOptions(record?.id))"
                    />
                </q-card-actions>
            </q-card>
        </q-item-section>
    </q-item>
</template>

<style scoped>
.btn-translation {
    transform: translateY(-12px) translateX(12px);
}
</style>
