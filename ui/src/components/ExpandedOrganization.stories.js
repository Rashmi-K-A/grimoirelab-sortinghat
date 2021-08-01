import ExpandedOrganization from "./ExpandedOrganization.vue";

export default {
  title: "ExpandedOrganization",
  excludeStories: /.*Data$/
};

const ExpandedOrganizationTemplate = `<expanded-organization :domains="domains" :teams="teams"/>`;

export const Default = () => ({
  components: { ExpandedOrganization },
  template: ExpandedOrganizationTemplate,
  data: () => ({
    domains: [{ domain: "hogwarts.edu" }, { domain: "hogwarts.com" }],
    teams: [{ name: "Slytherin" }, { name: "Gryffindor" }, { name: "Ravenclaw" }]
  })
});

export const Empty = () => ({
  components: { ExpandedOrganization },
  template: ExpandedOrganizationTemplate,
  data: () => ({
    domains: [],
    teams: [],
  })
});
