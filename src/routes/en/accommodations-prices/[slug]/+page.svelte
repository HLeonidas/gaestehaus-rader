<script lang="ts">
	import Page from '../../../unterkuenfte-preise/[slug]/+page.svelte';

	let { data } = $props();
</script>

<Page data={data as any} />
