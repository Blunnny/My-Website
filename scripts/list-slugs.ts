import { getAllBlogSlugs } from '../src/lib/blogs';

async function main() {
  const slugs = await getAllBlogSlugs();
  console.log('Total slugs:', slugs.length);
  console.log(slugs.join('\n'));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
