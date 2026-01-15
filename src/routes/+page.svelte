<script lang="ts">
  import { t } from "$lib/i18n";
  import {
    Calendar,
    Users,
    Mountain,
    HeartHandshake,
    Snowflake,
    ArrowRight,
  } from "lucide-svelte";

  const usps = [
    { key: 1, icon: Mountain },
    { key: 2, icon: Mountain },
    { key: 3, icon: HeartHandshake },
    { key: 4, icon: Snowflake },
  ];

  const rooms = [
    {
      key: 1,
      badge: "Beliebt",
      img: "/images/room-1.jpg",
      price: 150,
      meta: "45 m² · 2–4 Gäste · Mountain View",
      amenities: ["wifi", "balcony", "mountain"],
    },
    {
      key: 2,
      badge: null,
      img: "/images/room-2.jpg",
      price: 120,
      meta: "32 m² · 2 Gäste · Valley View",
      amenities: ["wifi", "balcony"],
    },
    {
      key: 3,
      badge: null,
      img: "/images/room-3.jpg",
      price: 110,
      meta: "28 m² · 1–2 Gäste · Forest View",
      amenities: ["wifi", "parking", "pet"],
    },
  ];
</script>

<svelte:head>
  <title>Gästehaus Rader</title>
</svelte:head>

<div class="space-y-16 pb-16">
  <section class="relative min-h-screen">
    <div class="absolute inset-0">
      <div
        class="h-full w-full bg-cover bg-center"
        style="background-image: url('/images/house-winter.jpg');"
        aria-hidden="true"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/15"
        aria-hidden="true"
      />
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.2),_transparent_55%)]"
        aria-hidden="true"
      />
    </div>

    <div
      class="relative flex min-h-screen flex-col items-center justify-center px-6 pt-28 text-center text-white sm:px-10"
    >
      <h1
        class="mx-auto max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl"
      >
        {$t("hero.title")}
      </h1>
      <p class="mx-auto mt-4 max-w-2xl text-sm text-white/85 sm:text-base">
        {$t("hero.subtitle")}
      </p>

      <div class="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
        <a
          href="/unterkuenfte-preise"
          class="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand/60"
        >
          {$t("hero.cta.primary")}
        </a>
        <a
          href="/ueber-uns"
          class="inline-flex items-center justify-center rounded-full bg-white/15 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
        >
          {$t("hero.cta.secondary")}
        </a>
      </div>
    </div>

    <!-- <div class="absolute inset-x-0 -bottom-10 px-4 sm:px-6">
			<div class="mx-auto max-w-5xl rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-slate-200 sm:p-5">
				<div class="grid gap-4 md:grid-cols-[1fr,1fr,1fr,auto] md:items-end">
					<label class="grid gap-2">
						<span class="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
							{$t('booking.bar.checkin')}
						</span>
						<div class="relative">
							<input
								type="date"
								class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-800 shadow-sm outline-none transition focus:border-brand/50 focus:ring-2 focus:ring-brand/20"
							/>
							<Calendar
								class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
							/>
						</div>
					</label>

					<label class="grid gap-2">
						<span class="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
							{$t('booking.bar.checkout')}
						</span>
						<div class="relative">
							<input
								type="date"
								class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-800 shadow-sm outline-none transition focus:border-brand/50 focus:ring-2 focus:ring-brand/20"
							/>
							<Calendar
								class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
							/>
						</div>
					</label>

					<label class="grid gap-2">
						<span class="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
							{$t('booking.bar.guests')}
						</span>
						<div class="relative">
							<select
								class="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-800 shadow-sm outline-none transition focus:border-brand/50 focus:ring-2 focus:ring-brand/20"
							>
								<option>2 Erwachsene</option>
								<option>1 Erwachsener</option>
								<option>3 Erwachsene</option>
								<option>4 Erwachsene</option>
							</select>
							<Users
								class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
							/>
						</div>
					</label>

					<button
						type="button"
						class="h-[46px] w-full rounded-xl bg-brand px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand/30 md:w-auto"
					>
						{$t('booking.bar.cta')}
					</button>
				</div>
			</div>
		</div> -->
  </section>

  <div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
    <div class="space-y-16">
      <section class="grid gap-6 lg:grid-cols-4">
        {#each usps as item}
          <div
            class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div
              class="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand"
            >
              <svelte:component this={item.icon} class="h-5 w-5" />
            </div>
            <h3 class="mt-4 text-base font-semibold text-slate-900">
              {$t(`usp.${item.key}.title`)}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-600">
              {$t(`usp.${item.key}.body`)}
            </p>
          </div>
        {/each}
      </section>

      <section>
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p
              class="text-xs font-semibold uppercase tracking-[0.2em] text-brand"
            >
              {$t("rooms.section.kicker")}
            </p>
            <h2
              class="mt-2 text-3xl font-semibold tracking-tight text-slate-900"
            >
              {$t("rooms.section.title")}
            </h2>
          </div>
          <div class="flex items-center justify-between gap-4">
            <a
              href="/unterkuenfte-preise"
              class="ml-auto inline-flex items-center gap-2 text-sm font-semibold text-brand hover:opacity-90"
            >
              {$t("rooms.section.cta")}
              <ArrowRight class="h-4 w-4" />
            </a>
          </div>
        </div>

        <div class="mt-8">
          <div
            class="mt-5 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {#each rooms as r}
              <a
                href="/unterkuenfte-preise"
                class="group relative w-[280px] shrink-0 snap-start overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md sm:w-[340px]"
              >
                <!-- Image -->
                <div class="relative">
                  <img
                    src={r.img}
                    alt=""
                    class="h-[260px] w-full object-cover sm:h-[280px]"
                    loading="lazy"
                  />

                  <!-- Price pill -->
                  <span
                    class="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-sm"
                  >
                    {$t("price.from")} €{$t(`rooms.card.${r.key}.price`)} / {$t(
                      "price.night"
                    )}
                  </span>
                </div>

                <!-- Content -->
                <div class="px-5 pb-4 pt-4">
                  <h3
                    class="text-base font-semibold tracking-tight text-slate-900"
                  >
                    {$t(`rooms.card.${r.key}.title`)}
                  </h3>

                  <!-- Meta line (small, muted) -->
                  <p class="mt-2 text-xs text-slate-500">
                    {$t(`rooms.card.${r.key}.meta`)}
                  </p>

                  <!-- Amenities (optional) -->
                  {#if r.amenities?.length}
                    <div class="mt-4 flex items-center gap-3 text-slate-500">
                      {#each r.amenities as a}
                        <!-- Use any icon you like; here are tiny placeholders as circles -->
                        <span
                          class="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100"
                        >
                          <span class="h-3 w-3 rounded bg-slate-400/70" />
                        </span>
                      {/each}
                    </div>
                  {:else}
                    <!-- Keep spacing similar to screenshot even without amenities -->
                    <div class="mt-4 h-7" />
                  {/if}
                </div>

                <!-- Hover ring -->
                <div
                  class="pointer-events-none absolute inset-0 ring-1 ring-transparent transition group-hover:ring-brand/20"
                />
              </a>
            {/each}
          </div>
        </div>
      </section>

      <section class="rounded-3xl bg-[#f3efe6] px-6 py-12 sm:px-10 sm:py-14">
        <div class="text-center">
          <h2
            class="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
          >
            {$t("seasons.title")}
          </h2>
          <p
            class="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base"
          >
            {$t("seasons.subtitle")}
          </p>
        </div>

        <div class="mt-10 grid gap-6 lg:grid-cols-2">
          <a
            href="/erlebnisse/sommer"
            class="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 shadow-sm"
          >
            <img
              src="/images/summer.jpg"
              alt=""
              class="h-64 w-full object-cover sm:h-72"
              loading="lazy"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
            />
            <div class="absolute bottom-0 left-0 right-0 p-6">
              <h3 class="text-xl font-semibold text-white">
                {$t("seasons.summer.title")}
              </h3>
              <p class="mt-1 text-sm text-white/85">
                {$t("seasons.summer.body")}
              </p>
              <span
                class="mt-4 inline-flex items-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition group-hover:translate-y-[-1px]"
              >
                {$t("seasons.summer.cta")}
              </span>
            </div>
          </a>

          <a
            href="/erlebnisse/winter"
            class="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 shadow-sm"
          >
            <img
              src="/images/winter.jpg"
              alt=""
              class="h-64 w-full object-cover sm:h-72"
              loading="lazy"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
            />
            <div class="absolute bottom-0 left-0 right-0 p-6">
              <h3 class="text-xl font-semibold text-white">
                {$t("seasons.winter.title")}
              </h3>
              <p class="mt-1 text-sm text-white/85">
                {$t("seasons.winter.body")}
              </p>
              <span
                class="mt-4 inline-flex items-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition group-hover:translate-y-[-1px]"
              >
                {$t("seasons.winter.cta")}
              </span>
            </div>
          </a>
        </div>
      </section>
    </div>
  </div>
</div>
