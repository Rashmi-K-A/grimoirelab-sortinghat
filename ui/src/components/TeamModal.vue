<template>
  <v-dialog v-model="isOpen" persistent max-width="1000px">
    <v-card class="section">
      <v-card-title class="header">
        <span class="title"> {{ organization }} teams </span>

      </v-card-title>
      <form>
        <v-card-text>
          <v-treeview
            :active.sync="active"
            :items="teams"
            :load-children="getSubTeams"
            :open.sync="open"
            activatable
            color="warning"
            open-on-click
            transition
          >
          <template v-slot:prepend="{ item }">
            <v-icon v-if="!item.children">
              mdi-account
            </v-icon>
          </template>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click.prevent="closeModal">
            Close
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>
<script>
import { getPaginatedTeams } from "../apollo/queries";
export default {
  name: "TeamModal",
  props: {
    isOpen: {
      type: Boolean,
      required: false,
      default: false,
    },
    organization: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      itemsPerPage: 50,
      filters: {},
      teams: [],
      pageCount: 0,
      page: 1,
      totalResults: 0,
    };
  },
  methods: {
    closeModal() {
      this.errorMessage = '';
      this.$emit('update:isOpen', false);
    },
    async getSubTeams(item) {
     let filters = this.filters;
     filters['parent'] = item;
     console.log(item);
     this.getTeams(filters);
    },
    async getTeams(filters = this.filters) {
      const response = await getPaginatedTeams(this.$apollo, this.page, this.itemsPerPage, filters);
      if (response) {
        this.teams = response.data.teams.entities;
        this.pageCount = response.data.teams.pageInfo.numPages;
        this.page = response.data.teams.pageInfo.page;
        this.totalResults = response.data.teams.pageInfo.totalResults;
      }
      console.log(this.teams);
    },
  },
  created() {
    this.filters = { organization: this.organization };
    this.getTeams();
  },
};
</script>
