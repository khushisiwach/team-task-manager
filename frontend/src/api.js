const ports = [5002, 5003, 5004];
let API_BASE = null;

const findServerPort = async () => {
  for (const port of ports) {
    try {
      const response = await fetch(`http://localhost:${port}/api/health`, { 
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        return `http://localhost:${port}/api`;
      }
    } catch (error) {
      continue;
    }
  }
  return `http://localhost:5002/api`;
};

export const getApiBase = async () => {
  if (!API_BASE) {
    API_BASE = await findServerPort();
  }
  return API_BASE;
};

export const apiRequest = async (path, options = {}, token = '') => {
  const base = await getApiBase();
  const response = await fetch(`${base}${path}`, {
    method: options.method || 'GET',
    headers: {
      ...(options.headers || {}),
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });

  let data;

  try {
    data = await response.json();
  } catch (error) {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.message || `Request failed with status ${response.status}`);
  }

  return data;
};