const users = [
  {
    githubLogin: 'mHattrup',
    name: 'Mike Hattrup',
  },
  {
    githubLogin: 'gPlake',
    name: 'Glen Plake',
  },
  {
    githubLogin: 'sSchmidt',
    name: 'Scot Schmidt',
  },
];

const photos = [
  {
    id: '1',
    name: 'Dropping the Heaert Chute',
    description: '...sdflksdf.sdf s.df.sdfsdf',
    category: 'ACTION',
    githubUser: 'gPlake',
    created: '3-28-1977',
  },
  {
    id: '2',
    name: 'Enjoying the sunshine',
    description: '324wef/.s fsdf .sdf.435. ',
    category: 'SELFIE',
    githubUser: 'sSchmidt',
    created: '1-2-1985',
  },
  {
    id: '3',
    name: 'Gunbarrel 25',
    description: '34543tesfsd/df/sdf s fsd s4',
    category: 'LANDSCAPE',
    githubUser: 'sSchmidt',
    created: '2018-04-15T19:09:57.308Z',
  },
  {
    id: '4',
    name: 'Play ball',
    description: '324sdff sd454wr ',
    category: 'GRAPHIC',
    githubUser: 'mHattrup',
    created: '2021-04-27T12:09:57.700Z',
  },
];

const tags = [
  { photoID: '1', userID: 'mHattrup' },
  { photoID: '1', userID: 'sSchmidt' },
  { photoID: '2', userID: 'sSchmidt' },
  { photoID: '4', userID: 'mHattrup' },
  { photoID: '4', userID: 'gPlake' },
  { photoID: '4', userID: 'sSchmidt' },
]

exports.users = users;
exports.photos = photos;
exports.tags = tags;
