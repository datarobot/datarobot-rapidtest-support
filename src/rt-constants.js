import trainingMaterials from 'assets/static/TrainingMaterials.pdf';

export const ENABLE_I18N_LOGGING = process.env.REACT_APP_ENABLE_I18N_LOGGING;

export const USER_ROLES = {
  dashboard: 'dashboard_user',
  siteAdmin: 'site_admin',
  proctorAdmin: 'proctor_admin',
};

export const ROUTES = {
  LANDING_PAGE: { path: '/' },
  JOIN: { path: '/join' },
  SITES: {
    path: '/sites',
    roles: [USER_ROLES.dashboard, USER_ROLES.siteAdmin],
  },
  ADD_SITE: {
    path: '/sites/new',
    roles: [USER_ROLES.dashboard, USER_ROLES.siteAdmin],
  },
  EDIT_SITE: {
    path: '/sites/edit',
    roles: [USER_ROLES.dashboard, USER_ROLES.siteAdmin],
  },
  REQUEST_SITE: { path: '/sites/request' },
  UPLOAD_SITES: {
    path: '/sites/upload',
    roles: [USER_ROLES.dashboard, USER_ROLES.siteAdmin],
  },
  ACCOUNTS: {
    path: '/accounts',
    roles: [USER_ROLES.dashboard, USER_ROLES.proctorAdmin],
  },
  ADD_ACCOUNT: {
    path: '/accounts/new',
    roles: [USER_ROLES.dashboard, USER_ROLES.proctorAdmin],
  },
  EDIT_ACCOUNT: {
    path: '/accounts/edit',
    roles: [USER_ROLES.dashboard, USER_ROLES.proctorAdmin],
  },
  REQUEST_ACCOUNT: { path: '/accounts/request' },
  UPLOAD_ACCOUNTS: {
    path: '/accounts/upload',
    roles: [USER_ROLES.dashboard, USER_ROLES.proctorAdmin],
  },
  FAQ: { path: '/faq' },
  DASHBOARD: { path: '/dashboard' },
  LOG_IN: { path: '/login' },
  TRAINING_MATERIALS: { path: '/training-materials' },
  SUGGEST_IMPROVEMENT: {
    path: '/suggestions',
    roles: [
      USER_ROLES.dashboard,
      USER_ROLES.proctorAdmin,
      USER_ROLES.siteAdmin,
    ],
  },
  CONTACT: { path: '/contact' },
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

export const FIREBASE_CONFIG = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

export const SESSION_STORAGE_ITEMS = {
  ACCESS_TOKEN: 'access-token',
  REFRESH_TOKEN: 'refresh-token',
};

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
      url:
        'https://www.cdc.gov/coronavirus/2019-ncov/community/schools-childcare/index.html',
    },
    {
      text: 'COVID testing guidance',
      url:
        'https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/testing.html',
    },
    {
      text: 'Children, teens, young adults  (CDC)',
      url:
        'https://www.cdc.gov/coronavirus/2019-ncov/daily-life-coping/caring-for-children.html',
    },
    {
      text: 'Screen for COVID among school population',
      url:
        'https://www.cdc.gov/coronavirus/2019-ncov/community/schools-childcare/symptom-screening.html',
    },
  ],
};

export const CURRENT_PROGRAMS = ['PA', 'TX', 'WA'];

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
