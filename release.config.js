module.exports = {
  branches: ['main'],
  tagFormat: '${version}',
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'angular',
        releaseRules: [
          { type: 'docs', release: 'patch' },
          { type: 'refactor', release: 'patch' },
          { type: 'chore', release: 'patch' },
          { type: 'revert', release: 'patch' },
          { scope: 'no-release', release: false }
        ]
      }
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        presetConfig: {
          types: [
            { type: 'feat', section: 'Features', hidden: false },
            { type: 'fix', section: 'Bug Fixes', hidden: false },
            { type: 'chore', section: 'Chores', hidden: false },
            { type: 'docs', section: 'Docs', hidden: false },
            { type: 'style', section: 'Styles', hidden: false },
            { type: 'refactor', section: 'Refactors', hidden: false },
            { type: 'perf', section: 'Performance', hidden: false },
            { type: 'test', section: 'Test', hidden: false },
            { type: 'revert', section: 'Reverts', hidden: false }
          ]
        }
      }
    ],
    [
      '@semantic-release/npm',
      {
        npmPublish: false
      }
    ],
    '@semantic-release/changelog',
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json'],
        message: 'chore(no-release): ${nextRelease.version}'
      }
    ],
    '@semantic-release/github'
  ]
}
