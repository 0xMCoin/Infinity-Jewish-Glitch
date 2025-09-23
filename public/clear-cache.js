// Script para limpar cache manualmente
console.log('🧹 Limpando cache...');

// Limpar localStorage
if (typeof(Storage) !== "undefined") {
  localStorage.clear();
  sessionStorage.clear();
  console.log('✅ LocalStorage e SessionStorage limpos');
}

// Limpar todos os caches do browser
if ('caches' in window) {
  caches.keys().then(function(names) {
    names.forEach(function(name) {
      caches.delete(name);
      console.log('✅ Cache removido:', name);
    });
  });
}

// Desregistrar service workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    registrations.forEach(function(registration) {
      registration.unregister();
      console.log('✅ Service Worker removido:', registration);
    });
  });
}

// Forçar reload da página
setTimeout(() => {
  console.log('🔄 Recarregando página...');
  window.location.reload(true);
}, 1000);
