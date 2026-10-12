<script>
    import "./classless.css";
    import {studentsA, studentsB, swapStudent, search} from "./lib/petList.svelte.js";
    import StudentCard from "./lib/StudentCard.svelte";
</script>

<main>
    <h1>Pet List</h1>

    <label>
        Filter by animal: <input bind:value={search.value}/>
    </label>

    <br>

    <h2>Class 1</h2>
    <ul>
        {#each studentsA as student}
            <StudentCard {student} clickAction={swapStudent}></StudentCard>
        {/each}
    </ul>

    <br>

    <h2>Class 2</h2>
    <ul>
        {#each studentsB as student}
            <StudentCard {student} clickAction={swapStudent}></StudentCard>
        {/each}
    </ul>
</main>