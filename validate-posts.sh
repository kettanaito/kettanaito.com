#!/bin/bash
set -e

echo "Validating posts..."

# Get all posts
posts=$(find -f content/posts/**/*.mdx)

if [ -z "$posts" ]
then
  echo "Found no posts. Something must be terribly wrong."
  exit 1
fi

read -a posts_list <<< $posts

echo " "
echo "Found ${#posts_list[@]} post(s):"

for i in "${posts_list[@]}"
do
  echo "  - $i"
done

echo ""
echo "Verifying that all posts have a unique ID..."
invalid_posts=()

for post_filename in "${posts_list[@]}"
do
  echo "Checking \"$post_filename\"..."
  id=$(grep "^id: [a-zA-Z0-9]" $post_filename || echo "")

  if [ -z "$id" ]
  then
    invalid_posts+=($post_filename)
  fi
done

if (( ${#invalid_posts[@]} )); then
  echo ""
  echo "Found posts without a UUID:"

  for invalid_post_filepath in "${invalid_posts[@]}"
  do
    echo "  - $invalid_post_filepath"
  done

  echo "Please provide the \"id\" property to the frontmatter of those posts."

  exit 1
fi

echo "All posts are valid!"
