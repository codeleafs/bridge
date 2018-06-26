// http://marionebl.github.io/commitlint/#/reference-rules
// https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit
/**
 * Level [0..2]: 0 disables the rule. For 1 it will be considered a warning for 2 an error.
 * Applicable always|never: never inverts the rule.
 * Value: value to use for this rule.
 * 
 * <type>(<scope>): <subject>
 * <BLANK LINE>
 * <body>
 * <BLANK LINE>
 * <footer>
 *
 */

module.exports = {
  rules: {
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 72],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case']
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'debug'
      ]
    ]
  }
}
