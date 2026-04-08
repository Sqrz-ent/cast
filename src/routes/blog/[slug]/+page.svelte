<script lang="ts">
  import LegalLayout from '$lib/components/LegalLayout.svelte';

  export let data;

  const { content: Content, meta } = data;
</script>

<svelte:head>
  <title>{meta.title} — SQRZ</title>
  <meta name="description" content={meta.description}>
</svelte:head>

<LegalLayout>
  <article class="legal-page">
    <h1>{meta.title}</h1>
    <span class="last-updated">{new Date(meta.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
    <Content />
  </article>
</LegalLayout>
