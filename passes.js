const passes = [
  {
    result: 'incomplete',
    receiver: 'Demaryius Thomas',
    distance: 0.7
  },
  {
    result: 'complete',
    receiver: 'Tim Patrick',
    distance: 0.9
  },
  {
    result: 'complete',
    receiver: 'Demaryius Thomas',
    distance: 0.3
  },
  {
    result: 'incomplete',
    receiver: 'Tim Patrick',
    distance: 0.9
  },
  {
    result: 'incomplete',
    receiver: 'Tim Patrick',
    distance: 0.8
  },
  {
    result: 'complete',
    receiver: 'Demaryius Thomas',
    distance: 0.1
  },
  {
    result: 'interception',
    receiver: 'Demaryius Thomas',
    distance: 0.4
  }
];

// Transformed array to get PlayerName : [ 0 , 1...] 1 meaning complete other things meaning 0. Making it easier to sum how many completes later on
const transformArray = passes =>
  (passes = passes.reduce((accomulator, pass) => {
    let { receiver, result } = pass;
    return {
      ...accomulator,
      [receiver]: [
        ...(accomulator[receiver] || []),
        result === 'complete' ? 1 : 0
      ]
    };
  }, {}));

// Iterate over the collectiong and find the top
const getTopPlayer = passes => {
  const SCORES = 1;
  const NAME = 0;
  let currentTop = {
    player: '',
    value: -1
  };

  const playerPasses = Object.entries(transformArray(passes));
  for (const passes of playerPasses) {
    let totalWins = passes[SCORES].reduce((a, b) => a + b, 0);
    let percentage = totalWins / passes[SCORES].length;
    if (percentage > currentTop.value) {
      currentTop.player = passes[NAME];
      currentTop.value = percentage;
    }
  }
  return { player: currentTop.player, value: `${currentTop.value * 100}%` };
};

// Tried to find the highested score on the array first with the complete result
// after finding it, get the value of the array corresponding to it
const getMaxDistance = passes => {
  let max = passes.reduce(
    (min, p) =>
      p.result === 'complete' && p.distance > min ? p.distance : min,
    0
  );
  return passes.find(
    element => element.distance === max && element.result === 'complete'
  );
};

console.log(getMaxDistance(passes));
console.log(getTopPlayer(passes));
