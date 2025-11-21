// Habits System Documentation Index

export const habitDocs = {
  overview: 'README.md',
  creationFlow: 'habit-creation-flow.md',
  componentGuide: 'component-guide.md',
  apiIntegration: 'api-integration.md'
};

// Quick navigation
export const getDocPath = (doc) => `/docs/features/habits/${habitDocs[doc]}`;

// Documentation sections
export const sections = {
  'System Overview': 'overview',
  'Habit Creation Flow': 'creationFlow',
  'Component Guide': 'componentGuide',
  'API Integration': 'apiIntegration'
};
