<template>
  <td colspan="3">
    <v-list dense>
      <v-subheader>Domains ({{ domains.length }})</v-subheader>
      <v-list-item v-for="(item, index) in domains" :key="index">
        <v-list-item-content>
          <v-list-item-title>{{ item.domain }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-subheader
      >Teams -
      <v-btn depressed small height="34" @click.stop="openModal" text>
        View all
      </v-btn>
    </v-subheader>
    <team-modal
      :is-open.sync="modal.open"
      :organization="organization"
      :add-team="addTeam"
      :delete-team="deleteTeam"
      :fetch-teams="fetchTeams"
    />
  </td>
</template>

<script>
import TeamModal from './TeamModal.vue';

export default {
  name: 'ExpandedOrganization',
  components: {
    TeamModal,
  },
  props: {
    domains: {
      type: Array,
      required: true,
    },
    organization: {
      type: String,
      required: true,
    },
    addTeam: {
      type: Function,
      required: true,
    },
    deleteTeam: {
      type: Function,
      required: true,
    },
    fetchTeams: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      modal: {
        open: false,
      },
    };
  },
  methods: {
    openModal() {
      Object.assign(this.modal, { open: true });
    },
  },
};
</script>
