<script lang="ts">
  import LegalLayout from '$lib/components/LegalLayout.svelte';

  export let data;
</script>

<svelte:head>
  <title>Blog — SQRZ</title>
  <meta name="description" content="How to grow as a freelance professional, get booked, and build leverage with your audience.">
</svelte:head>

<LegalLayout>
  <article class="legal-page">
    <h1>SQRZ Blog</h1>
    <span class="last-updated">How to grow as a freelance professional, get booked, and build leverage.</span>

    {#each data.posts as post}
      <div class="blog-post-entry">
        <h2><a href="/blog/{post.slug}">{post.title}</a></h2>
        <span class="last-updated">{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        <p>{post.description}</p>
      </div>
    {/each}
  </article>
</LegalLayout>
