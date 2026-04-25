<script lang="ts">
	import Page from '../../../buchen/[slug]/+page.svelte';

	let { data } = $props();
</script>

<Page data={data as any} />
