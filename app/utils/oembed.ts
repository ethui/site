export async function fetchOEmbedHtml(url: string): Promise<string> {
  const providerUrl = `https://noembed.com/embed?url=${encodeURIComponent(url)}`;
  const response = await fetch(providerUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch oEmbed data for ${url}`);
  }

  const data = await response.json();
  if (!data.html) {
    throw new Error(`No oEmbed HTML found for ${url}`);
  }

  return data.html;
}
