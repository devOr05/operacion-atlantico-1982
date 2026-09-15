# Héroes del Atlántico 1982

Simulador de carrera militar, supervivencia y toma de decisiones tácticas ambientado en la **Guerra de Malvinas (1982)**, inspirado en la dinámica de juego viral de ***Copero: Convertite en Leyenda*** y ***El Ídolo***.

Desarrollado como una **PWA (Progressive Web App)** 100% offline-first con estética diegética de consola militar de los años 80, pantallas de fósforo CRT y audio procedural sintetizado en tiempo real.

---

## 🎖️ Características Principales

* **Creación de tu Combatiente**: Elegí tu nombre, apodo, provincia de origen y tu Fuerza Armada.
* **Las Tres Fuerzas Armadas (Tierra, Aire, Mar)**:
  * 🪖 **TIERRA (Ejército)**: Infantería en los pozos de zorro de Monte Longdon, hambre, frío polar y combates nocturnos a bayoneta calada.
  * ✈️ **AIRE (Fuerza Aérea)**: Cazas A-4 Skyhawk a 15 metros del agua, reabastecimiento en vuelo con Hércules KC-130 y ataques rasantes en San Carlos.
  * ⚓ **MAR (Armada)**: Cazas Super Étendard con los misiles AM-39 Exocet, cacería de portaaviones y despliegue de la Flota de Mar.
* **Escalafón Militar Completo (De Conscripto a General / Almirante)**:
  * Podés empezar en primera línea y ganar ascensos en el campo de batalla por actos de valor heroico.
  * O arrancar directamente en el Alto Mando (General de Brigada, Brigadier General o Almirante) para dirigir la alta estrategia bélica.
* **Mortalidad Real y Peligro Constante**:
  * Salud balanceada a 50%: una mala decisión, la hipotermia o el fuego enemigo pueden provocarte la muerte en cualquier momento.
* **Siete Finales Posibles**:
  1. 🏆 **¡Victoria Total en la Guerra!** (Hazaña histórica épica al retirar la flota británica).
  2. ⚖️ **Armisticio con Honor (Tablas en la ONU)**.
  3. 🌧️ **La Caída de Puerto Argentino (Derrota Histórica - 14 de Junio)**.
  4. ⚰️ **Caído en Combate** (Epitafio militar con honores póstumos).
  5. 🏥 **Evacuado por Heridas de Guerra**.
  6. ⛓️ **Prisionero de Guerra (POW)**.
  7. ⚖️ **Destitución por Corte Marcial**.

---

## 🚀 Tecnologías

* **Vite + React 19 + TypeScript**
* **Tailwind CSS v4** + Shaders y scanlines CRT
* **Web Audio API** (Sonidos procedurales: teletipo mecánico, estática VHF, alarmas y clics de conmutadores)
* **PWA (Vite Plugin PWA + Workbox)**: Instalable en móvil y escritorio, 100% jugable offline.

---

## 📦 Ejecución Local

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Compilar para producción y PWA
npm run build
npm run preview
```
