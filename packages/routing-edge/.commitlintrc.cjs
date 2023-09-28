module.exports = {
    extends: [
      "@commitlint/config-conventional"
    ],
    rules: {
      "type-enum": [2, "always", [
          "build",
          "chore",
          "ci",
          "docs",
          "feat",
          "fix",
          "perf",
          "refactor",
          "revert",
          "style",
          "test",
        ],
      ],
      'subject-case': [
              2,
              'always',
              ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
          ],
      "subject-ticket": [2, "always"],
    },
    plugins: [
      {
        rules: {
          'subject-ticket' : ( ({subject}) => {
            const subjectStructure = /^[A-Z]*-\d* .{1,50}/;
              const isSubjectValid = subjectStructure.test(subject);
            return [
              isSubjectValid,
              `Subject must start with a Jira ticket with regex /^[A-Z]*-\d* `
            ]
          })
        }
      }
    ]
  };
  