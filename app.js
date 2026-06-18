const SUPABASE_URL = 'https://ysnfswhkybizpsvtkxvd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzbmZzd2hreWJpenBzdnRreHZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3MTQ5MjAsImV4cCI6MjA5NzI5MDkyMH0.qLco3jswZlP31C_rzJizdpqbET8qVHPP0Uu7uEKdvnE';

// Changed name to supabaseClient to prevent clashing with the CDN global variable
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const characterForm = document.getElementById('character-form');
const tableBody = document.getElementById('characters-table-body');

// Fetch and Display Characters
async function fetchCharacters() {
    tableBody.innerHTML = '';

    // Uses the renamed client
    const { data: characters, error } = await supabaseClient
        .from('Characters')
        .select('*')

    if (error) {
        console.error('Error fetching characters:', error);
        return;
    }

    characters.forEach(character => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${character.character_name}</td>
            <td>${character.race}</td>
            <td>${character.class}</td>
            <td>${character.IRL_name}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Handle Form Submission
characterForm.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const charName = document.getElementById('character-name').value;
    const charRace = document.getElementById('race').value;
    const charClass = document.getElementById('class').value;
    const irlName = document.getElementById('irl-name').value;

    // Uses the renamed client
    const { data, error } = await supabaseClient
        .from('Characters')
        .insert([
            { 
                character_name: charName, 
                race: charRace, 
                class: charClass, 
                IRL_name: irlName 
            }
        ]);

    if (error) {
        console.error('Error adding character:', error);
        alert('Failed to add character. Check console for details.');
    } else {
        characterForm.reset();
        fetchCharacters();
    }
});

window.addEventListener('DOMContentLoaded', fetchCharacters);