/**
 * STIB Vehicle Position JSON Parser
 * Standalone version for testing outside n8n
 */

function parseSTIBVehiclePositions(rawData) {
    const results = rawData.results || (Array.isArray(rawData) ? rawData : [rawData]);
    const output = [];
    
    results.forEach(res => {
        let positionsRaw = res.vehiclepositions;
        let positions = [];
        
        // Parse JSON string if needed
        try {
            positions = (typeof positionsRaw === 'string') 
                ? JSON.parse(positionsRaw) 
                : (positionsRaw || []);
        } catch (e) {
            console.error("JSON parse error:", e);
            positions = [];
        }
        
        // Flatten nested array
        if (Array.isArray(positions)) {
            positions.forEach(pos => {
                output.push({
                    lineid: res.lineid || "N/A",
                    direction: pos.directionId || null,
                    distance_from_point: pos.distanceFromPoint || null,
                    pointid: pos.pointId || "N/A",
                    insertion_timestamp: new Date().toISOString()
                });
            });
        }
    });
    
    return output.length > 0 
        ? output 
        : [{ message: "Structure non reconnue", debug: rawData }];
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { parseSTIBVehiclePositions };
}

// Example usage
if (require.main === module) {
    const sampleData = {
        results: [
            {
                lineid: "3",
                vehiclepositions: JSON.stringify([
                    { directionId: 1, distanceFromPoint: 250, pointId: "8012" },
                    { directionId: 2, distanceFromPoint: 500, pointId: "8013" }
                ])
            }
        ]
    };
    
    console.log("Parsed output:", parseSTIBVehiclePositions(sampleData));
}
```

---

## 📝 COMMENT AJOUTER CES FICHIERS SUR GITHUB (10 min)

### **Méthode Simple (via interface web) :**

**1. Va sur ton repo `bruxelloise-mobilité-quantique`**

**2. Crée le dossier `python/` avec le fichier :**
- "Add file" → "Create new file"
- Nom : `python/grover_circuit.py`
- Copie-colle le code Python ci-dessus
- Commit : `Add Grover quantum circuit implementation`

**3. Crée le dossier `sql/` avec le fichier :**
- "Add file" → "Create new file"
- Nom : `sql/create_tables.sql`
- Copie-colle le code SQL ci-dessus
- Commit : `Add SQL schema for data warehouse`

**4. Répète pour `stib-tempsréel-n8n` :**
- Crée `workflows/stib-vehicle-positions.json`
- Crée `javascript/json-parser.js`

**5. Attends 5 minutes, refresh ton profil**
- GitHub va analyser les fichiers
- Les icônes vont apparaître ! 🎉

---

## 🎨 RÉSULTAT ATTENDU

**Après ajout des fichiers :**
```
bruxelloise-mobilité-quantique
🐍 Python (icône bleue)
⭐ 1

stib-tempsréel-n8n
🟡 JavaScript (icône jaune)
⭐ 0
