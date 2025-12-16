import { sanity } from "./SanityClient";

export const sanityFetch = async (slug: string) => {
  const query = `*[_type == "page" && slug.current == $slug][0]{
    title,
    sections[]{
      ...,
      "imageUrl": imageBlock.image.asset->url
    }
  }`;

  const params = { slug };
  const page = await sanity.fetch(query, params);
  return page;

  
};