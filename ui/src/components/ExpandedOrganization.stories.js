import ExpandedOrganization from './ExpandedOrganization.vue';

export default {
  title: 'ExpandedOrganization',
  excludeStories: /.*Data$/,
};

const ExpandedOrganizationTemplate = `<expanded-organization :domains="domains" :organization="organization" :add-team="addTeam" :delete-team="deleteTeam" :fetch-teams="fetchTeams"/>`;

export const Default = () => ({
  components: { ExpandedOrganization },
  template: ExpandedOrganizationTemplate,
  data: () => ({
    domains: [{ domain: 'hogwarts.edu' }, { domain: 'hogwarts.com' }],
    organization: 'Hogwarts',
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

export const Empty = () => ({
  components: { ExpandedOrganization },
  template: ExpandedOrganizationTemplate,
  data: () => ({
    domains: [],
    organization: 'Hogwarts',
    query:  [{
        data: {
          teams: {
            entities: [],
            pageInfo: {
              page: 1,
              pageSize: 3,
              numPages: 2,
              totalResults: 4,
            },
        },
      },
    }],
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
