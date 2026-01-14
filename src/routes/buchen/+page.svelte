<script lang="ts">
	import { t } from '$lib/i18n';
</script>

<svelte:head>
	<title>{$t('booking.title')} · Gästehaus Rader</title>
</svelte:head>

<section class="grid gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:grid-cols-[1fr,1fr] lg:p-12">
	<div class="flex flex-col justify-between">
		<div>
			<p class="text-xs uppercase tracking-[0.3em] text-slate-500">Booking</p>
			<h1 class="mt-4 text-4xl">{$t('booking.title')}</h1>
			<p class="mt-4 text-base text-slate-600">{$t('booking.body')}</p>
		</div>
		<div class="mt-10 rounded-2xl bg-slate-50 p-6 text-sm text-slate-600">
			<p class="font-semibold text-slate-800">{$t('booking.direct.title')}</p>
			<p class="mt-2 text-sm text-slate-600">{$t('booking.direct.body')}</p>
			<p class="mt-4">info@gaestehaus-rader.at</p>
			<p>+43 000 0000</p>
		</div>
	</div>
	<div class="rounded-2xl border border-slate-200 bg-slate-900 p-8 text-white">
		<p class="text-xs uppercase tracking-[0.3em] text-brand">Check</p>
		<h2 class="mt-3 text-2xl">{$t('hero.cta.primary')}</h2>
		<p class="mt-2 text-sm text-slate-200">{$t('booking.form.note')}</p>
		<form class="mt-6 grid gap-4">
			<label class="grid gap-2 text-sm">
				<span class="text-slate-200">{$t('booking.form.checkin')}</span>
				<input
					type="date"
					class="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand"
				/>
			</label>
			<label class="grid gap-2 text-sm">
				<span class="text-slate-200">{$t('booking.form.checkout')}</span>
				<input
					type="date"
					class="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand"
				/>
			</label>
			<label class="grid gap-2 text-sm">
				<span class="text-slate-200">{$t('booking.form.guests')}</span>
				<select
					class="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand"
				>
					<option>1</option>
					<option>2</option>
					<option>3</option>
					<option>4</option>
					<option>5+</option>
				</select>
			</label>
			<button
				type="button"
				class="mt-4 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand/90"
			>
				{$t('booking.form.cta')}
			</button>
		</form>
	</div>
</section>
