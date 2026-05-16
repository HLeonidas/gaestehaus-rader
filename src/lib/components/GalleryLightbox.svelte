<script lang="ts">
	import { imageAttrs } from '$lib/images';
	import { ChevronLeft, ChevronRight, X } from 'lucide-svelte';

	export type GalleryLightboxItem = {
		src: string;
		alt: string;
		title?: string;
		badge?: string;
		contain?: boolean;
	};

	type Props = {
		open: boolean;
		items: GalleryLightboxItem[];
		index: number;
		title?: string;
		closeLabel?: string;
		prevLabel?: string;
		nextLabel?: string;
		imageSizes?: string;
		onClose: () => void;
		onIndexChange: (index: number) => void;
	};

	let {
		open,
		items,
		index,
		title = 'Galerie',
		closeLabel = 'Galerie schließen',
		prevLabel = 'Vorheriges Bild',
		nextLabel = 'Nächstes Bild',
		imageSizes = '(max-width: 1024px) 100vw, 1100px',
		onClose,
		onIndexChange,
	}: Props = $props();

	const activeIndex = $derived(
		items.length ? Math.min(Math.max(index, 0), items.length - 1) : 0
	);
	const activeItem = $derived(items[activeIndex]);
	const hasManyItems = $derived(items.length > 1);

	const setIndex = (nextIndex: number) => {
		if (!items.length) return;
		onIndexChange((nextIndex + items.length) % items.length);
	};

	const handleKeydown = (event: KeyboardEvent) => {
		if (!open) return;
		if (event.key === 'Escape') {
			onClose();
			return;
		}
		if (event.key === 'ArrowLeft') {
			setIndex(activeIndex - 1);
			return;
		}
		if (event.key === 'ArrowRight') {
			setIndex(activeIndex + 1);
		}
	};
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open && activeItem}
	<div
		class="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/82 p-3 backdrop-blur-sm sm:p-5"
		role="dialog"
		aria-modal="true"
		aria-label={title}
		tabindex="-1"
	>
		<button
			type="button"
			class="absolute inset-0"
			onclick={onClose}
			aria-label={closeLabel}
		></button>

		<div class="relative z-10 w-full max-w-6xl">
			<button
				type="button"
				class="absolute right-3 top-3 z-30 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-slate-800 shadow-sm transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 sm:-top-12 sm:right-0"
				onclick={onClose}
				aria-label={closeLabel}
			>
				<X class="h-5 w-5" strokeWidth={1.75} />
			</button>

			{#if hasManyItems}
				<button
					type="button"
					class="absolute left-3 top-[42%] z-30 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-slate-800 shadow-sm transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 sm:left-4"
					onclick={() => setIndex(activeIndex - 1)}
					aria-label={prevLabel}
				>
					<ChevronLeft class="h-5 w-5" strokeWidth={1.5} />
				</button>

				<button
					type="button"
					class="absolute right-3 top-[42%] z-30 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-slate-800 shadow-sm transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 sm:right-4"
					onclick={() => setIndex(activeIndex + 1)}
					aria-label={nextLabel}
				>
					<ChevronRight class="h-5 w-5" strokeWidth={1.5} />
				</button>
			{/if}

			<div class="overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-white/15">
				<div class="relative bg-slate-100">
					<img
						{...imageAttrs(activeItem.src, imageSizes)}
						alt={activeItem.alt}
						class={`h-auto max-h-[72vh] w-full bg-slate-100 object-contain ${activeItem.contain ? 'p-4 sm:p-6' : ''}`}
						loading="eager"
						decoding="async"
					/>
					{#if activeItem.badge}
						<span class="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-800 shadow-sm">
							{activeItem.badge}
						</span>
					{/if}
				</div>

				<div class="border-t border-slate-200 px-4 py-3 sm:px-5">
					<div class="flex items-center justify-between gap-4 text-sm text-slate-600">
						<p class="min-w-0 truncate font-medium text-slate-800">
							{activeItem.title ?? activeItem.alt}
						</p>
						<p class="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
							{activeIndex + 1} / {items.length}
						</p>
					</div>

					{#if hasManyItems}
						<div class="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin] [scrollbar-color:theme(colors.slate.300)_transparent]">
							{#each items as item, itemIndex}
								<button
									type="button"
									class={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border transition sm:h-20 sm:w-28 ${itemIndex === activeIndex ? 'border-brand ring-2 ring-brand/25' : 'border-slate-200 opacity-75 hover:opacity-100'}`}
									onclick={() => setIndex(itemIndex)}
									aria-label={item.title ?? item.alt}
								>
									<img
										{...imageAttrs(item.src, '112px')}
										alt=""
										class={`h-full w-full bg-slate-100 ${item.contain ? 'object-contain p-1.5' : 'object-cover'}`}
										loading="lazy"
										decoding="async"
									/>
									{#if item.badge}
										<span class="absolute inset-x-1 bottom-1 rounded bg-white/95 px-1 py-0.5 text-[8px] font-semibold uppercase tracking-[0.08em] text-slate-900">
											{item.badge}
										</span>
									{/if}
								</button>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}
