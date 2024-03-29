import trainingMaterials from 'assets/static/TrainingMaterials.pdf';

export const CONTACT_EMAIL =
  process.env.REACT_APP_CONTACT_EMAIL || 'contact@example.com';

export const ENABLE_I18N_LOGGING = process.env.REACT_APP_ENABLE_I18N_LOGGING;

export const USER_ROLES = {
  dashboard: 'dashboard_user',
  siteAdmin: 'site_admin',
  proctorAdmin: 'proctor_admin',
};

export const ROUTES = {
  LANDING_PAGE: { path: '/v1' },
  LANDING_PAGE_V2: { path: '/' },
  JOIN: { path: '/v1/join' },
  JOIN_V2: { path: '/join' },
  SITES: {
    path: '/v1/sites',
    roles: [USER_ROLES.dashboard, USER_ROLES.siteAdmin],
  },
  SITES_V2: {
    path: '/sites',
    roles: [USER_ROLES.dashboard, USER_ROLES.siteAdmin],
  },
  ADMIN: {
    path: '/v1/admin',
    roles: [
      USER_ROLES.dashboard,
      USER_ROLES.proctorAdmin,
      USER_ROLES.siteAdmin,
    ],
  },
  ADMIN_V2: {
    path: '/admin',
    roles: [
      USER_ROLES.dashboard,
      USER_ROLES.proctorAdmin,
      USER_ROLES.siteAdmin,
    ],
  },
  ADD_SITE: {
    path: '/v1/sites/new',
    roles: [USER_ROLES.dashboard, USER_ROLES.siteAdmin],
  },
  EDIT_SITE: {
    path: '/v1/sites/edit/:id',
    roles: [USER_ROLES.dashboard, USER_ROLES.siteAdmin],
  },
  REQUEST_SITE: { path: '/v1/sites/request' },
  REQUEST_SITE_V2: { path: '/sites/request' },
  UPLOAD_SITES: {
    path: '/v1/sites/upload',
    roles: [USER_ROLES.dashboard, USER_ROLES.siteAdmin],
  },
  ACCOUNTS: {
    path: '/v1/accounts',
    roles: [USER_ROLES.dashboard, USER_ROLES.proctorAdmin],
  },
  ACCOUNTS_V2: {
    path: '/accounts',
    roles: [USER_ROLES.dashboard, USER_ROLES.proctorAdmin],
  },
  ADD_ACCOUNT: {
    path: '/v1/accounts/new',
    roles: [USER_ROLES.dashboard, USER_ROLES.proctorAdmin],
  },
  EDIT_ACCOUNT: {
    path: '/v1/accounts/edit/:id',
    roles: [USER_ROLES.dashboard, USER_ROLES.proctorAdmin],
  },
  REQUEST_ACCOUNT: { path: '/v1/accounts/request' },
  REQUEST_ACCOUNT_V2: { path: '/accounts/request' },
  UPLOAD_ACCOUNTS: {
    path: '/v1/accounts/upload',
    roles: [USER_ROLES.dashboard, USER_ROLES.proctorAdmin],
  },
  FAQ: {
    path: '/v1/faq',
  },
  FAQ_V2: {
    path: '/faq/:id?',
  },
  FAQ_V2_LANDING: {
    path: '/faq',
  },
  DASHBOARD: { path: '/v1/dashboard' },
  DASHBOARD_V2: { path: '/dashboard' },
  LOG_IN: { path: '/v1/login' },
  LOG_IN_V2: { path: '/login' },
  TRAINING_MATERIALS: { path: '/v1/training-materials' },
  TRAINING_MATERIALS_V2: { path: '/training-materials' },
  TESTING_GUIDE: { path: '/testing-guide/:id?' },
  TESTING_GUIDE_LANDING: { path: '/testing-guide' },
  SUGGEST_IMPROVEMENT: {
    path: '/v1/suggestions',
    roles: [
      USER_ROLES.dashboard,
      USER_ROLES.proctorAdmin,
      USER_ROLES.siteAdmin,
    ],
  },
  SUGGEST_IMPROVEMENT_V2: {
    path: '/suggestions',
    roles: [
      USER_ROLES.dashboard,
      USER_ROLES.proctorAdmin,
      USER_ROLES.siteAdmin,
    ],
  },
  CONTACT: { path: '/v1/contact' },
  CONTACT_V2: { path: '/contact' },
};

export const VALID_SITE_COLUMNS = {
  REQUIRED: [
    'site_name',
    'street',
    'city',
    'county',
    'state',
    'zip',
    'site_type',
    'district',
    'clia',
    'clia_holder_name',
  ],
  OPTIONAL: [
    'contact_name',
    'contact_phone',
    'contact_email',
    'latitude',
    'longitude',
  ],
};

export const VALID_ACCOUNT_COLUMNS = {
  REQUIRED: ['first_name', 'last_name', 'email_address'],
  OPTIONAL: ['phone_number_office'],
};

export const SESSION_STORAGE_ITEMS = {
  ACCESS_TOKEN: 'access-token',
  REFRESH_TOKEN: 'refresh-token',
  MAIN: 'rapidtest',
};

export const FIREBASE_CONFIG = {
  PA: {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_PA_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PA_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_PA_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_PA_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_PA_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_PA_FIREBASE_MEASUREMENT_ID,
  },
  WA: {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_WA_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_WA_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_WA_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_WA_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_WA_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_WA_FIREBASE_MEASUREMENT_ID,
  },
};

export const FIREBASE_PA_CONFIG = {};

export const SENTRY_DSN_DEV = process.env.REACT_APP_SENTRY_DSN_DEV;
export const SENTRY_DSN = process.env.REACT_APP_SENTRY_DSN;
export const SENTRY_SAMPLE_RATE = process.env.REACT_APP_SENTRY_SAMPLE_RATE;

export const LANDING_PAGE_LINKS = {
  TESTING_OTHERS: [
    {
      text: 'Request a user account',
      url: ROUTES.REQUEST_ACCOUNT.path,
      useRouter: true,
    },
    {
      text: 'Request a site',
      url: ROUTES.REQUEST_SITE.path,
      useRouter: true,
    },
    {
      text: 'Suggest an improvement',
      url: ROUTES.SUGGEST_IMPROVEMENT.path,
      useRouter: true,
    },
    { text: 'Training materials', url: trainingMaterials },
    { text: 'FAQ', url: ROUTES.FAQ.path, useRouter: true },
    { text: 'Contact support', url: ROUTES.CONTACT.path, useRouter: true },
  ],
  GETTING_TESTED: [
    {
      text: 'CDC guidance for school and childcare programs',
      url: 'https://www.cdc.gov/coronavirus/2019-ncov/community/schools-childcare/index.html',
    },
    {
      text: 'COVID testing guidance',
      url: 'https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/testing.html',
    },
    {
      text: 'Children, teens, young adults  (CDC)',
      url: 'https://www.cdc.gov/coronavirus/2019-ncov/daily-life-coping/caring-for-children.html',
    },
    {
      text: 'Screen for COVID among school population',
      url: 'https://www.cdc.gov/coronavirus/2019-ncov/community/schools-childcare/symptom-screening.html',
    },
  ],
};

export const LIVE_PROGRAMS = ['PA', 'WA'];

export const CURRENT_PROGRAMS = ['PA', 'TX', 'WA'];

export const CURRENT_PROGRAMS_FULL = [
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'TX', label: 'Texas' },
  { value: 'WA', label: 'Washington' },
];

export const NO_PROGRAMS_FULL = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'DC', label: 'District Of Columbia' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
];

export const YES_NO_RADIOS = [
  { value: true, label: 'Yes' },
  { value: false, label: 'No' },
];

export const STATE_OPTIONS = [
  { value: 'AL', label: 'AL' },
  { value: 'AK', label: 'AK' },
  { value: 'AR', label: 'AR' },
  { value: 'AZ', label: 'AZ' },
  { value: 'CA', label: 'CA' },
  { value: 'CO', label: 'CO' },
  { value: 'CT', label: 'CT' },
  { value: 'DC', label: 'DC' },
  { value: 'DE', label: 'DE' },
  { value: 'FL', label: 'FL' },
  { value: 'GA', label: 'GA' },
  { value: 'HI', label: 'HI' },
  { value: 'IA', label: 'IA' },
  { value: 'ID', label: 'ID' },
  { value: 'IL', label: 'IL' },
  { value: 'IN', label: 'IN' },
  { value: 'KS', label: 'KS' },
  { value: 'KY', label: 'KY' },
  { value: 'LA', label: 'LA' },
  { value: 'MA', label: 'MA' },
  { value: 'MD', label: 'MD' },
  { value: 'ME', label: 'ME' },
  { value: 'MI', label: 'MI' },
  { value: 'MN', label: 'MN' },
  { value: 'MO', label: 'MO' },
  { value: 'MS', label: 'MS' },
  { value: 'MT', label: 'MT' },
  { value: 'NC', label: 'NC' },
  { value: 'NE', label: 'NE' },
  { value: 'NH', label: 'NH' },
  { value: 'NJ', label: 'NJ' },
  { value: 'NM', label: 'NM' },
  { value: 'NV', label: 'NV' },
  { value: 'NY', label: 'NY' },
  { value: 'ND', label: 'ND' },
  { value: 'OH', label: 'OH' },
  { value: 'OK', label: 'OK' },
  { value: 'OR', label: 'OR' },
  { value: 'PA', label: 'PA' },
  { value: 'RI', label: 'RI' },
  { value: 'SC', label: 'SC' },
  { value: 'SD', label: 'SD' },
  { value: 'TN', label: 'TN' },
  { value: 'TX', label: 'TX' },
  { value: 'UT', label: 'UT' },
  { value: 'VT', label: 'VT' },
  { value: 'VA', label: 'VA' },
  { value: 'WA', label: 'WA' },
  { value: 'WI', label: 'WI' },
  { value: 'WV', label: 'WV' },
  { value: 'WY', label: 'WY' },
];

export const STATE_OPTIONS_FULL = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'DC', label: 'District Of Columbia' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
];

export const STATE_TO_NAME = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District Of Columbia',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
};
