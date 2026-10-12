<script>
    let {pet} = $props();
    import {search} from "./petList.svelte";
</script>

<li>
    {#if search.value != "" && pet.animal.toLowerCase().includes(search.value.toLowerCase())}
        <b>{pet.name} ({pet.animal})</b>
    {:else}
        {pet.name} ({pet.animal})
    {/if}
    
</li>

<style>
	li {
		width: 300px;
        text-align: left;
		border-bottom: 1px solid #eee;
	}
</style>