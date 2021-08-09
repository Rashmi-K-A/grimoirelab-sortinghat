import TeamModal from './TeamModal.vue';

export default {
  title: 'TeamModal',
  excludeStories: /.*Data$/,
};

const TeamModalTemplate = `  <div class="ma-auto">
    <v-btn color="primary" dark @click.stop="modal.open = true">
      Open Dialog
    </v-btn><team-modal :is-open.sync="modal.open" :organization="organization"  :add-team="addTeam" :delete-team="deleteTeam" :fetch-teams="fetchTeams"/></div>`;

export const Default = () => ({
  components: { TeamModal },
  template: TeamModalTemplate,
  data: () => ({
    organization: 'Hogwarts',
    modal: {
      open: false,
    },
    query: [
      {
        data: {
          teams: {
            entities: [
              {
                name: 'BU1',
              },
              {
                name: 'BU2',
              },
              {
                name: 'BU3',
              },
              {
                name: 'Team1',
                parent: 'BU1',
              },
              {
                name: 'Team2',
                parent: 'BU1',
              },
              {
                name: 'Team4',
                parent: 'BU3',
              },
            ],
            pageInfo: {
              page: 1,
              pageSize: 3,
              numPages: 2,
              totalResults: 4,
            },
          },
        },
      },
    ],
  }),
  methods: {
    fetchTeams(page, itemSize, filters) {
      let data = [];
      if (Object.keys(filters).includes('parent')) {
        this.query[0].data.teams.entities.forEach((team) => {
          if (team['parent'] === filters['parent']) {
            data.push(team);
          }
        });
      } else {
        this.query[0].data.teams.entities.forEach((team) => {
          if (team['parent'] === undefined) {
            data.push(team);
          }
        });
      }
      const resp = {
        data: {
          teams: {
            entities: data,
            pageInfo: this.query[0]['data']['teams']['pageInfo'],
          },
        },
      };

      return resp;
    },
    addTeam(team, organization, parent) {
      const insertData = {
        name: team,
      };
      if (parent) {
        insertData['parent'] = parent;
      }
      this.query[0].data.teams.entities.push(insertData);
      return true;
    },
    deleteTeam(team, organization) {
      this.query[0].data.teams.entities = this.query[0].data.teams.entities.filter(
        (elem) => elem.name != team,
      );
      console.log(this.query[0]);
      return true;
    },
  },
});
