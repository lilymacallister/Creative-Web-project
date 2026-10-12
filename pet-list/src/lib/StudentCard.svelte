<script>
	let {student, clickAction} = $props();
	import PetCard from "./PetCard.svelte";
</script>

<li>
	<p>{student.name}</p>
    {#if student.pets.length === 0}
		<p>[No pets]</p>
	{:else}
		<ul>
			{#each student.pets as pet}
				<PetCard {pet}></PetCard>
			{/each}
		</ul>
		
	{/if}
	<button onclick={() => clickAction(student)}>Swap</button>
</li>

<style>
	li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #eee;
	}

	button {
		font-size: 0.85rem;
		margin-left: 1rem;
	}

	p {
		width: 300px;
		text-align: left
	}
</style>