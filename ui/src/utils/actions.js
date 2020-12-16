const mergeIndividuals = (individuals, action, dialog) => {
  if (individuals.length !== new Set(individuals).size) {
    return;
  }
  const [toIndividual, ...rest] = individuals;
  const fromIndividuals = rest.map(individual =>
    individual.uuid ? individual.uuid : individual
  );
  confirmMerge(
    dialog,
    action,
    fromIndividuals,
    toIndividual.uuid || toIndividual
  );
};

const confirmMerge = (dialog, action, fromUuids, toUuid) => {
  Object.assign(dialog, {
    open: true,
    title: "Merge the selected items?",
    text: "",
    action: () => action(fromUuids, toUuid)
  });
};

const moveIdentity = (fromUuid, toUuid, action, dialog) => {
  if (fromUuid === toUuid) {
    return;
  }
  Object.assign(dialog, {
    open: true,
    title: "Move identity to this individual?",
    text: "",
    action: () => action(fromUuid, toUuid)
  });
};

const groupIdentities = identities => {
  const icons = ["git", "github", "gitlab"];
  const groupedIdentities = identities.reduce((result, val) => {
    let source = val.source.toLowerCase();
    if (!icons.find(icon => icon === source)) {
      source = "others";
    }
    if (result[source]) {
      result[source].identities.push(val);
    } else {
      result[source] = {
        name: source,
        identities: [val]
      };
    }
    return result;
  }, {});

  return Object.values(groupedIdentities);
};

const formatIndividuals = individuals => {
  const formattedList = individuals.map(item => {
    return {
      name: item.profile.name,
      id: item.profile.id,
      email: item.profile.email,
      username: item.identities[0].username,
      organization: item.enrollments[0]
        ? item.enrollments[0].organization.name
        : "",
      sources: groupIdentities(item.identities).map(identity => identity.name),
      gender: item.profile.gender,
      country: item.profile.country,
      identities: groupIdentities(item.identities),
      enrollments: item.enrollments,
      isLocked: item.isLocked,
      isBot: item.profile.isBot,
      uuid: item.identities[0].uuid,
      isSelected: false
    };
  });

  return formattedList;
};

export { mergeIndividuals, moveIdentity, groupIdentities, formatIndividuals };