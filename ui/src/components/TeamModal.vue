<template>
  <v-dialog v-model="isOpen" persistent max-width="1000px">
    <v-card class="section">
      <v-card-title class="header">
        <span class="title">
          {{organization}} teams
        </span>
         <v-spacer></v-spacer>
          <v-btn
        depressed
        small
        height="34"
        color="secondary"
        class="black--text"
        @click.stop="openModal"
      >
        Add team
      </v-btn>
      </v-card-title>
      <form>
        <v-card-text>
            <td colspan="3">
              <v-list dense>
                <v-list-item v-for="(item, index) in teams" :key="index">
                  <v-list-item-content>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </td>
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
import {getPaginatedTeams} from "../apollo/queries";
export default {
  name: "TeamModal",
  props: {
     isOpen: {
      type: Boolean,
      required: false,
      default: false
     },
     organization: {
       type: String,
       required: true,
     },
     teams: {
        type: Array,
        required: true
    },
  },
  methods: {
    closeModal() {
      this.errorMessage = "";
      this.$emit("update:isOpen", false);
    },
  },
  created() {
    this.filters={"organization": this.organization, "parent": null};
  }
}
</script>
