const fs = require('fs');
const path = './src/routes/+page.svelte';
let content = fs.readFileSync(path, 'utf8');

const missingBlock = `				</div>
			</div>
		</div> -->
	</section>

	<div class="mx-auto w-full max-w-6xl px-4 pt-16 sm:px-6 sm:pt-24 lg:px-8">
		<div class="space-y-20">
			<section
				use:reveal class="opacity-0 translate-y-8 transition-all duration-700 ease-out -mx-4 mt-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 scroll-pl-4 scroll-pr-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 sm:scroll-pl-0 sm:scroll-pr-0 lg:grid-cols-4"
			>
				{#each usps as item}
					<div
						class="group w-[84vw] max-w-[320px] shrink-0 snap-start rounded-2xl border border-slate-200/50 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-md sm:w-auto sm:max-w-none sm:p-6"
					>
						<div
							class="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white"
						>
							<item.icon class="h-5 w-5" aria-hidden="true" strokeWidth={1.25} />
						</div>
						<h3 class="mt-4 text-base font-semibold text-slate-900">
							{$t(\`usp.\${item.key}.title\`)}
						</h3>
						<div class="mt-3 h-[2px] w-8 bg-brand/40 transition-all duration-300 group-hover:w-12"></div>
						<p class="mt-2 text-sm leading-relaxed text-slate-600">
							{$t(\`usp.\${item.key}.body\`)}
						</p>
					</div>
				{/each}
			</section>

			<!-- ROOMS -->
			<section use:reveal class="opacity-0 translate-y-8 transition-all duration-700 ease-out mt-4 pt-2 sm:mt-0 sm:pt-4">
				<div class="flex flex-wrap items-end justify-between gap-3 sm:gap-6">
					<div class="pb-2 sm:pb-10">
						<p class="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
							{$t('rooms.section.kicker')}
						</p>
						<h2 class="mt-3 text-4xl font-serif font-medium leading-[0.95] text-slate-900">
							{$t('rooms.section.title')}
						</h2>
						<div class="mt-4 h-[3px] w-16 rounded-full bg-brand"></div>
					</div>

					<a
						href={resolve('/unterkuenfte-preise')}
						class="ml-auto inline-flex w-full items-center justify-end gap-2 pt-0 text-sm font-semibold text-brand/80 transition hover:text-brand sm:w-auto sm:pt-2"
					>
						{$t('rooms.section.cta')}
						<ArrowRight class="h-4 w-4" aria-hidden="true" strokeWidth={1.25} />
					</a>
				</div>

				<div class="mt-8">
					<div
						class="-mx-4 mt-2 flex snap-x snap-mandatory gap-8 overflow-x-auto px-4 pb-7 pt-4 scroll-pl-4 scroll-pr-4 [scrollbar-width:thin] [scrollbar-color:theme(colors.slate.300)_transparent] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200 hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 sm:mx-0 sm:px-0 sm:pb-5 sm:pt-3 sm:scroll-pl-0 sm:scroll-pr-0"
					>
						{#each rooms as r}
							<a
								href={\`\${accommodationsBase}/\${r.slug}\`}
								class="group relative w-[280px] shrink-0 snap-start overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-sm transition-all duration-300 hover:shadow-lg sm:w-[340px] sm:hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none"
								onclick={() => trackEvent('Content: Room Card Click', { source: 'home', room: r.slug })}
							>
								<!-- Image -->
								<div class="relative aspect-[4/3] overflow-hidden">
									<img
										src={withAsset(r.images.main)}
										alt={\`\${\$t('home.rooms.card.imageAltPrefix')} \${r.title}\`}
										class="h-full w-full object-cover transition duration-1000 ease-out group-hover:scale-105"
										loading="lazy"
									/>
									<div
										class="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/10 to-transparent"
									></div>
									<div
										class="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-slate-950/22 via-slate-900/5 to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:block"
									></div>
									<div
										class="pointer-events-none absolute bottom-4 right-4 hidden items-center gap-2 rounded-full border border-white/35 bg-white/14 px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(15,23,42,0.25)] ring-1 ring-white/20 backdrop-blur-md opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 sm:inline-flex"
									>
										<!-- <span>{$t('rooms.page.detailsCta')}</span> -->
										<ArrowRight class="h-4 w-4" aria-hidden="true" strokeWidth={1.25} />
									</div>

									<!-- Price pill -->
									<!-- <span
                    class="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-sm"
                  >
                    {$t("price.from")} €{$t(\`rooms.card.\${r.key}.price\`)} / {$t(
                      "price.night"
                    )}
                  </span> -->
								</div>

								<!-- Content -->
								<div class="px-6 pb-5 pt-5">
									<h3 class="text-base font-semibold tracking-tight text-slate-900">
										{r.title}
									</h3>
									<div class="mt-1 flex items-baseline gap-2">
										<p class="text-sm font-semibold text-slate-500">
											{$t('price.from')} <span class="text-slate-500">{r.pricePerNightBase}</span>
										</p>
										<span class="text-xs text-slate-500">/ {$t('price.night')}</span>
									</div>

									<!-- Meta line (small, muted) -->
									<p class="mt-2 text-xs text-slate-500">
										{r.cardMeta[$lang]}
									</p>

								</div>

								<!-- Hover ring -->
								<div
									class="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent transition"
								></div>
							</a>
						{/each}
					</div>
				</div>
			</section>

			<!-- TRUST -->
			<section use:reveal class="opacity-0 translate-y-8 transition-all duration-700 ease-out py-2 sm:py-4">
				<!-- Header row -->
				<div class="flex flex-wrap items-start justify-between gap-3 sm:gap-6">
					<div class="max-w-2xl">
						<p class="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand">
							{$t('trust.kicker')}
						</p>
						<h2 class="mt-3 text-4xl font-serif font-medium leading-[0.95] text-slate-900">
							{$t('trust.title')}
						</h2>
						<div class="mt-4 h-[3px] w-16 rounded-full bg-brand"></div>
					</div>

					<div class="mt-2 flex items-center gap-2 text-sm font-medium text-slate-500 sm:mt-10">
						<BadgeCheck class="h-4 w-4 text-brand" aria-hidden="true" strokeWidth={1.25} />
						{$t('trust.verified')}
					</div>
				</div>

				<!-- Cards row (4 columns like screenshot) -->
				<div
					class={\`mt-6 -mx-4 flex snap-x snap-mandatory items-stretch gap-6 overflow-x-auto px-4 pb-2 scroll-pl-4 scroll-pr-4 [scrollbar-width:thin] [scrollbar-color:theme(colors.slate.300)_transparent] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200 hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 sm:mt-10 lg:mx-0 lg:grid lg:overflow-visible lg:px-0 lg:pb-0 \${
						displayedTrustReviews.length > 3 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'
					}\`}
				>
					<!-- Rating card (Google) -->
					<a
						href={googleProfileUrl}
						target="_blank"
						rel="noreferrer"
						class="group relative flex h-full w-[280px] min-h-[330px] shrink-0 snap-start flex-col rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm transition-all duration-300 hover:border-brand/30 hover:shadow-lg sm:hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none lg:min-h-0 lg:w-auto lg:shrink"
					>
						<span
							class="pointer-events-none absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-500 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 group-hover:bg-brand/10 group-hover:text-brand"
							aria-hidden="true"
						>
							↗
						</span>
						<div
							class="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400"
						>
							<span class="transition group-hover:text-slate-500 group-hover:underline">Google</span>
						</div>

						<div class="mt-5 inline-flex items-end gap-2">
							<span class="text-5xl font-semibold leading-none text-slate-900 group-hover:underline">
								{$t('trust.ratingValue')}
							</span>
							<span class="pb-1 text-sm font-semibold text-slate-400 group-hover:underline">/ 5</span>
						</div>

						<div class="mt-3 flex items-center gap-1 text-amber-500">
							{#each trustStars as _}
								<Star class="h-4 w-4 fill-current" aria-hidden="true" strokeWidth={1.25} />
							{/each}
						</div>

						<p class="mt-6 text-xs font-medium text-slate-400">
							{$t('trust.ratingMeta')}
						</p>

						<!-- Small “platform score” tile (bottom) -->
						<div class="mt-6 rounded-2xl border border-slate-200/70 bg-white px-4 py-3">
							<div class="flex items-center gap-3">
								<span
									class="grid h-10 w-10 place-items-center rounded-full bg-slate-900 text-sm font-semibold text-white"
								>
									{$t('trust.booking.scoreCompact')}
								</span>
								<div class="leading-tight">
									<p class="text-xs font-semibold text-slate-900">
										{$t('trust.booking.label')}
									</p>
									<p class="text-[11px] text-slate-400">
										{$t('trust.booking.meta')}
									</p>
								</div>
							</div>
						</div>
						<div
							class="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent transition group-hover:ring-brand/20"
						></div>
					</a>

					<!-- Review cards -->
					{#each displayedTrustReviews as review}
						<a
							href={review.url}
							target="_blank"
							rel="noreferrer"
							class="group relative flex h-full w-[280px] min-h-[330px] shrink-0 snap-start flex-col rounded-3xl border border-slate-200/70 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:border-brand/30 hover:shadow-lg sm:hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none lg:min-h-0 lg:w-auto lg:shrink"
							onclick={() => trackEvent('Trust: Review Click', { source: 'home', index: review.id })}
						>
							<span
								class="pointer-events-none absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-500 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 group-hover:bg-brand/10 group-hover:text-brand"
								aria-hidden="true"
							>
								↗
							</span>

							<div class="flex items-center gap-1 text-amber-500">
								{#each trustStars as _}
									<Star class="h-4 w-4 fill-current" aria-hidden="true" strokeWidth={1.25} />
								{/each}
							</div>

							<p
								class="mt-5 text-sm italic leading-relaxed text-slate-600 transition group-hover:text-slate-700"
							>
								"{review.quote[$lang]}"
							</p>

							<div class="mt-auto border-t border-slate-200/70 pt-4">
								<div class="flex items-center gap-3">
									<!-- Avatar -->
									<div
										class="grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-slate-100 text-xs font-semibold text-slate-700"
									>
										{review.initials}
									</div>

									<div class="leading-tight">
										<p class="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-900">
											{review.name}
										</p>
										<p class="text-[11px] text-slate-400">
											{review.date ? formatReviewAge(review.date, $lang) : review.meta[$lang]}
										</p>
									</div>
								</div>
							</div>

							<div
								class="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent transition group-hover:ring-brand/20"
							></div>
						</a>
					{/each}
				</div>

				<!-- Bottom platform row (like screenshot) -->
				<div
					class="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400 sm:mt-10 sm:gap-8"
				>
					<a
						href="https://www.airbnb.at/users/profile/1470215552721931790"
						target="_blank"
						rel="noreferrer"
						class="group inline-flex items-center gap-2 rounded-full border border-transparent px-2.5 py-1.5 transition-all duration-200 hover:-translate-y-[1px] hover:border-slate-200 hover:bg-white hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2"
					>
						<Home
							class="h-4 w-4 text-slate-500 transition-colors group-hover:text-slate-800"
							aria-hidden="true" strokeWidth={1.25}
						/>
						<span
							class="text-slate-500 transition-colors group-hover:text-slate-800 group-hover:underline"
							>Airbnb</span
						>
						<span
							class="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600 transition-all duration-200 group-hover:bg-brand/10 group-hover:text-brand group-hover:ring-1 group-hover:ring-brand/20"
						>
							{$t('trust.airbnb.score')}
						</span>
						<span
							class="ml-0.5 text-slate-400 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 group-hover:text-slate-600"
							aria-hidden="true"
						>
							↗
						</span>
					</a>
					<span class="h-4 w-px bg-slate-200"></span>
					<a
						href="https://www.booking.com/Share-deqca7p"
						target="_blank"
						rel="noreferrer"
						class="group inline-flex items-center gap-2 rounded-full border border-transparent px-2.5 py-1.5 transition-all duration-200 hover:-translate-y-[1px] hover:border-slate-200 hover:bg-white hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2"
					>
						<Building2
							class="h-4 w-4 text-slate-500 transition-colors group-hover:text-slate-800"
							aria-hidden="true" strokeWidth={1.25}
						/>
						<span
							class="text-slate-500 transition-colors group-hover:text-slate-800 group-hover:underline"
							>Booking.com</span
						>
						<span
							class="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600 transition-all duration-200 group-hover:bg-brand/10 group-hover:text-brand group-hover:ring-1 group-hover:ring-brand/20"
						>
							{$t('trust.booking.score')}
						</span>
						<span
							class="ml-0.5 text-slate-400 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 group-hover:text-slate-600"
							aria-hidden="true"
						>
							↗
						</span>
					</a>
				</div>
			</section>

			<!-- Gallery -->
			<section class="py-2 lg:py-8">
				<div class="flex items-start gap-4">
					<div class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
						<Sun class="h-5 w-5" aria-hidden="true" strokeWidth={1.25} />
					</div>
					<div>
						<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand">
							{$t('home.gallery.kicker')}
						</p>
						<h2 class="mt-2 text-4xl font-serif font-medium leading-[0.98] text-slate-900">
							{$t('home.gallery.title')}
						</h2>
						<div class="mt-3 h-[3px] w-14 rounded-full bg-brand"></div>
					</div>
				</div>

				<p class="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
					{$t('home.gallery.subtitle')}
				</p>

				<div class="mt-6 flex items-center justify-end gap-2">
					<button
						type="button"
						class="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
						onclick={() => scrollGallery('prev')}
						aria-label={$t('room.detail.gallery.prev')}
					>
						<ChevronLeft class="h-5 w-5" strokeWidth={1.25} />
					</button>
					<button
						type="button"
						class="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
						onclick={() => scrollGallery('next')}
						aria-label={$t('room.detail.gallery.next')}
					>
						<ChevronRight class="h-5 w-5" strokeWidth={1.25} />
					</button>
				</div>

				<div
					class="mt-4 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 scroll-pl-4 scroll-pr-4 [scrollbar-width:thin] [scrollbar-color:theme(colors.slate.300)_transparent] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200 hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 sm:mx-0 sm:px-0 sm:scroll-pl-0 sm:scroll-pr-0 lg:grid lg:auto-cols-[420px] lg:grid-flow-col lg:grid-rows-2"
					bind:this={galleryTrack}
				>
					{#each galleryImages as image, index}
						<button
							type="button"
							class="group relative aspect-[4/3] w-[300px] shrink-0 snap-start overflow-hidden rounded-3xl border border-slate-200 bg-white text-left shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 sm:aspect-[16/10] sm:w-[380px] lg:w-auto"
							onclick={() => openGallery(index)}
							aria-label={\`\${\$t('home.gallery.kicker')}: \${\$t(image.altKey)}\`}
						>
							<img
								src={withAsset(\`/images/Galerie/\${image.base}-720.jpg\`)}
								srcset={\`\${withAsset(\`/images/Galerie/\${image.base}-720.jpg\`)} 720w, \${withAsset(\`/images/Galerie/\${image.base}-1080.jpg\`)} 1080w, \${withAsset(\`/images/Galerie/\${image.base}-1440.jpg\`)} 1440w\`}
								sizes={galleryImageSizes}
								alt={$t(image.altKey)}
								class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
								loading="lazy"
								decoding="async"
							/>
							<div
								class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent"
							></div>
							<div class="pointer-events-none absolute bottom-4 left-4 right-4">
								<p class="text-sm font-semibold text-white">{$t(image.altKey)}</p>
								<p class="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/80">
									{$t(image.locationTagKey ?? 'home.gallery.locationTag')}
								</p>
							</div>
							<div
								class="pointer-events-none absolute inset-0 ring-1 ring-transparent transition group-hover:ring-brand/20"
							></div>
						</button>
					{/each}
				</div>
			</section>

			{#if isGalleryOpen}
				<div
					class="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
					role="dialog"
					aria-modal="true"
					aria-label={$t('home.gallery.title')}
					tabindex="-1"
				>
					<button
						type="button"
						class="absolute inset-0"
						onclick={closeGallery}
						aria-label="Close gallery"
					></button>
					<div class="relative z-10 w-full max-w-6xl">
						<button
							type="button"
							class="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-slate-800 shadow-sm transition hover:bg-white"
							onclick={closeGallery}
							aria-label="Close gallery"
						>
							<span class="text-xl leading-none">×</span>
						</button>

						<button
							type="button"
							class="absolute left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-800 shadow-sm transition hover:bg-white"
							onclick={showPrevGalleryImage}
							aria-label={$t('room.detail.gallery.prev')}
						>
							<ChevronLeft class="h-5 w-5" strokeWidth={1.25} />
						</button>

						<button
							type="button"
							class="absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-800 shadow-sm transition hover:bg-white"
							onclick={showNextGalleryImage}
							aria-label={$t('room.detail.gallery.next')}
						>
							<ChevronRight class="h-5 w-5" strokeWidth={1.25} />
						</button>

						<div class="overflow-hidden rounded-3xl bg-white">
							<img
								src={withAsset(\`/images/Galerie/\${galleryImages[activeGalleryIndex].base}-1440.jpg\`)}
								alt={$t(galleryImages[activeGalleryIndex].altKey)}
								class="h-auto max-h-[78vh] w-full object-contain"
							/>
							<div
								class="flex items-center justify-between gap-4 border-t border-slate-200 px-5 py-3 text-sm text-slate-600"
							>
								<p class="font-medium text-slate-800">{$t(galleryImages[activeGalleryIndex].altKey)}</p>
								<p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
									{activeGalleryIndex + 1} / {galleryImages.length}
								</p>
							</div>
						</div>
					</div>
				</div>
			{/if}

			<div
				class="mx-auto my-12 h-px w-full bg-gradient-to-r from-transparent via-slate-200/80 to-transparent sm:my-16"
			></div>

			<!-- GUEST CARD -->
			<section class="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-18px_rgba(245,146,0,0.45)]">
				<div class="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
					<div class="order-2 relative h-[260px] sm:h-[320px] lg:order-1 lg:h-[670px]">
						<img
							src={withAsset(guestCardVisual.src)}
							alt={$t(guestCardVisual.altKey)}
							class="h-full w-full object-cover"
							loading="lazy"
						/>
						<div
							class="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent"
						></div>
					</div>

					<div class="order-1 flex flex-col justify-center space-y-6 px-6 py-7 sm:px-10 sm:py-10 lg:order-2">
						<div>
							<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand">
								{$t('guestcard.landing.kicker')}
							</p>
							<h2 class="mt-2 text-3xl font-serif font-medium leading-[0.95] text-slate-900 sm:text-4xl">
								{$t('guestcard.landing.title')}
							</h2>
							<div class="mt-3 h-[3px] w-14 rounded-full bg-brand"></div>
							<p class="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
								{$t('guestcard.landing.body')}
							</p>
						</div>

						<ul class="space-y-4 text-sm text-slate-600 sm:text-base">
							<li class="flex items-start gap-3 rounded-xl border border-brand/20 bg-brand/5 p-3">
								<span
									class="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand/15 text-brand"
								>
									<BusFront class="h-5 w-5" aria-hidden="true" strokeWidth={1.25} />
								</span>
								<div>
									<p class="text-sm font-semibold text-slate-900">
										{$t('guestcard.landing.item1.title')}
									</p>
									<p class="mt-1 text-xs leading-relaxed text-slate-500">
										{$t('guestcard.landing.item1.body')}
									</p>
								</div>
							</li>
							<li class="flex items-start gap-3">
								<span
									class="mt-0.5 grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand/10 text-brand"
								>
									<Sparkles class="h-6 w-6" aria-hidden="true" strokeWidth={1.25} />
								</span>
								<div>
									<p class="text-sm font-semibold text-slate-900">
										{$t('guestcard.landing.item2.title')}
									</p>
									<p class="mt-1 text-xs leading-relaxed text-slate-500">
										{$t('guestcard.landing.item2.body')}
									</p>
								</div>
							</li>
							<li class="flex items-start gap-3">
								<span
									class="mt-0.5 grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand/10 text-brand"
								>
									<CalendarDays class="h-6 w-6" aria-hidden="true" strokeWidth={1.25} />
								</span>
								<div>
									<p class="text-sm font-semibold text-slate-900">
										{$t('guestcard.landing.item3.title')}
									</p>
									<p class="mt-1 text-xs leading-relaxed text-slate-500">
										{$t('guestcard.landing.item3.body')}
									</p>
								</div>
							</li>
						</ul>

						<div class="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
							<a
								href="https://www.nassfeld.at/de/Unterkunft-finden/Reise-planen/PREMIUM-Cards/GaesteCard-basic"
								class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand/90 sm:w-auto"
								target="_blank"
								rel="noreferrer"
							>
								<Info class="h-4 w-4" aria-hidden="true" strokeWidth={1.25} />
								{$t('guestcard.cta.moreInfo')}
							</a>
						</div>
					</div>
				</div>
			</section>

			<div
				class="mx-auto my-12 h-px w-full bg-gradient-to-r from-transparent via-slate-200/80 to-transparent sm:my-16"
			></div>
		</div>
	</div>

	<div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="space-y-16">
			<!-- AUSSTATTUNG -->
			<section class="rounded-3xl px-0 py-0 sm:px-10 sm:py-14">
				<div class="flex items-center gap-4">
					<div class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
						<Sparkles class="h-5 w-5" aria-hidden="true" strokeWidth={1.25} />
					</div>
					<div>
						<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand">
							{$t('home.amenities.kicker')}
`;

const startMarker = `					<button
						type="button"
						class="h-[46px] w-full rounded-xl bg-brand px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand/30 md:w-auto"
					>
						{$t('booking.bar.cta')}
					</button>`;
const endMarker = `							{$t('home.amenities.kicker')}`;

const startIndex = content.indexOf(startMarker);
if (startIndex === -1) { console.error('START MARKER NOT FOUND!'); process.exit(1); }
const endIndex = content.indexOf(endMarker, startIndex);
if (endIndex === -1) { console.error('END MARKER NOT FOUND!'); process.exit(1); }

content = content.substring(0, startIndex + startMarker.length) + '\n' + missingBlock + content.substring(endIndex + endMarker.length);

fs.writeFileSync(path, content, 'utf8');
console.log('SUCCESS');
