import React, { useEffect, useState } from 'react';
import { RefreshCw, Radio, Sparkles, X } from 'lucide-react';
import { registerSW } from 'virtual:pwa-register';
import { soundFx } from '../../core/audio/soundEffects';
import { useGameStore } from '../../core/state/gameStore';

export const PwaUpdater: React.FC = () => {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [updateFunction, setUpdateFunction] = useState<((reloadPage?: boolean) => Promise<void>) | null>(null);
  const { stage } = useGameStore();

  useEffect(() => {
    // Registrar el Service Worker con ciclo de vida activo y detección continua
    const updateSW = registerSW({
      immediate: true,
      onNeedRefresh() {
        console.log('[PWA] Nueva versión táctica lista en el servidor.');
        setNeedRefresh(true);
        setDismissed(false);
        soundFx.playRadioBurst();
      },
      onOfflineReady() {
        console.log('[PWA] Sistema listo para operar 100% offline.');
        setOfflineReady(true);
        setTimeout(() => setOfflineReady(false), 4000);
      },
      onRegisteredSW(_swScriptUrl, registration) {
        if (!registration) return;

        // 1. Chequeo periódico cada 10 minutos si hay conexión
        const intervalId = setInterval(() => {
          if (navigator.onLine) {
            registration.update().catch((err) => console.debug('[PWA] Error en chequeo periódico:', err));
          }
        }, 10 * 60 * 1000);

        // 2. Chequeo cuando la app vuelve a primer plano (desbloqueo de pantalla o cambio de app en móvil/PC)
        const handleVisibilityChange = () => {
          if (document.visibilityState === 'visible' && navigator.onLine) {
            registration.update().catch((err) => console.debug('[PWA] Error al reanudar app:', err));
          }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // 3. Chequeo inmediato al recuperar señal de internet
        const handleOnline = () => {
          registration.update().catch((err) => console.debug('[PWA] Error al volver online:', err));
        };
        window.addEventListener('online', handleOnline);

        return () => {
          clearInterval(intervalId);
          document.removeEventListener('visibilitychange', handleVisibilityChange);
          window.removeEventListener('online', handleOnline);
        };
      },
      onRegisterError(error) {
        console.error('[PWA] Error al registrar Service Worker:', error);
      }
    });

    setUpdateFunction(() => updateSW);

    // Escuchar controllerchange: si un nuevo SW tomó el control
    let refreshing = false;
    const handleControllerChange = () => {
      if (refreshing) return;
      refreshing = true;
      console.log('[PWA] Nuevo Service Worker activado en cliente.');
      // Si el usuario está en el menú de inicio y no en combate, recargamos inmediatamente
      if (stage === 'creation') {
        window.location.reload();
      } else {
        setNeedRefresh(true);
      }
    };

    navigator.serviceWorker?.addEventListener('controllerchange', handleControllerChange);

    return () => {
      navigator.serviceWorker?.removeEventListener('controllerchange', handleControllerChange);
    };
  }, [stage]);

  const handleUpdateNow = async () => {
    soundFx.playCommandConfirm();
    if (updateFunction) {
      await updateFunction(true);
    } else {
      window.location.reload();
    }
  };

  if (!needRefresh && !offlineReady) return null;
  if (dismissed && !needRefresh) return null;

  return (
    <div className="fixed bottom-16 sm:bottom-12 left-3 right-3 sm:left-auto sm:right-6 max-w-md z-50 animate-fade-in select-none">
      {needRefresh ? (
        <div className="p-3.5 rounded-lg bg-black/95 border-2 border-yellow-400 text-yellow-300 shadow-[0_0_25px_rgba(250,204,21,0.4)] backdrop-blur-md flex flex-col gap-2 font-mono-military">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-yellow-400 animate-pulse shrink-0" />
              <div className="font-chakra font-bold text-xs sm:text-sm uppercase tracking-wider text-yellow-300">
                ¡NUEVA ACTUALIZACIÓN TÁCTICA!
              </div>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="text-zinc-500 hover:text-yellow-400 p-1 transition-colors"
              title="Cerrar aviso"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[11px] text-zinc-300 leading-relaxed">
            Se recibieron nuevas órdenes, correcciones y misiones de combate. Presioná para actualizar y cargar la versión más reciente.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleUpdateNow}
              className="flex-1 py-2 px-3 rounded bg-yellow-500 text-black font-chakra font-bold text-xs uppercase tracking-wider hover:bg-yellow-400 transition-all flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(250,204,21,0.6)]"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>ACTUALIZAR AHORA</span>
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="px-3 py-2 rounded bg-zinc-900 border border-zinc-700 text-zinc-400 text-[11px] hover:text-zinc-200 transition-all"
            >
              LUEGO
            </button>
          </div>
        </div>
      ) : offlineReady ? (
        <div className="p-2.5 rounded-lg bg-black/90 border border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(57,181,74,0.3)] backdrop-blur-md flex items-center gap-2 font-mono-military text-xs">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>SISTEMA TÁCTICO 100% OPERATIVO OFFLINE</span>
        </div>
      ) : null}
    </div>
  );
};
