class MapaPropiedades {
  constructor(mapaId) {
    this.mapaId = mapaId;
    this.map = null;
    this.initialized = false;
    this.direccionMarker = null; // marcador individual
  }

  async initMap() {
    const mapaContainer = document.getElementById(this.mapaId);
    if (!mapaContainer || this.initialized) return;

    try {
      const res = await fetch('/api/propiedades');
      const propiedades = await res.json();

      this.map = L.map(this.mapaId).setView([-34.6, -58.38], 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.map);

      propiedades.forEach(p => {
        if (p.lat && p.lng) {
          const popup = `
            <strong>${p.titulo}</strong><br>
            ${p.direccion || ''}<br>
            ${p.precio} ${p.moneda}<br>
            ${p.imagenUrl ? `<img src="${p.imagenUrl}" style="width:100%; max-width:200px;">` : ''}
          `;
          L.marker([p.lat, p.lng]).addTo(this.map).bindPopup(popup);
        }
      });

      this.initialized = true;
    } catch (error) {
      console.error('[MAPA] Error al cargar propiedades:', error);
      mapaContainer.innerHTML = `<p class="text-danger">Error al cargar el mapa: ${error.message}</p>`;
    }
  }

  // 📍 Nueva función para buscar dirección y agregar marcador único
  async buscarYMarcarDireccion(direccion) {
    const encoded = encodeURIComponent(direccion);
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encoded}`);
    const data = await res.json();

    if (!data || data.length === 0) {
      alert('No se encontró la dirección.');
      return;
    }

    const { lat, lon, display_name } = data[0];
    this.map.setView([lat, lon], 15);

    // Eliminar marcador anterior si existe
    if (this.direccionMarker) {
      this.map.removeLayer(this.direccionMarker);
    }

    this.direccionMarker = L.marker([lat, lon])
      .addTo(this.map)
      .bindPopup(`<strong>Dirección buscada:</strong><br>${display_name}`)
      .openPopup();
  }
}

// Inicialización del mapa y el formulario
document.addEventListener('DOMContentLoaded', () => {
  const mapaInstance = new MapaPropiedades('mapa');
  mapaInstance.initMap();

  const form = document.getElementById('formMapa');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // <- Esto evita la recarga
      const direccionInput = document.getElementById('direccion');
      if (!direccionInput) return;

      const direccion = direccionInput.value.trim();
      if (direccion) {
        await mapaInstance.buscarYMarcarDireccion(direccion);
      } else {
        alert('Por favor ingresá una dirección.');
      }
    });
  } else {
    console.warn('No se encontró el formulario #formMapa');
  }
});
