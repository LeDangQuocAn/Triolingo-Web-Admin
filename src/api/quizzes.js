// Minimal API wrapper for quizzes.
// These functions are simple wrappers around `fetch` and are intended
// to be replaced or extended when your backend is ready.

const BASE = "/api/quizzes";
const ADMIN_LIST = "/api/admin/quizzes";

async function handleResponse(res) {
  const text = await res.text();
  try {
    const data = text ? JSON.parse(text) : null;
    if (!res.ok) throw new Error(data && data.message ? data.message : res.statusText);
    return data;
  } catch (err) {
    // If JSON parse failed but response was ok, return raw text
    if (res.ok) return text;
    throw err;
  }
}

export async function fetchQuizzes(options = {}) {
  const headers = Object.assign({"Content-Type": "application/json"}, options.headers || {});
  // If an auth token is stored, include it by default for admin endpoints
  try {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
    if (token && !headers.Authorization && !headers.authorization) {
      headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    // ignore (e.g., server-side environments)
  }
  // Try admin endpoint first, then fall back to public endpoint
  try {
    const res = await fetch(ADMIN_LIST, { method: "GET", headers });
    const parsed = await handleResponse(res);
    if (parsed && Array.isArray(parsed.data)) {
      return parsed.data.map(mapAdminItem);
    }
    // If admin returned an array directly
    if (Array.isArray(parsed)) return parsed.map(mapAdminItem);
  } catch (err) {
    // ignore and try public endpoint
  }

  // Try public BASE endpoint
  try {
    const res2 = await fetch(BASE, { method: "GET", headers });
    const parsed2 = await handleResponse(res2);
    if (Array.isArray(parsed2)) return parsed2.map(mapPublicItem);
    // If public returns object with data
    if (parsed2 && Array.isArray(parsed2.data)) return parsed2.data.map(mapPublicItem);
    return parsed2;
  } catch (err) {
    throw err;
  }
}

// Fetch a single quiz (with questions) from admin endpoint
export async function fetchQuiz(id, options = {}) {
  if (!id) throw new Error('quiz id required');
  const headers = Object.assign({"Content-Type": "application/json"}, options.headers || {});
  try {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
    if (token && !headers.Authorization && !headers.authorization) headers.Authorization = `Bearer ${token}`;
  } catch (e) {}

  // Prefer admin detail endpoint
  const url = `${ADMIN_LIST}/${encodeURIComponent(id)}`;
  const res = await fetch(url, { method: 'GET', headers });
  const parsed = await handleResponse(res);

  // Expected shape: object with quiz fields and Questions array
  if (parsed && typeof parsed === 'object') {
    const quizId = parsed.quiz_id || parsed.id || parsed._id || id;
    const title = parsed.title || parsed.name || '';
    const topics = parsed.topic_name ? [parsed.topic_name] : (parsed.topics && Array.isArray(parsed.topics) ? parsed.topics : []);
    const questions = Array.isArray(parsed.Questions) ? parsed.Questions.map((q) => {
      const opts = Array.isArray(q.QuestionOptions) ? q.QuestionOptions.map((o) => ({
        id: o.option_id || o.id || '',
        text: o.option_text || null,
        image: o.option_image_url || o.image_url || null,
        isCorrect: !!Number(o.is_correct || o.isCorrect || 0),
      })) : [];
      const pairs = Array.isArray(q.MatchingPairs) ? q.MatchingPairs.map((p) => ({
        id: p.pair_id || p.id || '',
        image: p.image_url || p.image || null,
        text: p.word_text || p.text || null,
      })) : [];
      return {
        id: q.question_id || q.id || '',
        type: q.question_type || q.type || '',
        prompt: q.prompt || '',
        image: q.image_url || q.image || null,
        audio: q.audio_url || q.audio || null,
        correctText: q.correct_text_answer || q.correctTextAnswer || null,
        options: opts,
        pairs,
      };
    }) : [];

    return {
      id: quizId,
      title,
      topics,
      questions,
    };
  }

  return parsed;
}

function mapAdminItem(item) {
  const id = item.quiz_id || item.id || "";
  const title = item.title || item.name || String(id);
  const topic = item.topic_name || item.topic || null;
  const topics = topic ? [topic] : (item.topics && Array.isArray(item.topics) ? item.topics : []);
  const questions = Number(item.questionCount || item.questions || item.question_count || 0) || 0;
  let avg = 0;
  if (typeof item.avgGrade === "string") {
    avg = parseFloat(item.avgGrade.replace(/%/g, "")) || 0;
  } else if (typeof item.avgGrade === "number") {
    avg = item.avgGrade;
  } else if (item.avg) {
    avg = Number(item.avg) || 0;
  }
  const users = Number(item.userJoined || item.users || item.user_joined || 0) || 0;
  return {
    id,
    name: title,
    topics,
    questions,
    types: item.types || [],
    avg,
    users,
  };
}

function mapPublicItem(item) {
  // Assume public endpoint already returns the desired shape or similar
  return {
    id: item.id || item._id || "",
    name: item.name || item.title || String(item.id || item._id || ""),
    topics: item.topics || (item.topic ? [item.topic] : []),
    questions: Number(item.questions || item.questionCount || 0) || 0,
    types: item.types || [],
    avg: typeof item.avg === 'number' ? item.avg : (parseFloat((item.avg || '').toString().replace(/%/g, '')) || 0),
    users: Number(item.users || 0) || 0,
  };
}

export async function fetchTopics(options = {}) {
  // Return a list of topics from the API. Expected shape: array of strings or objects {id, name}
  const headers = Object.assign({"Content-Type": "application/json"}, options.headers || {});
  try {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
    if (token && !headers.Authorization && !headers.authorization) headers.Authorization = `Bearer ${token}`;
  } catch (e) {}
  
  // Use the correct admin topics endpoint
  const res = await fetch("/api/topics", { method: "GET", headers });
  return handleResponse(res);
}

export async function createQuiz(payload = {}, options = {}) {
  const headers = Object.assign({"Content-Type": "application/json"}, options.headers || {});
  try {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
    if (token && !headers.Authorization && !headers.authorization) headers.Authorization = `Bearer ${token}`;
  } catch (e) {}
  // Post to admin create endpoint when available
  const url = ADMIN_LIST || BASE;
  const res = await fetch(url, { method: "POST", headers, body: JSON.stringify(payload) });
  return handleResponse(res);
}

export async function deleteQuiz(id, options = {}) {
  if (!id) throw new Error('quiz id required');
  const headers = Object.assign({"Content-Type": "application/json"}, options.headers || {});
  try {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
    if (token && !headers.Authorization && !headers.authorization) headers.Authorization = `Bearer ${token}`;
  } catch (e) {}

  const url = `${ADMIN_LIST}/${encodeURIComponent(id)}`;
  const res = await fetch(url, { method: 'DELETE', headers });
  return handleResponse(res);
}

export default { fetchQuizzes, fetchQuiz, createQuiz, deleteQuiz };
