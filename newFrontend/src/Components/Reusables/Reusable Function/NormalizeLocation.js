export const normalizeLocation = (data) => {
    const name = data.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    const type = data.type === 'ADM1' ? 'state' : data.type.toLowerCase();
    return { name, type };
  };