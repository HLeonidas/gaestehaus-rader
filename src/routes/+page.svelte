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

  // Quick mapping so the icons are not all the same
  const usps = [
    { key: 1, icon: Mountain },
    { key: 2, icon: Mountain },
    { key: 3, icon: HeartHandshake },
    { key: 4, icon: Snowflake },
  ];

  // If you have real images already, put them here
  const rooms = [
    { key: 1, badge: "Beliebt", img: "/images/room-1.jpg" },
    { key: 2, badge: null, img: "/images/room-2.jpg" },
    { key: 3, badge: null, img: "/images/room-3.jpg" },
  ];
</script>

<svelte:head>
  <title>Gästehaus Rader</title>
</svelte:head>

<div class="">
  <div class="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
    <div class="space-y-16">
      <!-- HERO -->
      <section class="relative pb-12 sm:pb-16">
        <div
          class="relative overflow-hidden rounded-3xl border border-slate-200 shadow-lg"
        >
          <!-- Background image -->
          <div
            class="absolute inset-0 bg-cover bg-center"
            style="background-image: url('/images/house-winter.jpg');"
            aria-hidden="true"
          />
          <!-- Overlay (stronger bottom like screenshot) -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-black/15"
            aria-hidden="true"
          />
          <!-- Subtle top highlight -->
          <div
            class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.22),_transparent_55%)]"
            aria-hidden="true"
          />

          <div
            class="relative px-6 py-20 pb-36 text-center sm:px-10 sm:py-24 sm:pb-40 lg:px-20 lg:py-28"
          >
            <h1
              class="mx-auto max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-5xl"
            >
              {$t("hero.title")}
            </h1>
            <p
              class="mx-auto mt-4 max-w-2xl text-sm text-white/85 sm:text-base"
            >
              {$t("hero.subtitle")}
            </p>

            <div class="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
              <a
                href="/unterkuenfte-preise"
                class="inline-flex items-center justify-center rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand/60"
              >
                {$t("hero.cta.primary")}
              </a>
              <a
                href="/ueber-uns"
                class="inline-flex items-center justify-center rounded-xl bg-white/15 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                {$t("hero.cta.secondary")}
              </a>
            </div>
          </div>
        </div>

        <!-- BOOKING BAR (floating) -->
        <div class="-mt-12 px-2 sm:-mt-14 sm:px-6">
          <div
            class="relative z-10 mx-auto max-w-5xl rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-slate-200 sm:p-5"
          >
            <div
              class="grid gap-4 md:grid-cols-[1fr,1fr,1fr,auto] md:items-end"
            >
              <!-- Checkin -->
              <label class="grid gap-2">
                <span
                  class="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500"
                >
                  {$t("booking.bar.checkin")}
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

              <!-- Checkout -->
              <label class="grid gap-2">
                <span
                  class="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500"
                >
                  {$t("booking.bar.checkout")}
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

              <!-- Guests -->
              <label class="grid gap-2">
                <span
                  class="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500"
                >
                  {$t("booking.bar.guests")}
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

              <!-- CTA -->
              <button
                type="button"
                class="h-[46px] w-full rounded-xl bg-brand px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand/30 md:w-auto"
              >
                {$t("booking.bar.cta")}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- USP CARDS -->
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

      <!-- ROOMS -->
      <!-- ROOMS (new card style like screenshot) -->
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
            <!-- optional: keep your existing "Alle Zimmer ansehen" link if you have it elsewhere -->
            <a
              href="/unterkuenfte-preise"
              class="ml-auto inline-flex items-center gap-2 text-sm font-semibold text-brand hover:opacity-90"
            >
              {$t("rooms.section.cta")}
              <ArrowRight class="h-4 w-4" />
            </a>

            <!-- purely visual buttons (no JS) -->
            <div class="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                class="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                type="button"
                class="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
                aria-label="Next"
              >
                ›
              </button>
            </div>
          </div>
        </div>

        <!-- 2-up on desktop like screenshot -->
        <div class="mt-8">
          <!-- horizontal scroll like a slider -->
          <div
            class="mt-5 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {#each rooms as r}
              <a
                href="/unterkuenfte-preise"
                class="group relative w-[280px] shrink-0 snap-start overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md sm:w-[340px]"
              >
                <!-- image -->
                <div class="relative">
                  <img
                    src={r.img}
                    alt=""
                    class="h-[360px] w-full object-cover sm:h-[420px]"
                    loading="lazy"
                  />

                  <!-- light fade bottom for text readability -->
                  <div
                    class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent"
                  />

                  <!-- top-left price pill -->
                  <span
                    class="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-sm"
                  >
                    {$t("price.from")} €{$t(`rooms.card.${r.key}.price`)} / {$t(
                      "price.night"
                    )}
                  </span>

                  <!-- bottom text area -->
                  <div class="absolute bottom-0 left-0 right-0 p-5">
                    <h3 class="text-xl font-semibold tracking-tight text-white">
                      {$t(`rooms.card.${r.key}.title`)}
                    </h3>
                    <p class="mt-1 text-xs text-white/80">
                      {$t(`rooms.card.${r.key}.meta`)}
                    </p>
                  </div>
                </div>

                <!-- subtle hover lift -->
                <div
                  class="pointer-events-none absolute inset-0 ring-1 ring-transparent transition group-hover:ring-brand/20"
                />
              </a>
            {/each}
          </div>
        </div>
      </section>

      <!-- SEASONS (beige block like screenshot) -->
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
