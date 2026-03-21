document.addEventListener('DOMContentLoaded', function() {
  const headers = document.querySelectorAll('.acordion-header');
  headers.forEach(header => {
    header.addEventListener('click', function() {
      const item = this.parentElement;
      const activo = item.classList.contains('active');
      document.querySelectorAll('.acordion-item').forEach(i => i.classList.remove('active'));
      if (!activo) {
        item.classList.add('active');
      }
    });
  });
});