document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    // Creature database - MODIFICADA para array
    const creatures = [
        {
            id: 1,
            name: 'PYROLYNX',
            key: 'pyrolynx',
            weight: 42,
            height: 32,
            types: ['FIRE'],
            stats: {
                hp: 65,
                attack: 80,
                defense: 50,
                specialAttack: 90,
                specialDefense: 55,
                speed: 100
            }
        },
        {
            id: 2,
            name: 'AQUOROC',
            key: 'aquoroc',
            weight: 220,
            height: 53,
            types: ['WATER', 'ROCK'],
            stats: {
                hp: 85,
                attack: 90,
                defense: 120,
                specialAttack: 60,
                specialDefense: 70,
                speed: 40
            }
        }
    ];
    
    // Objeto auxiliar para busca rápida por key
    const creaturesByKey = {
        'pyrolynx': creatures[0],
        'aquoroc': creatures[1]
    };
    
    searchButton.addEventListener('click', function() {
        const searchValue = searchInput.value.trim();
        
        // Clear previous search
        document.getElementById('types').innerHTML = '';
        
        // Check if input is empty
        if (!searchValue) {
            alert('Please enter a creature name or ID');
            return;
        }
        
        // Search by ID or name
        let foundCreature = null;
        
        // Check if search is numeric (ID)
        if (!isNaN(searchValue)) {
            const id = parseInt(searchValue);
            foundCreature = creatures.find(creature => creature.id === id);
        } else {
            // Search by name (key)
            foundCreature = creaturesByKey[searchValue.toLowerCase()];
        }
        
        if (!foundCreature) {
            alert('Creature not found');
            return;
        }
        
        // Update UI with creature data
        document.getElementById('creature-name').textContent = foundCreature.name;
        document.getElementById('creature-id').textContent = `#${foundCreature.id}`;
        document.getElementById('weight').textContent = `Weight: ${foundCreature.weight}`;
        document.getElementById('height').textContent = `Height: ${foundCreature.height}`;
        
        // Update stats
        document.getElementById('hp').textContent = foundCreature.stats.hp;
        document.getElementById('attack').textContent = foundCreature.stats.attack;
        document.getElementById('defense').textContent = foundCreature.stats.defense;
        document.getElementById('special-attack').textContent = foundCreature.stats.specialAttack;
        document.getElementById('special-defense').textContent = foundCreature.stats.specialDefense;
        document.getElementById('speed').textContent = foundCreature.stats.speed;
        
        // Add types
        const typesContainer = document.getElementById('types');
        foundCreature.types.forEach(type => {
            const typeElement = document.createElement('span');
            typeElement.textContent = type;
            typeElement.classList.add('type', `type-${type.toLowerCase()}`);
            typesContainer.appendChild(typeElement);
        });
    });
    
    // Allow searching by pressing Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
});