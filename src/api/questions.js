// Minimal API helper for question-related admin actions
const ADMIN_QUESTIONS = "/api/admin/questions";

async function handleResponse(res) {
  const text = await res.text();
  try {
    const data = text ? JSON.parse(text) : null;
    if (!res.ok) throw new Error(data && data.message ? data.message : res.statusText);
    return data;
  } catch (err) {
    if (res.ok) return text;
    throw err;
  }
}

export async function createQuestion(payload = {}, options = {}) {
  const headers = Object.assign({ "Content-Type": "application/json" }, options.headers || {});
  try {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
    if (token && !headers.Authorization && !headers.authorization) headers.Authorization = `Bearer ${token}`;
  } catch (e) {}

  const res = await fetch(ADMIN_QUESTIONS, { method: 'POST', headers, body: JSON.stringify(payload) });
  return handleResponse(res);
}

export async function deleteQuestion(id, options = {}) {
  if (!id) throw new Error('question id required');
  const headers = Object.assign({ "Content-Type": "application/json" }, options.headers || {});
  try {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
    if (token && !headers.Authorization && !headers.authorization) headers.Authorization = `Bearer ${token}`;
  } catch (e) {}

  const url = `${ADMIN_QUESTIONS}/${encodeURIComponent(id)}`;
  const res = await fetch(url, { method: 'DELETE', headers });
  return handleResponse(res);
}

export default { createQuestion, deleteQuestion };