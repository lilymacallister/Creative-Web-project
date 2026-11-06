<script>
  const elements = ['Fire', 'Water', 'Air', 'Earth']
  const recipes = {
    'Fire+Fire': 'Lava',
    'Fire+Water': 'Steam',
    'Air+Air': 'Wind',
    'Air+Earth': 'Dust',
    'Air+Fire': 'Steam',
    'Air+Water': 'Cloud',
    'Earth+Earth': 'Rock',
    'Earth+Fire': 'Lava',
    'Earth+Water': 'Plant',
    'Water+Water': 'Ocean',
  }

  let firstElement = $state('Fire')
  let secondElement = $state('Water')
  let result = $state('')

  function combine() {
    result = recipes[[firstElement, secondElement].sort().join('+')] ?? 'Nothing'
  }
</script>

<main>
  <h1>Element Mixer</h1>
  <select bind:value={firstElement} aria-label="First element">
    {#each elements as element}<option>{element}</option>{/each}
  </select>
  +
  <select bind:value={secondElement} aria-label="Second element">
    {#each elements as element}<option>{element}</option>{/each}
  </select>
  <button onclick={combine}>Combine</button>
  <p aria-live="polite">{result ? `Result: ${result}` : ''}</p>
</main>

<style>
  main {
    text-align: center;
  }

  button { margin: 12px; }
</style>
