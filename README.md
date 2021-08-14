# Check Branch Name Action

Simple tests for a given branch name.

## Inputs

### `failIf`

The branch name to test for. The action fails if `branch` matches.

### `successIf`

The branch name to test for. The action fails if `branch` does not match.

### `branch`

**Required** The branch name to test.

### `failureMessage`

**Required** A message to display if the test fails.

## Outputs

This action has no outputs.

## Example usage

```yaml
steps:
    - name: Inject slugs
        uses: rlespinasse/github-slug-action@35d90c4a713487c48ff93473fdff93e8dc1469f3

    - name: Assert non-default branch (test)
        uses: cbsinteractive/check-branch-name-action@v1
        with:
            failIf: main
            branch: ${{ env.GITHUB_EVENT_REF_SLUG }}
            failureMessage: The default branch was selected. Please choose a feature branch when running this workflow.
```
